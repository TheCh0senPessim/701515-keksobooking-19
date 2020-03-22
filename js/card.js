'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var onCardEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeCard();
    }
  };
  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  window.card = {
    createCard: function (mock) {
      var cardElement = cardTemplate.cloneNode(true);
      var roomTypesRu = {
        flat: 'Квартира',
        house: 'Дом',
        bungalo: 'Бунгало',
        palace: 'Дворец',
      };
      var typeOfRoom = roomTypesRu[mock.offer.type];

      cardElement.querySelector('.popup__title').textContent = mock.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = mock.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = mock.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = typeOfRoom;
      cardElement.querySelector('.popup__text--capacity').textContent = mock.offer.rooms + ' комнаты для ' + mock.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mock.offer.checkin + ', выезд до ' + mock.offer.checkout;

      var cardFeatures = cardElement.querySelector('.popup__features');
      if (mock.offer.features.length === 0) {
        cardElement.removeChild(cardFeatures);
      } else {
        var cardFeature = cardFeatures.querySelector('.popup__feature');
        cardFeatures.innerHTML = '';
        for (var i = 0; i <= mock.offer.features.length - 1; i++) {
          var cardFeatureClone = cardFeature.cloneNode(true);
          cardFeatureClone.classList = 'popup__feature';
          cardFeatureClone.classList.add('popup__feature--' + mock.offer.features[i]);
          cardFeatures.appendChild(cardFeatureClone);
        }
      }

      cardElement.querySelector('.popup__description').textContent = mock.offer.description;
      var cardPhotos = cardElement.querySelector('.popup__photos');
      if (mock.offer.photos.length === 0) {
        cardElement.removeChild(cardPhotos);
      } else {
        var cardPhoto = cardPhotos.querySelector('img');
        cardPhotos.innerHTML = '';
        for (var j = 0; j <= mock.offer.photos.length - 1; j++) {
          var cardPhotoClone = cardPhoto.cloneNode(true);
          cardPhotoClone.src = mock.offer.photos[j];
          cardPhotos.appendChild(cardPhotoClone);
        }
      }
      cardElement.querySelector('.popup__avatar').src = mock.author.avatar;
      cardElement.querySelector('.popup__close').addEventListener('click', function () {
        closeCard();
      });
      document.addEventListener('keydown', onCardEscPress);

      return cardElement;
    },
    openCard: function (mock) {
      closeCard();
      map.insertBefore(window.card.createCard(mock), map.querySelector('.map__filters-container'));
    }
  };
})();
