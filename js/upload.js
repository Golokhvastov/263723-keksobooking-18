'use strict';
(function () {
  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.Constant.XHR_STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        window.onError();
      }
    });

    xhr.addEventListener('error', function () {
      window.onError();
    });

    xhr.addEventListener('timeout', function () {
      window.onError();
    });

    xhr.timeout = window.Constant.XHR_TIMEOUT_MS;

    xhr.open('POST', window.Constant.URL_FOR_SEND_AD_FORM_DATA);
    xhr.send(data);
  };
})();
