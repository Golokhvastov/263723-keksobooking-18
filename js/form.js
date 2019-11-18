'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');

  var adFormTitle = adForm.querySelector('#title');
  var adFormAddress = adForm.querySelector('#address');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');

  var domElementMain = document.querySelector('main');
  var successTemplate = document.querySelector('#success');

  var filtersForm = document.querySelector('.map__filters');

  var onAdFormTypeChange = function () {
    adFormPrice.min = window.constant.PARAMETERS_FROM_TYPE[adFormType.value].minPrice;
  };

  var isRoomsEnough = function () {
    var validCapacity = window.constant.ROOMS_CAPACITY[adFormRoomNumber.value];
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

  var onSuccessClick = function () {
    domElementMain.removeChild(domElementMain.querySelector('.success'));

    document.removeEventListener('click', onSuccessClick);
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.constant.ESC_KEYCODE) {
      onSuccessClick();
    }
  };

  var renderSuccessMessage = function (template) {
    var fragment = template.content.cloneNode(true);
    domElementMain.appendChild(fragment);

    document.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onEscPress);
  };

  var resetPage = function () {
    adForm.reset();
    filtersForm.reset();
    window.map.removeCard();
    window.map.removeSimilarPins();
    window.map.returnPinMainToStartPosition();
    window.condition.inactiveStatus();
  }

  window.form = {
    setAdFormAddress: function (address) {
      adFormAddress.value = address;
    }
  };

  onAdFormCapacityOrRoomChange();
  onAdFormTypeChange();

  adFormTitle.required = true;
  adFormTitle.setAttribute('minlength', '30');
  adFormTitle.setAttribute('maxlength', '100');
  adFormAddress.setAttribute('readonly', true);
  adFormPrice.required = true;
  adFormPrice.max = window.constant.PRICE_MAX;

  adFormType.addEventListener('change', onAdFormTypeChange);
  adFormTimeIn.addEventListener('change', function () {
    adFormTimeOut.value = adFormTimeIn.value;
  });
  adFormTimeIn.addEventListener('change', function () {
    adFormTimeIn.value = adFormTimeOut.value;
  });
  adFormCapacity.addEventListener('change', onAdFormCapacityOrRoomChange);
  adFormRoomNumber.addEventListener('change', onAdFormCapacityOrRoomChange);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), function () {
      renderSuccessMessage(successTemplate);
      resetPage();
    });
  });
  adForm.addEventListener('reset', function (evt) {
    evt.preventDefault();
    resetPage();
  });
})();
