'use strict';

window.CallBackRegistry = {};

/**
 * JSONP запрос
 * @param {string} link адрес
 * @param {function} callback callback-функция
 */

function reviewsAdd(link, callback) {
  var callbackVar = 'callback' + String(Math.random()).slice(-6);
  var script = document.createElement('script');

  link += link + 'callback=reviews.' + callbackVar;
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

window.reviews = null;

function reviewData(data) {
  window.reviews = data;
}

reviewsAdd('http://localhost:1506/api/reviews', reviewData);
