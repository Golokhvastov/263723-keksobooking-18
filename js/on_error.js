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

    var errorButton = document.querySelector('.error__button');

    errorButton.removeEventListener('click', onErrorClick);
    errorButton.removeEventListener('keydown', onErrorButtonEnterPress);
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    window.util.isEscEvent(evt, onErrorClick);
  };

  var onErrorButtonEnterPress = function (evt) {
    window.util.isEnterEvent(evt, onErrorClick);
  };

  window.onError = function (message) {
    renderErrorMessage(errorTemplate, message);

    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('click', onErrorClick);
    errorButton.addEventListener('keydown', onErrorButtonEnterPress);
    document.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onEscPress);
  };
})();
