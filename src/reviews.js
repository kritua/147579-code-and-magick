'use strict';

var getReview = require('./review');

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsList = document.querySelector('.reviews-list');


function reviewData(data) {
  reviewsFilter.classList.add('invisible');
  data.forEach(function(element) {
    reviewsList.appendChild(getReview(element));
  });
  reviewsFilter.classList.remove('invisible');
}

module.exports = reviewData;



