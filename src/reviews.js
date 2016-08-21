'use strict';

window.CallBackRegistry = {};


window.reviews = (function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsTemplate = document.querySelector('#review-template');
  var cloneElem;

  if ('content' in reviewsTemplate) {
    cloneElem = reviewsTemplate.content.querySelector('.review');
  } else {
    cloneElem = reviewsTemplate.querySelector('.review');
  }

  var reviews = {
    load: function() {
      var apiURL = 'http://localhost:1506/api/reviews';
      reviewsFilter.classList.add('invisible');
      reviewsAdd(apiURL, reviewData);
    }
  };

  /**
   * JSONP запрос
   * @param {string} link адрес
   * @param {function} callback callback-функция
   */

  function reviewsAdd(link, callback) {
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

  function reviewData(data) {
    var reviewsList = document.querySelector('.reviews-list');
    var documentFragment = document.createDocumentFragment();

    data.forEach(function(element) {
      documentFragment.appendChild(getReview(element));
    });

    reviewsList.appendChild(documentFragment);

    reviewsFilter.classList.remove('invisible');
  }

  function getReview(data) {
    var elem = cloneElem.cloneNode(true);
    var desc = elem.querySelector('.review-text');
    var rate = elem.querySelector('.review-rating');
    var author = elem.querySelector('.review-author');

    var authorImage = new Image();
    var imageLoadTimeout;
    var IMAGE_LOAD_TIMEOUT = 10000;

    authorImage.src = data.author.picture;
    authorImage.onload = function(event) {
      clearTimeout(imageLoadTimeout);
      elem.style.authorImage = 'url(\'' + event.target.src + '\')';
      authorImage.width = '124px';
      authorImage.height = '124px';
    };

    authorImage.onerror = function() {
      elem.classList.add('review-load-failure');
    };

    imageLoadTimeout = setTimeout(function() {
      authorImage.src = '';
      elem.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    var rating = {
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five'
    };
    if (rating[data.rating]) {
      rate.classList.add('review-rating-' + rating[data.rating]);
    }
    desc.textContent = data.description;
    author.src = data.author.picture;

    return elem;
  }
  return reviews;
})();
