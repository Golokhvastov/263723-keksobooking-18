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

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.createPinElement(similarPinTemplate, pins[i]));
    }
    mapPinsList.appendChild(fragment);
  };

  var renderSimilarPins = function () {
    var filteredPins = window.filters(similarPins);

    renderPins(filteredPins);

    for (var i = 0; i < filteredPins.length; i++) {
      createListenerForRenderCard(mapPinsList.children[lengthBeforeRender + i], filteredPins[i]);
    }
  };

  var renderCard = function (pin) {
    var fragment = window.card.createCardElement(cardTemplate, pin);
    map.insertBefore(fragment, document.querySelector('.map__filters-container'));
  };

  var onCardCloseClick = function () {
    map.querySelector('.popup__close').removeEventListener('click', onCardCloseClick);
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

    map.querySelector('.popup__close').addEventListener('click', onCardCloseClick);
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

  var activatePage = function () {
    if (!window.condition.isStatusActive()) {
      window.condition.activeStatus();
      window.map.setAddressFromMap();

      window.load('https://js.dump.academy/keksobooking/data', onSuccess, window.onError);
    }
  };

  var onMapPinMainEnterPress = function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  };

  var onMapPinMainMousedown = function (evt) {
    evt.preventDefault();

    activatePage();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinCenterX = 0 - window.Constant.PIN_MAIN_WIDTH / 2;
    var pinCenterY = window.Constant.PIN_MAIN_HEIGHT_ACTIVE / 2;
    var mapLeft = map.offsetLeft;
    var mapWidth = map.offsetWidth;
    var minY = window.Constant.PIN_Y_LIMIT_MIN;
    var maxY = window.Constant.PIN_Y_LIMIT_MAX;

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

      window.map.setAddressFromMap();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.setAddressFromMap();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onSuccess = function (data) {
    similarPins = data;

    renderSimilarPins();
  };

  window.map = {
    removeCard: function () {
      if (map.contains(map.querySelector('.popup__close'))) {
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
      window.map.setAddressFromMap();
    },
    setAddressFromMap: function () {
      var left = parseInt(mapPinMain.offsetLeft, 10) + Math.round(window.Constant.PIN_MAIN_WIDTH / 2);
      var top = parseInt(mapPinMain.offsetTop, 10);
      if (map.classList.contains('map--faded')) {
        top = top + Math.round(window.Constant.PIN_MAIN_HEIGHT / 2);
      } else {
        top = top + window.Constant.PIN_MAIN_HEIGHT_ACTIVE;
      }
      var leftString = left + '';
      var topString = top + '';
      window.form.setAdFormAddress(leftString + ', ' + topString);
    },
    onFiltersChange: function () {
      window.debounce(function () {
        window.map.removeCard();
        window.map.removeSimilarPins();

        renderSimilarPins();
      });
    }
  };

  window.condition.inactiveStatus();

  mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  mapPinMain.addEventListener('keydown', onMapPinMainEnterPress);
})();
