'use strict';
(function () {
  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, window.Constant.DEBOUNCE_INTERVAL);
  };
})();
