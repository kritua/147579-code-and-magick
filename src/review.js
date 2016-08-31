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
  this.IMAGE_LOAD_TIMEOUT = 10000;
  this.ACTIVE_ANSWER = 'review-quiz-answer-active';




};


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
  this.imageLoadTimeout = 0;
  this.authorImage = new Image(this.IMAGE_SIZE, this.IMAGE_SIZE);

  this.authorImage.onload = function() {
    clearTimeout(self.imageLoadTimeout);
    self.authorImage.classList.add('review-author');
    self.elem.replaceChild(self.authorImage, self.author);
  };

  this.authorImage.onerror = function() {
    self.elem.classList.add(this.LOAD_FAIL);
  };

  this.imageLoadTimeout = setTimeout(function() {
    self.authorImage.src = '';
    self.elem.classList.add(this.LOAD_FAIL);
  }, self.IMAGE_LOAD_TIMEOUT);

};

Review.prototype.usefulAnswer = function() {
  
};

module.exports = Review;
