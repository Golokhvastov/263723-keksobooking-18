'use strict';
(function () {
  var removeExcessiveFeatures = function (cardElement, features) {
    for (var i = 0; i < window.constant.FEATURES.length; i++) {
      if (!features.includes(window.constant.FEATURES[i])) {
        cardElement.querySelector('.popup__feature--' + window.constant.FEATURES[i]).remove();
      }
    }
  };

  var createCardPhotos = function (cardElement, photos) {
    var cardElementPhoto = cardElement.querySelector('.popup__photo');

    if (photos.length === 0) {
      cardElementPhoto.remove();
    } else {
      cardElementPhoto.src = photos[0];
      if (photos.length > 1) {
        for (var i = 1; i < photos.length; i++) {
          var cloneCardElementPhoto = cardElementPhoto.cloneNode(true);
          cloneCardElementPhoto.src = photos[i];
          cardElement.querySelector('.popup__photos').appendChild(cloneCardElementPhoto);
        }
      }
    }
  };

  var executeIfPropertyExist = function (domElem, property, action) {
    if (property !== undefined) {
      action();
    } else {
      domElem.remove();
    }
  }

  window.card = {
    createCardElement: function (template, card) {
      var cardElement = template.content.cloneNode(true);

      var domElem = cardElement.querySelector('.popup__title');
      executeIfPropertyExist(domElem, card.offer.title, function () {
        domElem.textContent = card.offer.title;
      });

      domElem = cardElement.querySelector('.popup__text--address');
      executeIfPropertyExist(domElem, card.offer.address, function () {
        domElem.textContent = card.offer.address;
      });

      domElem = cardElement.querySelector('.popup__text--price');
      executeIfPropertyExist(domElem, card.offer.price, function () {
        domElem.textContent = card.offer.price + '₽/ночь';
      });

      domElem = cardElement.querySelector('.popup__type');
      executeIfPropertyExist(domElem, card.offer.type, function () {
        domElem.textContent = window.constant.PARAMETERS_FROM_TYPE[card.offer.type].typeRus;
      });

      domElem = cardElement.querySelector('.popup__text--capacity');
      executeIfPropertyExist(domElem, card.offer.rooms, function () {
        executeIfPropertyExist(domElem, card.offer.guests, function () {
          domElem.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
        });
      });

      domElem = cardElement.querySelector('.popup__text--time');
      executeIfPropertyExist(domElem, card.offer.checkin, function () {
        executeIfPropertyExist(domElem, card.offer.checkout, function () {
          domElem.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
        });
      });

      domElem = cardElement.querySelector('.popup__features');
      executeIfPropertyExist(domElem, card.offer.features, function () {
        removeExcessiveFeatures(cardElement, card.offer.features);
      });

      domElem = cardElement.querySelector('.popup__description');
      executeIfPropertyExist(domElem, card.offer.description, function () {
        domElem.textContent = card.offer.description;
      });

      domElem = cardElement.querySelector('.popup__photos');
      executeIfPropertyExist(domElem, card.offer.photos, function () {
        createCardPhotos(cardElement, card.offer.photos);
      });

      domElem = cardElement.querySelector('.popup__avatar');
      executeIfPropertyExist(domElem, card.author, function () {
        executeIfPropertyExist(domElem, card.author.avatar, function () {
          domElem.src = card.author.avatar;
        });
      });

      return cardElement;
    }
  };
})();
