'use strict';

var reviewsTemplate = document.querySelector('#review-template');
var cloneElem;

if ('content' in reviewsTemplate) {
  cloneElem = reviewsTemplate.content.querySelector('.review');
} else {
  cloneElem = reviewsTemplate.querySelector('.review');
}

var Review = function(data) {
  this.data = data;

  this.IMAGE_SIZE = '124px';
  this.LOAD_FAIL = 'review-load-failure';
  this.ACTIVE_ANSWER = 'review-quiz-answer-active';

  
  this.getElement();
  this.desc.textContent = this.data.description;
  this.rating(this.data.rating);
  this.addImage();

};

Review.prototype.IMAGE_SIZE = '124px';

Review.prototype.getElement = function() {
  this.elem = cloneElem.cloneNode(true);
  this.desc = this.elem.querySelector('.review-text');
  this.rate = this.elem.querySelector('.review-rating');
  this.author = this.elem.querySelector('.review-author');

  this.answerNo = this.elem.querySelector('.review-quiz-answer-no');
  this.answerYes = this.elem.querySelector('.review-quiz-answer-yes');
};


Review.prototype.rating = function() {
  var rating = {
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five'
  };
  if (rating[this.data.rating]) {
    this.rate.classList.add('review-rating-' + rating[this.data.rating]);
  }
};

Review.prototype.addImage = function() {
  var self = this;
  function loadImage(imageURL, callback) {
    var authorImage = new Image();
    var imageLoadTimeout = null;
    var IMAGE_LOAD_TIMEOUT = 10000;

    authorImage.onload = function () {
      clearTimeout(imageLoadTimeout);
      callback(true);
    };

    authorImage.onerror = function () {
      clearTimeout(imageLoadTimeout);
      callback(false);
    };

    authorImage.src = imageURL;

    imageLoadTimeout = setTimeout(function () {
      clearTimeout(imageLoadTimeout);
      callback(false);
    }, IMAGE_LOAD_TIMEOUT);
  }

  function isLoaded(loaded) {
    if (loaded) {
      this.author.src = self.data.author.picture;
      this.author.width = this.author.height = this.IMAGE_SIZE;
    } else {
      this.author.src = '';
      this.author.classList.add(this.LOAD_FAIL);
    }
  }
  loadImage(this.data.author.picture, isLoaded.bind(this));
};

/* Review.prototype.usefulAnswer = function() {
  
}; */

module.exports = Review;
