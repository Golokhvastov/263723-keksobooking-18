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

  var adFormButtonReset = adForm.querySelector('.ad-form__reset');

  var domElementMain = document.querySelector('main');
  var successTemplate = document.querySelector('#success');

  var filtersForm = document.querySelector('.map__filters');

  var onAdFormTypeChange = function () {
    adFormPrice.min = window.Constant.PARAMETER_FROM_TYPE[adFormType.value].MIN_PRICE;
    adFormPrice.placeholder = window.Constant.PARAMETER_FROM_TYPE[adFormType.value].MIN_PRICE;
  };

  var isRoomsEnough = function (validCapacities) {
    return validCapacities.some(function (it) {
      return adFormCapacity.value === it;
    });
  };

  var createStringIfRoomsNotEnough = function (validCapacities) {
    var roomSelectedIndex = adFormRoomNumber.options.selectedIndex;
    var result = adFormRoomNumber.options[roomSelectedIndex].text + ' - допустимое количество гостей:';

    for (var i = 0; i < validCapacities.length; i++) {
      if (i === validCapacities.length - 1) {
        result = result + ' ' + validCapacities[i];
      } else {
        result = result + ' ' + validCapacities[i] + ',';
      }
    }

    return result;
  }

  var onAdFormCapacityOrRoomChange = function () {
    var validCapacities = window.Constant.ROOMS_CAPACITIES[adFormRoomNumber.value];

    if (isRoomsEnough(validCapacities)) {
      adFormCapacity.setCustomValidity('');
    } else {
      adFormCapacity.setCustomValidity(createStringIfRoomsNotEnough(validCapacities));
    }
  };

  var onSuccessMessageClick = function () {
    domElementMain.removeChild(domElementMain.querySelector('.success'));

    document.removeEventListener('click', onSuccessMessageClick);
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    window.util.isEscEvent(evt, onSuccessMessageClick);
  };

  var renderSuccessMessage = function (template) {
    var fragment = template.content.cloneNode(true);
    domElementMain.appendChild(fragment);

    document.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onEscPress);
  };

  var resetPage = function () {
    window.debounce();
    adForm.reset();
    filtersForm.reset();
    window.map.removeCard();
    window.map.removeSimilarPins();
    window.map.returnPinMainToStartPosition();
    window.condition.deactivatePage();
  };

  window.form = {
    setAddress: function (address) {
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
  adFormPrice.max = window.Constant.PRICE_MAX;

  adFormType.addEventListener('change', onAdFormTypeChange);
  adFormTimeIn.addEventListener('change', function () {
    adFormTimeOut.value = adFormTimeIn.value;
  });
  adFormTimeOut.addEventListener('change', function () {
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
  adFormButtonReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetPage();
  });
})();
