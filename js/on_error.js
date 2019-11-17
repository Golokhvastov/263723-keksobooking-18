'use strict';
(function () {
  var domElementMain = document.querySelector('main');
  var errorTemplate = document.querySelector('#error');

  var renderErrorMessage = function (template, message) {
    var fragment = template.content.cloneNode(true);
    if (message) {
      fragment.querySelector('.error__message').textContent = message;
    }
    domElementMain.appendChild(fragment);
  };

  var onErrorClick = function () {
    domElementMain.removeChild(domElementMain.querySelector('.error'));

    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onEscPress);
  }

  var onEscPress = function (evt) {
    if (evt.keyCode === window.constant.ESC_KEYCODE) {
      onErrorClick();
    }
  }

  window.onError = function (message) {
    renderErrorMessage(errorTemplate, message);

    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('click', onErrorClick);
    errorButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constant.ENTER_KEYCODE) {
        onErrorClick();
      }
    });
    document.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onEscPress);
  };
})();
