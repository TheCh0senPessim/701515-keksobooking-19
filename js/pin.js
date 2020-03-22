'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    renderNewElement: function (mock) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style = 'left: ' + mock.location.x + 'px; top: ' + mock.location.y + 'px;';
      pinElement.querySelector('img').src = mock.author.avatar;
      pinElement.querySelector('img').alt = mock.offer.title;
      pinElement.addEventListener('click', function () {
        window.card.openCard(mock);
      });
      return pinElement;
    }
  };
})();
