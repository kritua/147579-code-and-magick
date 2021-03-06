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

  this.elem = cloneElem.cloneNode(true);
  this.desc = this.elem.querySelector('.review-text');
  this.rate = this.elem.querySelector('.review-rating');
  this.author = this.elem.querySelector('.review-author');

  this.answerNo = this.elem.querySelector('.review-quiz-answer-no');
  this.answerYes = this.elem.querySelector('.review-quiz-answer-yes');

  this.isAnswerYes = this.usefulAnswer.bind(this, true);
  this.isAnswerNo = this.usefulAnswer.bind(this, false);

  this.init();
};


Review.prototype.init = function() {
  this.rating(this.data.rating);
  this.addImage();

  this.desc.textContent = this.data.description;

  this.answerYes.addEventListener('click', this.isAnswerYes);
  this.answerNo.addEventListener('click', this.isAnswerNo);
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
    var IMAGE_SIZE = '124px';
    var IMAGE_LOAD_TIMEOUT = 10000;
    var authorImage = new Image(IMAGE_SIZE, IMAGE_SIZE);
    var imageLoadTimeout = null;

    authorImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      callback(true);
    };

    authorImage.onerror = function() {
      clearTimeout(imageLoadTimeout);
      callback(false);
    };

    authorImage.src = imageURL;

    imageLoadTimeout = setTimeout(function() {
      clearTimeout(imageLoadTimeout);
      callback(false);
    }, IMAGE_LOAD_TIMEOUT);
  }

  function isLoaded(loaded) {
    if (loaded) {
      this.author.src = self.data.author.picture;
    } else {
      this.author.src = '';
      this.elem.classList.add('review-load-failure');
    }
  }
  loadImage(this.data.author.picture, isLoaded.bind(this));
};

Review.prototype.remove = function() {
  this.answerYes.removeEventListener('click', this.isAnswerYes);
  this.answerNo.removeEventListener('click', this.isAnswerNo);
};

Review.prototype.usefulAnswer = function(useful) {
  this.answerYes.classList.toggle('review-quiz-answer-active', useful);
  this.answerNo.classList.toggle('review-quiz-answer-active', !useful);
};

module.exports = Review;
