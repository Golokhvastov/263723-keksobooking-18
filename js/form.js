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

  window.form = {
    setAdFormAddress: function (address) {
      adFormAddress.value = address;
    }
  };

  adForm.setAttribute('action', 'https://js.dump.academy/keksobooking');

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
})();
