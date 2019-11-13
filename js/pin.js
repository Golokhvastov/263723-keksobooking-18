'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  window.pin = {
    createPinElement: function (template, pin) {
      var pinElement = template.content.cloneNode(true);
      var locX = pin.location.x - (PIN_WIDTH / 2);
      var locY = pin.location.y - PIN_HEIGHT;
      pinElement.querySelector('.map__pin').style = 'left: ' + locX + 'px; top: ' + locY + 'px;';
      pinElement.querySelector('.map__pin img').src = pin.author.avatar;
      pinElement.querySelector('.map__pin img').alt = pin.offer.title;
      return pinElement;
    }
  };
})();
