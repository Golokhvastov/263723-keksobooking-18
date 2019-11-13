'use strict';
(function () {
  var PIN_AMOUNT = 8;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = document.querySelector('.map').clientWidth;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var PRICE_MIN = 0;
  var PRICE_MAX = 1000000;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TYPES_RUS = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 10;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
  var CHECK_INS = ['12:00', '13:00', '14:00'];
  var CHECK_OUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = 3;

  var TYPES_RUS = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 60;
  var PIN_MAIN_HEIGHT_ACTIVE = PIN_MAIN_HEIGHT + 21;

  var ROOMS_CAPACITY = new Map().set('1', ['1'])
                                .set('2', ['1', '2'])
                                .set('3', ['1', '2', '3'])
                                .set('100', ['0']);
  var PRICE_MIN_FOR_TYPE = new Map().set('bungalo', 0)
                                    .set('flat', 1000)
                                    .set('house', 5000)
                                    .set('palace', 10000);

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getArrayUniqueNumbers = function (min, max, length) {
    var result = [];
    var usedNumbers = [];
    if (length - 1 <= max - min) { // Иначе будет бесконечный цикл
      for (var i = 0; i < length; i++) {
        var uniqueNumber = getRandomInt(min, max);
        var isNumberUsed = true;
        while (isNumberUsed) {
          if (usedNumbers.includes(uniqueNumber)) {
            uniqueNumber = getRandomInt(min, max);
          } else {
            usedNumbers.push(uniqueNumber);
            isNumberUsed = false;
          }
        }
        result.push(uniqueNumber);
      }
    }
    return result;
  };

  var getRandomArrayPart = function (array) {
    var result = [];
    var randomLenght = getRandomInt(1, array.length);
    var randomNumbers = getArrayUniqueNumbers(0, array.length - 1, randomLenght);
    for (var i = 0; i < randomLenght; i++) {
      result.push(array[randomNumbers[i]]);
    }
    return result;
  };

  var getPin = function (avatarNumber) {
    var locationX = getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
    return {
      author: {
        avatar: 'img/avatars/user0' + avatarNumber + '.png'
      },
      offer: {
        title: 'заголовок предложения ' + avatarNumber,
        address: locationX + ', ' + locationY,
        price: getRandomInt(PRICE_MIN, PRICE_MAX),
        type: TYPES[getRandomInt(0, TYPES.length - 1)],
        rooms: getRandomInt(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomInt(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECK_INS[getRandomInt(0, CHECK_INS.length - 1)],
        checkout: CHECK_OUTS[getRandomInt(0, CHECK_OUTS.length - 1)],
        features: getRandomArrayPart(FEATURES),
        description: 'строка с описанием ' + avatarNumber,
        photos: getRandomArrayPart(getArrayUniqueNumbers(1, PHOTOS, PHOTOS))
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  var getSimilarPins = function (amount) {
    var result = [];
    var avatarNumbers = getArrayUniqueNumbers(1, PIN_AMOUNT, PIN_AMOUNT);
    for (var i = 0; i < amount; i++) {
      result.push(getPin(avatarNumbers[i]));
    }
    return result;
  };

  var createPinElement = function (template, pin) {
    var pinElement = template.content.cloneNode(true);
    var locX = pin.location.x - (PIN_WIDTH / 2);
    var locY = pin.location.y - PIN_HEIGHT;
    pinElement.querySelector('.map__pin').style = 'left: ' + locX + 'px; top: ' + locY + 'px;';
    pinElement.querySelector('.map__pin img').src = pin.author.avatar;
    pinElement.querySelector('.map__pin img').alt = pin.offer.title;
    return pinElement;
  };

  var renderSimilarPins = function (list, template, pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPinElement(template, pins[i]));
    }
    list.appendChild(fragment);
  };

  var removeExcessiveFeatures = function (cardElement, features) {
    for (var i = 0; i < FEATURES.length; i++) {
      if (!features.includes(FEATURES[i])) {
        cardElement.querySelector('.popup__feature--' + FEATURES[i]).remove();
      }
    }
  };

  var createCardPhotos = function (cardElement, photos) {
    if (photos.length === 0) {
      cardElement.querySelector('.popup__photo').remove();
    } else {
      cardElement.querySelector('.popup__photo').src = 'http://o0.github.io/assets/images/tokyo/hotel' + photos[0] + '.jpg';
      if (photos.length > 1) {
        for (var i = 1; i < photos.length; i++) {
          var popupPhoto = cardElement.querySelector('.popup__photo').cloneNode(true);
          popupPhoto.src = 'http://o0.github.io/assets/images/tokyo/hotel' + photos[i] + '.jpg';
          cardElement.querySelector('.popup__photos').appendChild(popupPhoto);
        }
      }
    }
  };

  var createCardElement = function (template, card) {
    var cardElement = template.content.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPES_RUS[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    removeExcessiveFeatures(cardElement, card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    createCardPhotos(cardElement, card.offer.photos);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    return cardElement;
  };

  var renderCard = function (list, template, card) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCardElement(template, card));
    list.insertBefore(fragment, document.querySelector('.map__filters-container'));
  };

  var inactiveState = function () {
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = true;
    }
    for (var j = 0; j < mapFiltersFieldsets.length; j++) {
      mapFiltersFieldsets[j].disabled = true;
    }
  };

  var activeState = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = false;
    }
    for (var j = 0; j < mapFiltersFieldsets.length; j++) {
      mapFiltersFieldsets[j].disabled = false;
    }
  };

  var setAddressFromMap = function () {
    var left = parseInt(mapPinMain.offsetLeft, 10) + Math.round(PIN_MAIN_WIDTH / 2);
    var top = parseInt(mapPinMain.offsetTop, 10);
    if (map.classList.contains('map--faded')) {
      top = top + Math.round(PIN_MAIN_HEIGHT / 2);
    } else {
      top = top + PIN_MAIN_HEIGHT_ACTIVE;
    }
    var leftString = left + '';
    var topString = top + '';
    adFormAddress.value = leftString + ', ' + topString;
  };

  var onPopupCloseClick = function () {
    map.querySelector('.popup__close').removeEventListener('click', onPopupCloseClick);
    document.removeEventListener('keydown', onPopupEscPress);
    map.removeChild(map.querySelector('.map__card'));
  }

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onPopupCloseClick();
    }
  }

  var onMapSimilarPinClick = function (i, lengthBeforeRender) {
    if (map.contains(map.querySelector('.popup__close'))) {
      onPopupCloseClick();
    }
    renderCard(map, cardTemplate, similarPins[i - lengthBeforeRender]);

    map.querySelector('.popup__close').addEventListener('click', onPopupCloseClick);
    document.addEventListener('keydown', onPopupEscPress);
  }

  var createListenerForRenderCard = function (i, lengthBeforeRender) {
    mapPinsList.children[i].addEventListener('click', function () {
      onMapSimilarPinClick(i, lengthBeforeRender);
    })
    mapPinsList.children[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        onMapSimilarPinClick(i, lengthBeforeRender);
      }
    })
  }

  var onMapPinMainMousedown = function () {
    activeState();
    setAddressFromMap();

    renderSimilarPins(mapPinsList, similarPinTemplate, similarPins);

    var lengthBeforeRender = mapPinsList.children.length - PIN_AMOUNT;
    for (var i = lengthBeforeRender; i < mapPinsList.children.length; i++) {
      createListenerForRenderCard(i, lengthBeforeRender);
    }

    mapPinMain.removeEventListener('mousedown', onMapPinMainMousedown);
    mapPinMain.removeEventListener('keydown', onMapPinMainEnter);
  };

  var onMapPinMainEnter = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onMapPinMainMousedown();
    }
  };

  var onAdFormTypeChange = function () {
    adFormPrice.min = PRICE_MIN_FOR_TYPE.get(adFormType.value);
  }

  var isRoomsEnough = function () {
    var validCapacity = ROOMS_CAPACITY.get(adFormRoomNumber.value);
    for (var i = 0; i < validCapacity.length; i++) {
      if (adFormCapacity.value === validCapacity[i]) {
        return true;
      }
    }
    return false;
  };

  var onAdFormCapacityOrRoomChange = function () {
    if (isRoomsEnough()) {
      adFormCapacity.setCustomValidity('');
    } else if (adFormRoomNumber.value === '100') {
      adFormCapacity.setCustomValidity('100 комнат - не для гостей');
    } else {
      adFormCapacity.setCustomValidity('Количество мест не может превышать Количество комнат');
    }
  };

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin');
  var cardTemplate = document.querySelector('#card');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = document.querySelectorAll('.ad-form  fieldset');
  var mapFiltersFieldsets = document.querySelectorAll('.map__filters  select, .map__filters  fieldset');
  var adFormTitle = adForm.querySelector('#title');
  var adFormAddress = adForm.querySelector('#address');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');

  var similarPins = getSimilarPins(PIN_AMOUNT);

  inactiveState();
  setAddressFromMap();
  adForm.setAttribute('action', 'https://js.dump.academy/keksobooking');
  mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  mapPinMain.addEventListener('keydown', onMapPinMainEnter);

  onAdFormCapacityOrRoomChange();
  onAdFormTypeChange();

  adFormTitle.required = true;
  adFormTitle.setAttribute('minlength', '30');
  adFormTitle.setAttribute('maxlength', '100');
  adFormAddress.disabled = true;
  adFormPrice.required = true;
  adFormPrice.max = PRICE_MAX;

  adFormType.addEventListener('change', onAdFormTypeChange);
  adFormTimeIn.addEventListener('change', function () {
    adFormTimeOut.value = adFormTimeIn.value;
  });
  adFormTimeIn.addEventListener('change', function () {
    adFormTimeIn.value = adFormTimeOut.value;
  });
  adFormCapacity.addEventListener('change', onAdFormCapacityOrRoomChange);
  adFormRoomNumber.addEventListener('change', onAdFormCapacityOrRoomChange);
})();
