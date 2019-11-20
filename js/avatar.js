'use strict';
(function () {
  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview');

  var createPreviewForAvatar = function (photos) {
    var file = photos[0];
    var fileName = file.name.toLowerCase();

    var matches = window.Constant.PHOTO_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.querySelector('img').style.zIndex = '-1';
        preview.style.backgroundImage = 'url(' + reader.result + ')';
        preview.style.backgroundSize = 'cover';
      });

      reader.readAsDataURL(file);
    }
  };

  window.avatar = {
    clear: function () {
      preview.querySelector('img').style.zIndex = 'auto';
      preview.style.backgroundImage = 'none';
    }
  };

  fileChooser.addEventListener('change', function () {
    createPreviewForAvatar(fileChooser.files);
  });

  var dropArea = document.querySelector('.ad-form-header__drop-zone');
  dropArea.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  }, false);
  dropArea.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
  }, false);
  dropArea.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);
  dropArea.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var dt = evt.dataTransfer;
    var files = dt.files;
    createPreviewForAvatar(files);
  }, false);
})();
