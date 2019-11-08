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
var TYPES = ['palace', 'flat', 'house', 'bungalo']
var ROOMS_MIN = 1;
var ROOMS_MAX = 10;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var CHECK_INS = ['12:00', '13:00', '14:00'];
var CHECK_OUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getArrayUniqueNumbers = function (min, max, length) {
  var result = [];
  var usedNumbers = [];
  if (length - 1 <= max - min) { //Иначе будет бесконечный цикл
    for (var i = 0; i < length; i++) {
      var uniqueNumber = getRandomInt(min, max);
      while (true) {
        if (usedNumbers.includes(uniqueNumber)) {
          uniqueNumber = getRandomInt(min, max);
        } else {
          usedNumbers.push(uniqueNumber);
          break;
        }
      }
      result.push(uniqueNumber);
    }
  }
  return result;
}

var getRandomArrayPart = function (array) {
  var result = [];
  var randomLenght = getRandomInt(1, array.length);
  var randomNumbers = getArrayUniqueNumbers(0, array.length - 1, randomLenght);
  for (var i = 0; i < randomLenght; i++) {
    result.push(array[randomNumbers[i]]);
  }
  return result;
}

var getPin = function (avatarNumber) {
  var locationX = getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX);
  var locationY = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
  return {
    author: {
      avatar: 'img/avatars/user0' + avatarNumber + '.png'
    },
    offer: {
      title: 'заголовок предложения' + avatarNumber,
      address: locationX + ', ' + locationY,
      price: getRandomInt(PRICE_MIN, PRICE_MAX),
      type: TYPES[getRandomInt(0, TYPES.length - 1)],
      rooms: getRandomInt(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomInt(GUESTS_MIN, GUESTS_MAX),
      checkin: CHECK_INS[getRandomInt(0, CHECK_INS.length - 1)],
      checkout: CHECK_OUTS[getRandomInt(0, CHECK_OUTS.length - 1)],
      features: getRandomArrayPart(FEATURES),
      description: 'строка с описанием',
      photos: getRandomArrayPart(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
}

var getSimilarPins = function (amount) {
  var result = [];
  var avatarNumbers = getArrayUniqueNumbers(1, PIN_AMOUNT, PIN_AMOUNT);
  for (var i = 0; i < amount; i++) {
    result.push(getPin(avatarNumbers[i]));
  }
  return result;
}

var createPinElement = function (template, pin) {
  var pinElement = template.content.cloneNode(true);
  var locX = pin.location.x - (PIN_WIDTH / 2);
  var locY = pin.location.y - PIN_HEIGHT;
  pinElement.querySelector('.map__pin').style = 'left: ' + locX + 'px; top: ' + locY + 'px;';
  pinElement.querySelector('.map__pin img').src = pin.author.avatar;
  pinElement.querySelector('.map__pin img').alt = pin.offer.title;
  return pinElement;
}

var renderSimilarPins = function (list, template, pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPinElement(template, pins[i]));
  }
  list.appendChild(fragment);
}

var similarPins = getSimilarPins(PIN_AMOUNT);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinsList = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin');

renderSimilarPins(mapPinsList, similarPinTemplate, similarPins);
