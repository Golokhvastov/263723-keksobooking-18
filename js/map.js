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

  var renderSimilarPins = function (list, template, pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.createPinElement(template, pins[i]));
    }
    list.appendChild(fragment);
  };

  var renderCard = function (list, template, card) {
    var fragment = window.card.createCardElement(template, card);
    list.insertBefore(fragment, document.querySelector('.map__filters-container'));
  };

  var onPopupCloseClick = function () {
    map.querySelector('.popup__close').removeEventListener('click', onPopupCloseClick);
    document.removeEventListener('keydown', onPopupEscPress);
    map.removeChild(map.querySelector('.map__card'));
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constant.ESC_KEYCODE) {
      onPopupCloseClick();
    }
  };

  var onMapSimilarPinClick = function (similarPin) {
    if (map.contains(map.querySelector('.popup__close'))) {
      onPopupCloseClick();
    }
    renderCard(map, cardTemplate, similarPin);

    map.querySelector('.popup__close').addEventListener('click', onPopupCloseClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var createListenerForRenderCard = function (pinDomElement, similarPin) {
    pinDomElement.addEventListener('click', function () {
      onMapSimilarPinClick(similarPin);
    });
    pinDomElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constant.ENTER_KEYCODE) {
        onMapSimilarPinClick(similarPin);
      }
    });
  };

  var activatePage = function () {
    if (!window.condition.isStatusActive()) {
      window.condition.activeStatus();
      window.map.setAddressFromMap();

      window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
    }
  };

  var onMapPinMainEnter = function (evt) {
    if (evt.keyCode === window.constant.ENTER_KEYCODE) {
      activatePage();
    }
  };

  var onMapPinMainMousedown = function (evt) {
    evt.preventDefault();

    activatePage();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinCenterX = 0 - window.constant.PIN_MAIN_WIDTH / 2;
    var pinCenterY = window.constant.PIN_MAIN_HEIGHT_ACTIVE / 2;
    var mapLeft = map.offsetLeft;
    var mapWidth = map.offsetWidth;
    var minY = window.constant.PIN_Y_LIMIT_MIN;
    var maxY = window.constant.PIN_Y_LIMIT_MAX;

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
    renderSimilarPins(mapPinsList, similarPinTemplate, similarPins);

    for (var i = 0; i < similarPins.length; i++) {
      createListenerForRenderCard(mapPinsList.children[lengthBeforeRender + i], similarPins[i]);
    }
  };

  window.map = {
    removeSimilarPinsAndCard: function () {
      if (map.contains(map.querySelector('.popup__close'))) {
        onPopupCloseClick();
      }
      for (var i = mapPinsList.children.length - 1; i >= lengthBeforeRender; i--) {
        mapPinsList.removeChild(mapPinsList.children[i]);
      }
    },
    returnPinMainToStartPosition: function () {
      mapPinMain.style.top = pinMainStartY;
      mapPinMain.style.left = pinMainStartX;
      window.map.setAddressFromMap();
    },
    setAddressFromMap: function () {
      var left = parseInt(mapPinMain.offsetLeft, 10) + Math.round(window.constant.PIN_MAIN_WIDTH / 2);
      var top = parseInt(mapPinMain.offsetTop, 10);
      if (map.classList.contains('map--faded')) {
        top = top + Math.round(window.constant.PIN_MAIN_HEIGHT / 2);
      } else {
        top = top + window.constant.PIN_MAIN_HEIGHT_ACTIVE;
      }
      var leftString = left + '';
      var topString = top + '';
      window.form.setAdFormAddress(leftString + ', ' + topString);
    }
  }

  window.condition.inactiveStatus();

  mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  mapPinMain.addEventListener('keydown', onMapPinMainEnter);
})();
