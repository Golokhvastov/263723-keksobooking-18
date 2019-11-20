'use strict';
(function () {
  var fileChooser = document.querySelector('.ad-form__photo-container input[type=file]');
  var preview = document.querySelector('.ad-form__photo');
  var previewContainer = document.querySelector('.ad-form__photo-container');

  var startLength = previewContainer.children.length;

  var createListenerForCreatePreview = function (reader, i) {
    reader.addEventListener('load', function () {
      if (i === 0) {
        preview.style.backgroundImage = 'url(' + reader.result + ')';
        preview.style.backgroundSize = 'cover';
      } else {
        var cloneOfPreview = preview.cloneNode(true);
        cloneOfPreview.style.backgroundImage = 'url(' + reader.result + ')';
        cloneOfPreview.style.backgroundSize = 'cover';
        previewContainer.appendChild(cloneOfPreview);
      }
    });
  };

  var deleteOldPhotos = function () {
    if (previewContainer.children.length > startLength) {
      for (var i = previewContainer.children.length - 1; i >= startLength; i--) {
        previewContainer.removeChild(previewContainer.children[i]);
      }
    }
  };

  var createPreviewForPhotos = function (photos) {
    deleteOldPhotos();

    for (var i = 0; i < photos.length; i++) {
      var file = photos[i];
      var fileName = file.name.toLowerCase();

      var matches = window.Constant.PHOTO_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        createListenerForCreatePreview(reader, i);

        reader.readAsDataURL(file);
      }
    }
  };

  window.photos = {
    clear: function () {
      deleteOldPhotos();
      preview.style.backgroundImage = 'none';
    }
  };

  fileChooser.setAttribute('multiple', 'true');

  fileChooser.addEventListener('change', function () {
    createPreviewForPhotos(fileChooser.files);
  });

  var dropArea = document.querySelector('.ad-form__drop-zone');
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
    createPreviewForPhotos(files);
  }, false);
})();
