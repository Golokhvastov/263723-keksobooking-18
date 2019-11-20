'use strict';
(function () {
  var removeExcessiveFeatures = function (cardElement, features) {
    window.Constant.FEATURES.forEach(function (feature) {
      if (!features.includes(feature)) {
        cardElement.querySelector('.popup__feature--' + feature).remove();
      }
    });
  };

  var createCardPhotos = function (cardElement, photos) {
    var cardElementPhoto = cardElement.querySelector('.popup__photo');
    var cardElementPhotos = cardElement.querySelector('.popup__photos');

    if (photos.length === 0) {
      cardElementPhoto.remove();
    } else {
      cardElementPhoto.src = photos[0];
      if (photos.length > 1) {
        for (var i = 1; i < photos.length; i++) {
          var cloneOfCardElementPhoto = cardElementPhoto.cloneNode(true);
          cloneOfCardElementPhoto.src = photos[i];
          cardElementPhotos.appendChild(cloneOfCardElementPhoto);
        }
      }
    }
  };

  var executeIfPropertyExist = function (domElement, property, action) {
    if (property !== undefined) {
      action();
    } else {
      domElement.remove();
    }
  };

  window.card = {
    create: function (template, card) {
      var cardElement = template.content.cloneNode(true);

      var domElement = cardElement.querySelector('.popup__title');
      executeIfPropertyExist(domElement, card.offer.title, function () {
        domElement.textContent = card.offer.title;
      });

      domElement = cardElement.querySelector('.popup__text--address');
      executeIfPropertyExist(domElement, card.offer.address, function () {
        domElement.textContent = card.offer.address;
      });

      domElement = cardElement.querySelector('.popup__text--price');
      executeIfPropertyExist(domElement, card.offer.price, function () {
        domElement.textContent = card.offer.price + '₽/ночь';
      });

      domElement = cardElement.querySelector('.popup__type');
      executeIfPropertyExist(domElement, card.offer.type, function () {
        domElement.textContent = window.Constant.PARAMETER_FROM_TYPE[card.offer.type].TYPE_RUS;
      });

      domElement = cardElement.querySelector('.popup__text--capacity');
      executeIfPropertyExist(domElement, card.offer.rooms, function () {
        executeIfPropertyExist(domElement, card.offer.guests, function () {
          domElement.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
        });
      });

      domElement = cardElement.querySelector('.popup__text--time');
      executeIfPropertyExist(domElement, card.offer.checkin, function () {
        executeIfPropertyExist(domElement, card.offer.checkout, function () {
          domElement.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
        });
      });

      domElement = cardElement.querySelector('.popup__features');
      executeIfPropertyExist(domElement, card.offer.features, function () {
        removeExcessiveFeatures(cardElement, card.offer.features);
      });

      domElement = cardElement.querySelector('.popup__description');
      executeIfPropertyExist(domElement, card.offer.description, function () {
        domElement.textContent = card.offer.description;
      });

      domElement = cardElement.querySelector('.popup__photos');
      executeIfPropertyExist(domElement, card.offer.photos, function () {
        createCardPhotos(cardElement, card.offer.photos);
      });

      domElement = cardElement.querySelector('.popup__avatar');
      executeIfPropertyExist(domElement, card.author, function () {
        executeIfPropertyExist(domElement, card.author.avatar, function () {
          domElement.src = card.author.avatar;
        });
      });

      return cardElement;
    }
  };
})();
