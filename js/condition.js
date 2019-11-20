'use strict';
(function () {
  var isActive = false;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = document.querySelectorAll('.ad-form  fieldset');
  var mapFiltersFieldsets = document.querySelectorAll('.map__filters  select, .map__filters  fieldset');

  window.condition = {
    isPageActive: function () {
      return isActive;
    },

    deactivatePage: function () {
      if (!map.classList.contains('map--faded')) {
        map.classList.add('map--faded');
      }
      if (!adForm.classList.contains('ad-form--disabled')) {
        adForm.classList.add('ad-form--disabled');
      }
      adFormFieldsets.forEach(function (fieldset) {
        fieldset.disabled = true;
      });
      mapFiltersFieldsets.forEach(function (fieldset) {
        fieldset.disabled = true;
      });
      isActive = false;
      window.map.setAddressToAdForm();
    },
    activatePage: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      adFormFieldsets.forEach(function (fieldset) {
        fieldset.disabled = false;
      });
      isActive = true;
    },
    activateFiltersForm: function () {
      mapFiltersFieldsets.forEach(function (fieldset) {
        fieldset.disabled = false;
      });
    }
  };
})();
