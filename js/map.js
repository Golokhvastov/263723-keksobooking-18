'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin');
  var cardTemplate = document.querySelector('#card');
  var similarPins = [];
  var lengthBeforeRender = mapPinsList.children.length;
  var pinMainStartY = mapPinMain.style.top;
  var pinMainStartX = mapPinMain.style.left;

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var popupCloseButton;

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    pins.forEach(function (pin) {
      fragment.appendChild(window.pin.create(similarPinTemplate, pin));
    });
    mapPinsList.appendChild(fragment);
  };

  var renderSimilarPins = function () {
    var filteredPins = window.filters(similarPins);

    renderPins(filteredPins);

    filteredPins.forEach(function (pin, i) {
      createListenerForRenderCard(mapPinsList.children[lengthBeforeRender + i], pin);
    });
  };

  var renderCard = function (pin) {
    var fragment = window.card.create(cardTemplate, pin);
    map.insertBefore(fragment, mapFiltersContainer);
  };

  var onCardCloseClick = function () {
    popupCloseButton.removeEventListener('click', onCardCloseClick);
    document.removeEventListener('keydown', onCardEscPress);

    map.removeChild(map.querySelector('.map__card'));
  };

  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, onCardCloseClick);
  };

  var onMapSimilarPinClick = function (pinDomElement, similarPin) {
    window.map.removeCard();
    renderCard(similarPin);

    for (var i = 0; i < mapPinsList.children.length; i++) {
      mapPinsList.children[i].classList.remove('.map__pin--active');
    }
    pinDomElement.classList.add('.map__pin--active');

    popupCloseButton = map.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', onCardCloseClick);
    document.addEventListener('keydown', onCardEscPress);
  };

  var createListenerForRenderCard = function (pinDomElement, similarPin) {
    pinDomElement.addEventListener('click', function () {
      onMapSimilarPinClick(pinDomElement, similarPin);
    });
    pinDomElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.Constant.ENTER_KEYCODE) {
        onMapSimilarPinClick(pinDomElement, similarPin);
      }
    });
  };

  var onSuccess = function (data) {
    similarPins = data;

    renderSimilarPins();

    window.condition.activateFiltersForm();
  };

  var startActivationPage = function () {
    if (!window.condition.isPageActive()) {
      window.condition.activatePage();
      window.map.setAddressToAdForm();

      window.load(window.Constant.URL_FOR_LOAD_PINS_DATA, onSuccess, window.onError);
    }
  };

  var onMapPinMainEnterPress = function (evt) {
    window.util.isEnterEvent(evt, startActivationPage);
  };

  var onMapPinMainMousedown = function (evt) {
    evt.preventDefault();

    startActivationPage();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinCenterX = 0 - window.Constant.PIN_MAIN_WIDTH / 2;
    var pinCenterY = window.Constant.PIN_MAIN_HEIGHT_ACTIVE / 2;
    var mapLeft = map.offsetLeft;
    var mapWidth = map.offsetWidth;
    var minY = window.Constant.PIN_Y_LIMIT_MIN - window.Constant.PIN_MAIN_HEIGHT_ACTIVE;
    var maxY = window.Constant.PIN_Y_LIMIT_MAX - window.Constant.PIN_MAIN_HEIGHT_ACTIVE;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var top = mapPinMain.offsetTop - shift.y;
      var left = mapPinMain.offsetLeft - shift.x;

      if (((minY + pinCenterY) < startCoords.y || shift.y > 0) && (startCoords.y < (maxY + pinCenterY) || shift.y < 0)) {
        if (top < minY) {
          mapPinMain.style.top = minY + 'px';
        } else if (top > maxY) {
          mapPinMain.style.top = maxY + 'px';
        } else {
          mapPinMain.style.top = top + 'px';
        }
      }
      if ((mapLeft < startCoords.x || shift.x > 0) && (startCoords.x < (mapLeft + mapWidth) || shift.x < 0)) {
        if (left < pinCenterX) {
          mapPinMain.style.left = pinCenterX + 'px';
        } else if (left > (mapWidth + pinCenterX)) {
          mapPinMain.style.left = (mapWidth + pinCenterX) + 'px';
        } else {
          mapPinMain.style.left = left + 'px';
        }
      }

      window.map.setAddressToAdForm();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.setAddressToAdForm();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.map = {
    removeCard: function () {
      if (map.contains(popupCloseButton)) {
        onCardCloseClick();
      }
    },
    removeSimilarPins: function () {
      if (mapPinsList.children.length > lengthBeforeRender) {
        for (var i = mapPinsList.children.length - 1; i >= lengthBeforeRender; i--) {
          mapPinsList.removeChild(mapPinsList.children[i]);
        }
      }
    },
    returnPinMainToStartPosition: function () {
      mapPinMain.style.top = pinMainStartY;
      mapPinMain.style.left = pinMainStartX;
      window.map.setAddressToAdForm();
    },
    setAddressToAdForm: function () {
      var left = parseInt(mapPinMain.offsetLeft, 10) + Math.round(window.Constant.PIN_MAIN_WIDTH / 2);
      var top = parseInt(mapPinMain.offsetTop, 10);
      if (map.classList.contains('map--faded')) {
        top = top + Math.round(window.Constant.PIN_MAIN_HEIGHT / 2);
      } else {
        top = top + window.Constant.PIN_MAIN_HEIGHT_ACTIVE;
      }
      var leftString = left + '';
      var topString = top + '';
      window.form.setAddress(leftString + ', ' + topString);
    },
    onFiltersChange: function () {
      window.debounce(function () {
        window.map.removeCard();
        window.map.removeSimilarPins();

        renderSimilarPins();
      });
    }
  };

  window.condition.deactivatePage();

  mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  mapPinMain.addEventListener('keydown', onMapPinMainEnterPress);
})();
