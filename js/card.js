'use strict';
(function () {
  // Убрать фичи
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var removeExcessiveFeatures = function (cardElement, features) {
    for (var i = 0; i < FEATURES.length; i++) {
      if (!features.includes(FEATURES[i])) {
        cardElement.querySelector('.popup__feature--' + FEATURES[i]).remove();
      }
    }
  };

  var createCardPhotos = function (cardElement, photos) {
    if (photos.length === 0) {
      cardElement.querySelector('.popup__photo').remove();
    } else {
      cardElement.querySelector('.popup__photo').src = photos[0];
      if (photos.length > 1) {
        for (var i = 1; i < photos.length; i++) {
          var popupPhoto = cardElement.querySelector('.popup__photo').cloneNode(true);
          popupPhoto.src = photos[i];
          cardElement.querySelector('.popup__photos').appendChild(popupPhoto);
        }
      }
    }
  };

  window.card = {
    createCardElement: function (template, card) {
      var cardElement = template.content.cloneNode(true);
      cardElement.querySelector('.popup__title').textContent = card.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = window.data.getTypeRus(card.offer.type);
      cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
      removeExcessiveFeatures(cardElement, card.offer.features);
      cardElement.querySelector('.popup__description').textContent = card.offer.description;
      createCardPhotos(cardElement, card.offer.photos);
      cardElement.querySelector('.popup__avatar').src = card.author.avatar;

      return cardElement;
    }
  };
})();
