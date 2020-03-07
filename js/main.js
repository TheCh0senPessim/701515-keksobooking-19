'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mocks = [];
var mocksAmount = 8;
var avatarCount = 0;
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getMockAvatar = function () {
  return {
    avatar: 'img/avatars/user0' + ++avatarCount + '.png'
  };
};

var getMockOffer = function () {
  return {
    title: 'catchy title',
    address: '600, 350',
    price: getRandom(500, 60000),
    type: ['palace', 'flat', 'house', 'bungalo'][getRandom(0, 3)],
    rooms: getRandom(1, 3),
    guests: getRandom(1, 4),
    checkin: getRandom(12, 14) + ':00',
    checkout: getRandom(12, 14) + ':00',
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'].slice(0, getRandom(1, 5)),
    description: 'awesome decription about this advert',
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'].slice(0, getRandom(1, 2))
  };
};

var getMockLocation = function () {
  return {
    x: getRandom(0, 1150),
    y: getRandom(130, 630)
  };
};

var getMock = function () {
  return {
    author: getMockAvatar(),
    offer: getMockOffer(),
    location: getMockLocation()
  };
};

var createMocks = function () {
  var mocksArr = [];
  for (var i = 0; i <= mocksAmount - 1; i++) {
    var mock = getMock();
    mocksArr.push(mock);
  }
  return mocksArr;
};

mocks = createMocks();

var renderPin = function (mock) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + mock.location.x + 'px; top: ' + mock.location.y + 'px;';
  pinElement.querySelector('img').src = mock.author.avatar;
  pinElement.querySelector('img').alt = mock.offer.title;
  return pinElement;
};

var renderCard = function (mock) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = mock.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = mock.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = mock.offer.price + '₽/ночь';

  var roomTypesRu = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец',
  };
  var typeOfRoom = roomTypesRu[mock.offer.type];
  cardElement.querySelector('.popup__type').textContent = typeOfRoom;

  cardElement.querySelector('.popup__text--capacity').textContent = mock.offer.rooms + ' комнаты для ' + mock.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mock.offer.checkin + ', выезд до ' + mock.offer.checkout;

  var featuresContainer = cardElement.querySelector('.popup__features');
  var features = [].slice.call(featuresContainer.querySelectorAll('.popup__feature'));

  features.forEach(function (elem) {
    var feature = elem.classList[1].split('--')[1];

    var isPresent = mock.offer.features.indexOf(feature) !== -1;

    if (!isPresent) {
      featuresContainer.removeChild(elem);
    }
  });

  // var cardFeatures = cardElement.querySelector('.popup__features');
  // var cardFeaturesColletction = cardElement.querySelectorAll('.popup__feature');
  // console.log(cardFeaturesColletction)
  // var feature = '';
  // for (var m = 0; m <= mock.offer.features.length - 1; m++) {
  //   feature = mock.offer.features[m];
  // for (var n = 0; n <= cardFeaturesColletction.length - 1; n++) {
  //   if (cardFeaturesColletction[n].indexOf(feature) > 0) {
  //     console.log(cardFeaturesColletction[n]);
  //   }
  // }
  // if () {}
  // console.log(feature);
  // }
  // cardElement.querySelector('.popup__features'). = mock.offer.features;

  cardElement.querySelector('.popup__description').textContent = mock.offer.description;

  var cardPhotos = cardElement.querySelector('.popup__photos');
  for (var l = 0; l <= mock.offer.photos.length - 1; l++) {
    var cardPhoto = cardPhotos.children[0].cloneNode(true);
    cardPhoto.src = mock.offer.photos[l];
    cardPhotos.appendChild(cardPhoto);
  }
  cardPhotos.removeChild(cardPhotos.children[0]);

  cardElement.querySelector('.popup__avatar').src = mock.author.avatar;
  return cardElement;
};

var renderElements = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j <= mocks.length - 1; j++) {
    fragment.appendChild(renderPin(mocks[j]));
  }
  mapPins.appendChild(fragment);
};

var renderCards = function () {
  var fragmentCard = document.createDocumentFragment();
  for (var k = 0; k <= mocks.length - 1; k++) {
    fragmentCard.appendChild(renderCard(mocks[k]));
  }
  map.insertBefore(fragmentCard, map.querySelector('.map__filters-container'));
};

renderElements();
renderCards();
