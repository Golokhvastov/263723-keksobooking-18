'use strict';
(function () {
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
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getPin = function (avatarNumber) {
    var locationX = window.util.getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = window.util.getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
    return {
      author: {
        avatar: 'img/avatars/user0' + avatarNumber + '.png'
      },
      offer: {
        title: 'заголовок предложения ' + avatarNumber,
        address: locationX + ', ' + locationY,
        price: window.util.getRandomInt(PRICE_MIN, PRICE_MAX),
        type: TYPES[window.util.getRandomInt(0, TYPES.length - 1)],
        rooms: window.util.getRandomInt(ROOMS_MIN, ROOMS_MAX),
        guests: window.util.getRandomInt(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECK_INS[window.util.getRandomInt(0, CHECK_INS.length - 1)],
        checkout: CHECK_OUTS[window.util.getRandomInt(0, CHECK_OUTS.length - 1)],
        features: window.util.getRandomArrayPart(FEATURES),
        description: 'строка с описанием ' + avatarNumber,
        photos: window.util.getRandomArrayPart(PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  window.data = {
    getSimilarPins: function (amount) {
      var result = [];
      var avatarNumbers = window.util.getArrayUniqueNumbers(1, amount, amount);
      for (var i = 0; i < amount; i++) {
        result.push(getPin(avatarNumbers[i]));
      }
      return result;
    },
    getTypeRus: function (type) {
      var typeRus = '';
      for (var i = 0; i < TYPES.length; i++) {
        if (type === TYPES[i]) {
          typeRus = TYPES_RUS[i];
          break;
        }
      }
      return typeRus;
    }
  };
})();
