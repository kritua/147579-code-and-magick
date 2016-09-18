'use strict';

function throttle(func, timeout) {
  var funcCall = null;
  return function() {
    if (new Date() - funcCall > timeout) {
      func();
      funcCall = new Date();
    }
  };
}

module.exports = throttle;
