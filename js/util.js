'use strict';
(function () {
  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.Constant.ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.Constant.ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
