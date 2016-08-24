'use strict';

var reviewsTemplate = document.querySelector('#review-template');


function getReview(data) {
  var imageLoadTimeout;
  var cloneElem;
  var IMAGE_SIZE = 124;
  var IMAGE_LOAD_TIMEOUT = 10000;

  if ('content' in reviewsTemplate) {
    cloneElem = reviewsTemplate.content.querySelector('.review');
  } else {
    cloneElem = reviewsTemplate.querySelector('.review');
  }

  var elem = cloneElem.cloneNode(true);
  var desc = elem.querySelector('.review-text');
  var rate = elem.querySelector('.review-rating');
  var author = elem.querySelector('.review-author');
  var authorImage = new Image(IMAGE_SIZE, IMAGE_SIZE);

  authorImage.onload = function() {
    clearTimeout(imageLoadTimeout);
    authorImage.classList.add('review-author');
    elem.replaceChild(authorImage, author);
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
  authorImage.src = data.author.picture;

  return elem;
}


module.exports = getReview;
