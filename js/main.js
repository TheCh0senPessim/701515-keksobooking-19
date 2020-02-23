'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mocks = [];
var mocksAmount = 8;

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * (arr.length - 1 + 1));
};

var exampleMock = {
  avatarCount: 0,
  offer: {
    title: 'some title',
    address: '600, 350',
    price: 500,
    type: ['palace', 'flat', 'house', 'bungalo'],
    rooms: [1, 2, 3, 4],
    guests: [1, 2, 3, 4],
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: 'some decription',
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  },
  location: {
    x: getRandom(0, 1150),
    y: getRandom(130, 630)
  },

  getMockAvatar: function () {
    return {
      avatar: 'img/avatars/user0' + ++this.avatarCount + '.png'
    };
  },

  getMockOffer: function () {
    return {
      title: this.title,
      address: this.address,
      price: this.price
      // photos: this.photos.getRandom(0, 2)
    };
  },

  getMockLocation: function () {
    return {
      x: getRandom(0, 1150),
      y: getRandom(130, 630)
    };
  },

  getMock: function () {
    return {
      author: this.getMockAvatar(),
      offer: this.getMockOffer(),
      location: this.getMockLocation()
    };
  }
};

var createMocks = function (arr) {
  for (var i = 0; i <= mocksAmount - 1; i++) {
    var mock = exampleMock.getMock();
    arr.push(mock);
  }
  return arr;
};

mocks = createMocks(mocks);

var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (mock) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + mock.location.x + 'px; top: ' + mock.location.y + 'px;';
  pinElement.querySelector('img').src = mock.author.avatar;
  pinElement.querySelector('img').alt = mock.offer.title;
  return pinElement;
};

var renderElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <= mocks.length - 1; i++) {
    fragment.appendChild(renderPin(mocks[i]));
  }
  mapPins.appendChild(fragment);
};

renderElements();
