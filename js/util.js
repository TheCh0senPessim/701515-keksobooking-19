'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Escape';

  window.util = {
    isEscEvent: function (evt, action) {
      var card = document.querySelector('.map__card');
      if (evt.key === ESC_KEY && card) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();
