'use strict';

var Review = require('./review');

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsList = document.querySelector('.reviews-list');


function reviewData(data) {
  reviewsFilter.classList.add('invisible');
  data.forEach(function(element) {
    var review = new Review(element);
    reviewsList.appendChild(review.elem);
  });
  reviewsFilter.classList.remove('invisible');
}

module.exports = reviewData;



