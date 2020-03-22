'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var formControls = adForm.children;
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersControls = mapFilters.children;
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var selectOfRoom = adForm.querySelector('#type');
  var priceOfRoom = adForm.querySelector('#price');
  var roomsAmount = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var checkInsAndOuts = {
    '12:00': ['12:00'],
    '13:00': ['13:00'],
    '14:00': ['14:00']
  };
  var minPriceOfRoom = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var changeAvailability = function (elements, isEnable) {
    for (var i = 0; i <= elements.length - 1; i++) {
      elements[i].disabled = isEnable;
    }
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

  var validateСhekIn = function () {
    var validCheckInTime = checkInsAndOuts[timeIn.value];
    var validCheckOutTime = timeOut.querySelectorAll('option');
    validCheckOutTime.forEach(function (currentTime) {
      currentTime.disabled = true;
      currentTime.selected = false;
      var index = validCheckInTime.indexOf(currentTime.value);
      if (index >= 0) {
        currentTime.disabled = false;
        if (index === 0) {
          currentTime.selected = true;
        }
      }
    });
  };

  changeAvailability(formControls, true);
  changeAvailability(mapFiltersControls, true);
  validateCapacity();
  validateСhekIn();

  rooms.addEventListener('change', function () {
    validateCapacity();
  });
  timeIn.addEventListener('change', function () {
    validateСhekIn();
  });
  selectOfRoom.addEventListener('change', function () {
    priceOfRoom.placeholder = minPriceOfRoom[selectOfRoom.value];
    priceOfRoom.min = minPriceOfRoom[selectOfRoom.value];
  });

  window.form = {
    adForm: adForm,
    formControls: formControls,
    mapFiltersControls: mapFiltersControls,
    changeAvailability: changeAvailability,
  };
})();
