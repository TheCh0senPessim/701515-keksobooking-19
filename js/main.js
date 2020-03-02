'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mocks = [];
var mocksAmount = 8;
var avatarCount = 0;
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
    title: 'some title',
    address: '600, 350',
    price: getRandom(500, 5000)
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

// var exampleMock = {
//   offer: {
//     type: ['palace', 'flat', 'house', 'bungalo'],
//     rooms: [1, 2, 3, 4],
//     guests: [1, 2, 3, 4],
//     checkin: ['12:00', '13:00', '14:00'],
//     checkout: ['12:00', '13:00', '14:00'],
//     features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
//     description: 'some decription',
//     photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
//   }
// };

var createMocks = function () {
  var mocksArr = [];
  for (var i = 0; i <= mocksAmount - 1; i++) {
    var mock = getMock();
    mocksArr.push(mock);
  }
  return mocksArr;
};

mocks = createMocks();
// console.log(mocks);

var renderPin = function (mock) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + mock.location.x + 'px; top: ' + mock.location.y + 'px;';
  pinElement.querySelector('img').src = mock.author.avatar;
  pinElement.querySelector('img').alt = mock.offer.title;
  return pinElement;
};

var renderElements = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j <= mocks.length - 1; j++) {
    fragment.appendChild(renderPin(mocks[j]));
  }
  mapPins.appendChild(fragment);
};

renderElements();
