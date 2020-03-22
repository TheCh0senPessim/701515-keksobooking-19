'use strict';

(function () {
  var mocksAmount = 8;
  var avatarCount = 0;

  var getMockAvatar = function () {
    return {
      avatar: 'img/avatars/user0' + ++avatarCount + '.png'
    };
  };
  var getMockOffer = function () {
    return {
      title: 'catchy title',
      address: '600, 350',
      price: window.util.getRandom(500, 60000),
      type: ['palace', 'flat', 'house', 'bungalo'][window.util.getRandom(0, 3)],
      rooms: window.util.getRandom(1, 3),
      guests: window.util.getRandom(1, 4),
      checkin: window.util.getRandom(12, 14) + ':00',
      checkout: window.util.getRandom(12, 14) + ':00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'].slice(0, window.util.getRandom(1, 5)),
      description: 'awesome decription about this advert',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'].slice(0, window.util.getRandom(1, 2))
    };
  };
  var getMockLocation = function () {
    return {
      x: window.util.getRandom(0, 1150),
      y: window.util.getRandom(130, 630)
    };
  };
  var getMock = function () {
    return {
      author: getMockAvatar(),
      offer: getMockOffer(),
      location: getMockLocation()
    };
  };
  var generateMocks = function () {
    var mocksArr = [];
    for (var i = 0; i <= mocksAmount - 1; i++) {
      var mock = getMock();
      mocksArr.push(mock);
    }
    return mocksArr;
  };

  window.data = {
    mocks: generateMocks()
  };
})();
