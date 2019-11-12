'use strict';

var PIN_AMOUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = document.querySelector('.map').clientWidth;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 100000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MIN = 1;
var ROOMS_MAX = 10;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var CHECK_INS = ['12:00', '13:00', '14:00'];
var CHECK_OUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var TYPES_RUS = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];

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
      photos: getRandomArrayPart(PHOTOS)
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

var getTypeRus = function (type) {
  var typeRus = '';
  for (var i = 0; i < TYPES.length; i++) {
    if (type == TYPES[i]) {
      typeRus = TYPES_RUS[i];
      break;
    }
  }
  return typeRus;
};

var removeExcessiveFeatures = function (cardElement, features) {
  for (var i = 0; i < FEATURES.length; i++) {
    if (!features.includes(FEATURES[i])) {
      cardElement.querySelector('.popup__feature--' + FEATURES[i]).remove();
    }
  }
}

var createCardPhotos = function (cardElement, photos) {
  if (photos.length == 0) {
    cardElement.querySelector('.popup__photo').remove();
  } else {
    cardElement.querySelector('.popup__photo').src = photos[0];
    if (photos.length > 1) {
      for (var i = 1; i < photos.length; i++) {
        var popupPhoto = cardElement.querySelector('.popup__photo').cloneNode(true);
        popupPhoto.src = photos[i];
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
  cardElement.querySelector('.popup__type').textContent = getTypeRus(card.offer.type);
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

var similarPins = getSimilarPins(PIN_AMOUNT);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinsList = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin');

renderSimilarPins(mapPinsList, similarPinTemplate, similarPins);

var cardTemplate = document.querySelector('#card');

renderCard(map, cardTemplate, similarPins[0]);
