'use strict';
(function () {
  window.util = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getArrayUniqueNumbers: function (min, max, length) {
      var result = [];
      var usedNumbers = [];
      if (length - 1 <= max - min) { // Иначе будет бесконечный цикл
        for (var i = 0; i < length; i++) {
          var uniqueNumber = window.util.getRandomInt(min, max);
          var isNumberUsed = true;
          while (isNumberUsed) {
            if (usedNumbers.includes(uniqueNumber)) {
              uniqueNumber = window.util.getRandomInt(min, max);
            } else {
              usedNumbers.push(uniqueNumber);
              isNumberUsed = false;
            }
          }
          result.push(uniqueNumber);
        }
      }
      return result;
    },
    getRandomArrayPart: function (array) {
      var result = [];
      var randomLenght = window.util.getRandomInt(1, array.length);
      var randomNumbers = window.util.getArrayUniqueNumbers(0, array.length - 1, randomLenght);
      for (var i = 0; i < randomLenght; i++) {
        result.push(array[randomNumbers[i]]);
      }
      return result;
    }
  };
})();
