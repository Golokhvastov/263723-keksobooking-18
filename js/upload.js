'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.timeout = 10000; // 10s

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
