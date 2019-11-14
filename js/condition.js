'use strict';
(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = document.querySelectorAll('.ad-form  fieldset');
  var mapFiltersFieldsets = document.querySelectorAll('.map__filters  select, .map__filters  fieldset');

  window.condition = {
    inactiveStatus: function () {
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
    },
    activeStatus: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      for (var i = 0; i < adFormFieldsets.length; i++) {
        adFormFieldsets[i].disabled = false;
      }
      for (var j = 0; j < mapFiltersFieldsets.length; j++) {
        mapFiltersFieldsets[j].disabled = false;
      }
    }
  };
})();
