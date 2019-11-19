'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');

  window.filters = function (similarPins) {
    var filteredPins = similarPins.slice();

    filteredPins = filteredPins.filter(function (pin) {
      return pin.offer !== undefined && pin.location !== undefined && pin.location.x !== undefined && pin.location.y !== undefined;
    });


    var typeFilterValue = filtersForm.querySelector('#housing-type').value;
    if (typeFilterValue !== 'any') {
      filteredPins = filteredPins.filter(function (pin) {
        return pin.offer.type === typeFilterValue;
      });
    }

    var priceFilterValue = filtersForm.querySelector('#housing-price').value;
    if (priceFilterValue !== 'any') {
      filteredPins = filteredPins.filter(function (pin) {
        switch (priceFilterValue) {
          case window.Constant.PRICE_RANGE.LOW.VALUE_OF_FILTER:
            return pin.offer.price < window.Constant.PRICE_RANGE.LOW.MAX_PRICE;
          case window.Constant.PRICE_RANGE.MIDDLE.VALUE_OF_FILTER:
            return window.Constant.PRICE_RANGE.MIDDLE.MIN_PRICE <= pin.offer.price && pin.offer.price <= window.Constant.PRICE_RANGE.MIDDLE.MAX_PRICE;
          case window.Constant.PRICE_RANGE.HIGH.VALUE_OF_FILTER:
            return pin.offer.price > window.Constant.PRICE_RANGE.MIDDLE.MIN_PRICE;
          default:
            return false;
        }
      });
    }

    var roomsFilterValue = filtersForm.querySelector('#housing-rooms').value;
    if (roomsFilterValue !== 'any') {
      filteredPins = filteredPins.filter(function (pin) {
        return (pin.offer.rooms + '') === roomsFilterValue;
      });
    }

    var guestsFilterValue = filtersForm.querySelector('#housing-guests').value;
    if (guestsFilterValue !== 'any') {
      filteredPins = filteredPins.filter(function (pin) {
        return (pin.offer.guests + '') === guestsFilterValue;
      });
    }

    var featuresCheckboxs = filtersForm.querySelectorAll('.map__features  .map__checkbox');
    for (var i = 0; i < featuresCheckboxs.length; i++) {
      if (featuresCheckboxs[i].checked) {
        filteredPins = filteredPins.filter(function (pin) {
          return pin.offer.features.includes(featuresCheckboxs[i].value);
        });
      }
    }

    if (filteredPins.length > window.Constant.MAX_SIMILAR_PINS_IN_MAP) {
      filteredPins = filteredPins.slice(0, window.Constant.MAX_SIMILAR_PINS_IN_MAP);
    }

    return filteredPins;
  };

  filtersForm.addEventListener('change', window.map.onFiltersChange);
})();
