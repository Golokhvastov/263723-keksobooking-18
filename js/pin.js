'use strict';
(function () {
  window.pin = {
    create: function (template, pin) {
      var pinElement = template.content.cloneNode(true);

      var locX = pin.location.x - (window.Constant.PIN_WIDTH / 2);
      var locY = pin.location.y - window.Constant.PIN_HEIGHT;
      pinElement.querySelector('.map__pin').style = 'left: ' + locX + 'px; top: ' + locY + 'px;';

      var pinImg = pinElement.querySelector('.map__pin img');
      if (pin.author !== undefined) {
        if (pin.author.avatar !== undefined) {
          pinImg.src = pin.author.avatar;
        }
      }
      pinImg.alt = pin.offer.title;

      return pinElement;
    }
  };
})();
