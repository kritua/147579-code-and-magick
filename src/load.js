'use strict';

window.CallBackRegistry = {};

/**
 * JSONP запрос
 * @param {string} link адрес
 * @param {function} callback callback-функция
 */

function reviewsLoad(link, callback) {
  var callbackVar = 'callback' + String(Math.random()).slice(-6);
  var script = document.createElement('script');

  link = link + '?callback=CallBackRegistry.' + callbackVar;
  window.CallBackRegistry[callbackVar] = function(data) {
    callback(data);
  };

  script.onload = script.onerror = function() {
    delete window.CallBackRegistry[callbackVar];
    document.body.removeChild(script);
  };

  script.src = link;
  document.body.appendChild(script);
}

module.exports = reviewsLoad;
