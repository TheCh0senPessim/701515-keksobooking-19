'use strict';
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;

var map = document.querySelector('.map');
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
  pinElement.addEventListener('click', function () {
    map.insertBefore(renderCard(mock), map.querySelector('.map__filters-container'));
  });
  pinElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      map.insertBefore(renderCard(mock), map.querySelector('.map__filters-container'));
    }
  });
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

  document.addEventListener('keydown', function (evt) {
    var card = document.querySelector('.map__card');
    if (evt.key === ESC_KEY && card) {
      closeCard();
    }
  });
  cardElement.querySelector('.popup__close').addEventListener('click', function () {
    closeCard();
  });

  return cardElement;
};

var closeCard = function () {
  var card = document.querySelector('.map__card');
  if (card) {
    card.remove();
  }
};

var renderElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <= mocks.length - 1; i++) {
    fragment.appendChild(renderPin(mocks[i]));
  }
  mapPins.appendChild(fragment);
};

// var renderCards = function () {
//   var fragmentCard = document.createDocumentFragment();
//   for (var i = 0; i <= mocks.length - 1; i++) {
//     fragmentCard.appendChild(renderCard(mocks[i]));
//   }
//   map.insertBefore(fragmentCard, map.querySelector('.map__filters-container'));
// };

// Пробую описать изменение одной функцией:
var changeAvailability = function (elements, isEnable) {
  for (var i = 0; i <= elements.length - 1; i++) {
    elements[i].disabled = isEnable;
  }
};

var adForm = document.querySelector('.ad-form');
var formControls = adForm.children;

var mapFilters = document.querySelector('.map__filters');
var mapFiltersControls = mapFilters.children;

changeAvailability(formControls, true);
changeAvailability(mapFiltersControls, true);

var mainPin = document.querySelector('.map__pin--main');
var adressInput = adForm.querySelector('#address');

var getMainPinPosition = function () {
  var mainX = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2;
  var mainY = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT;
  adressInput.value = mainX + ', ' + mainY;
};

var getMainPinStartPosition = function () {
  var mainXStart = Math.round(parseInt(mainPin.style.left, 10) + 32.5);
  var mainYStart = Math.round(parseInt(mainPin.style.top, 10) + 32.5);
  adressInput.value = mainXStart + ', ' + mainYStart;
};

getMainPinStartPosition();

var onMainPinClick = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  changeAvailability(formControls, false);
  changeAvailability(mapFiltersControls, false);
  renderElements();
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    onMainPinClick();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getMainPinPosition();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    onMainPinClick();
    getMainPinPosition();
  }
});

// Валидация вместимости:
var rooms = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

var roomsAmount = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

var validateCapacity = function () {
  var validCapacityOptions = roomsAmount[rooms.value];
  var capacityOptions = capacity.querySelectorAll('option');
  capacityOptions.forEach(function (currentOption) {
    currentOption.selected = false;
    currentOption.disabled = true;
    var index = validCapacityOptions.indexOf(currentOption.value);
    if (index >= 0) {
      currentOption.disabled = false;
      if (index === 0) {
        currentOption.selected = true;
      }
    }
  });
};

validateCapacity();

rooms.addEventListener('change', function () {
  validateCapacity();
});
