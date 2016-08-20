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

window.reviews = [];

function reviewData(data) {
  window.reviews = data;
}

reviewsAdd('http://localhost:1506/api/reviews', reviewData);


var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsList = document.querySelector('.reviews-list');
var reviewsTemplate = document.querySelector('#review-template');
var cloneElem;

if ('content' in reviewsTemplate) {
  cloneElem = reviewsTemplate.content.querySelector('.review');
} else {
  cloneElem = reviewsTemplate.querySelector('.review');
}

function getReview(data, container) {
  var elem = cloneElem.cloneNode(true);
  var desc = elem.querySelector('.review-text');
  var rate = elem.querySelector('.review-rating');
  var useful = elem.querySelector('.review-quiz');
  var authorImage = new Image();
  var imageLoadTimeout;
  var IMAGE_LOAD_TIMEOUT = 10000;

  var author = {
    name: elem.querySelector('.review-author'),
    picture: authorImage
  };

  authorImage.onload = function(event) {
    elem.author.picture = 'url(\'' + event.target.src + '\')';
    elem.author.picture.width = '124px';
    elem.author.picture.height = '124px';
  };

  authorImage.onerror = function() {
    clearTimeout(imageLoadTimeout);
    elem.classList.add('.review-load-failure');
  };

  authorImage.src = data.author.picture;

  imageLoadTimeout = setTimeout(function() {
    authorImage.src = '';
    elem.classList.add('.review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  var rating = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five'
  };
  if (rating[data.rating]) {
    rate.classList.add = ('review-rating-' + rating[data.rating]);
  }
  desc.textContent = data.description;
  author.name.textContent = data.author.name;
  author.picture.src = data.author.picture;
  useful.textContent = data.review_usefulness;
  
  container.appendChild(elem);
  
  return elem;
}

reviews.forEach(function(review) {
  getReview(review, reviewsList);
});

reviewsFilter.style.visibility = 'hidden';

