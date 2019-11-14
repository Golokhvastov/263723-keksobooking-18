window.constant = {
  PIN_MAIN_WIDTH: 65,
  PIN_MAIN_HEIGHT: 60,
  PIN_MAIN_HEIGHT_ACTIVE: 60 + 21,

  PIN_AMOUNT: 8,
  PIN_WIDTH: 50,
  PIN_HEIGHT: 70,

  ESC_KEYCODE: 27,
  ENTER_KEYCODE: 13,

  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PARAMETERS_FROM_TYPE: {
    'bungalo': {
      typeRus: 'Бунгало',
      minPrice: 0
    },
    'flat': {
      typeRus: 'Квартира',
      minPrice: 1000
    },
    'house': {
      typeRus: 'Дом',
      minPrice: 5000
    },
    'palace': {
      typeRus: 'Дворец',
      minPrice: 10000
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
