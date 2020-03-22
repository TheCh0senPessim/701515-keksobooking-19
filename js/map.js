'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var adressInput = document.querySelector('#address');

  var renderElements = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i <= window.data.mocks.length - 1; i++) {
      fragment.appendChild(window.pin.renderNewElement(window.data.mocks[i]));
    }
    mapPins.appendChild(fragment);
  };

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

  var onMainPinClick = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.changeAvailability(window.form.formControls, false);
    window.form.changeAvailability(window.form.mapFiltersControls, false);
    if (mapPins.childElementCount <= 2) {
      renderElements();
    }
  };

  getMainPinStartPosition();

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

        var MAX_TOP = 130;
        var MAX_BOTTOM = 620;
        var MAX_RIGHT = 1160;
        var MAX_LEFT = -30;
        var GAP_FROM_MAX = 10;

        if (mainPin.offsetTop <= MAX_TOP) {
          mainPin.style.top = MAX_TOP + GAP_FROM_MAX + 'px';
        } else if (mainPin.offsetTop >= MAX_BOTTOM) {
          mainPin.style.top = MAX_BOTTOM - GAP_FROM_MAX + 'px';
        }
        if (mainPin.offsetLeft >= MAX_RIGHT) {
          mainPin.style.left = MAX_RIGHT - GAP_FROM_MAX + 'px';
        } else if (mainPin.offsetLeft <= MAX_LEFT) {
          mainPin.style.left = MAX_LEFT + GAP_FROM_MAX + 'px';
        }
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
})();
