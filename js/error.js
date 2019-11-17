'use strict';
(function () {
  var domElementMain = document.querySelector('main');
  var errorTemplate = document.querySelector('#error');

  var renderErrorMessage = function (template, message) {
    var fragment = template.content.cloneNode(true);
    fragment.querySelector('.error__message').textContent = message;
    domElementMain.appendChild(fragment);
  };

  var removeError = function () {
    domElementMain.removeChild(domElementMain.querySelector('.error'));
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onEscKeydown);
  }

  var onErrorButtonClick = function (url, onSuccess, onError) {
    removeError();
    window.load(url, onSuccess, onError);
  };

  var onErrorClick = function () {
    removeError();
  }

  var onEscKeydown = function (evt) {
    if (evt.keyCode === window.constant.ESC_KEYCODE) {
      onErrorClick();
    }
  }

  window.error = function (message, url, onSuccess, onError) {
    renderErrorMessage(errorTemplate, message);

    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('click', function (evt) {
      onErrorButtonClick(url, onSuccess, onError);
    });
    errorButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constant.ENTER_KEYCODE) {
        onErrorButtonClick(url, onSuccess, onError);
      }
    });
    document.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onEscKeydown);
  };
})();
