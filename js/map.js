'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin');
  var cardTemplate = document.querySelector('#card');
  var similarPins = window.data.getSimilarPins(window.constant.PIN_AMOUNT);

  var renderSimilarPins = function (list, template, pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.createPinElement(template, pins[i]));
    }
    list.appendChild(fragment);
  };

  var renderCard = function (list, template, card) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.createCardElement(template, card));
    list.insertBefore(fragment, document.querySelector('.map__filters-container'));
  };

  var setAddressFromMap = function () {
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

  var onMapSimilarPinClick = function (i, lengthBeforeRender) {
    if (map.contains(map.querySelector('.popup__close'))) {
      onPopupCloseClick();
    }
    renderCard(map, cardTemplate, similarPins[i - lengthBeforeRender]);

    map.querySelector('.popup__close').addEventListener('click', onPopupCloseClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var createListenerForRenderCard = function (i, lengthBeforeRender) {
    mapPinsList.children[i].addEventListener('click', function () {
      onMapSimilarPinClick(i, lengthBeforeRender);
    });
    mapPinsList.children[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constant.ENTER_KEYCODE) {
        onMapSimilarPinClick(i, lengthBeforeRender);
      }
    });
  };

  var onMapPinMainMousedown = function () {
    window.condition.activeStatus();
    setAddressFromMap();

    renderSimilarPins(mapPinsList, similarPinTemplate, similarPins);

    var lengthBeforeRender = mapPinsList.children.length - window.constant.PIN_AMOUNT;
    for (var i = lengthBeforeRender; i < mapPinsList.children.length; i++) {
      createListenerForRenderCard(i, lengthBeforeRender);
    }

    mapPinMain.removeEventListener('mousedown', onMapPinMainMousedown);
    mapPinMain.removeEventListener('keydown', onMapPinMainEnter);
  };

  var onMapPinMainEnter = function (evt) {
    if (evt.keyCode === window.constant.ENTER_KEYCODE) {
      onMapPinMainMousedown();
    }
  };

  window.condition.inactiveStatus();
  setAddressFromMap();
  mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  mapPinMain.addEventListener('keydown', onMapPinMainEnter);
})();
