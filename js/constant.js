'use strict';
(function () {
  window.Constant = {
    MAX_SIMILAR_PINS_IN_MAP: 5,
    DEBOUNCE_INTERVAL: 500,

    PIN_Y_LIMIT_MIN: 130,
    PIN_Y_LIMIT_MAX: 630,

    PIN_MAIN_WIDTH: 65,
    PIN_MAIN_HEIGHT: 60,
    PIN_MAIN_SHARP_END_LENGTH: 21,

    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,

    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PARAMETER_FROM_TYPE: {
      'bungalo': {
        TYPE_RUS: 'Бунгало',
        MIN_PRICE: 0
      },
      'flat': {
        TYPE_RUS: 'Квартира',
        MIN_PRICE: 1000
      },
      'house': {
        TYPE_RUS: 'Дом',
        MIN_PRICE: 5000
      },
      'palace': {
        TYPE_RUS: 'Дворец',
        MIN_PRICE: 10000
      }
    },

    PRICE_MAX: 1000000,
    ROOMS_CAPACITY: {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0']
    }
  };

  window.Constant.PIN_MAIN_HEIGHT_ACTIVE = window.Constant.PIN_MAIN_HEIGHT + window.Constant.PIN_MAIN_SHARP_END_LENGTH;
})();
