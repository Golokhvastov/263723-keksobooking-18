'use strict',
(function () {
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

    PRICE_MAX: 1000000,
    ROOMS_CAPACITY: new Map().set('1', ['1'])
                              .set('2', ['1', '2'])
                              .set('3', ['1', '2', '3'])
                              .set('100', ['0']),
    PRICE_MIN_FOR_TYPE: new Map().set('bungalo', 0)
                                  .set('flat', 1000)
                                  .set('house', 5000)
                                  .set('palace', 10000)
  }
})();
