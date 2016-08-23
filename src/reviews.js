'use strict';

var reviewsLoad = require('./load');
var getReview = require('./review');

var reviewsFilter = document.querySelector('.reviews-filter');
function loadReviews() {
    var apiURL = 'http://localhost:1506/api/reviews';
    reviewsFilter.classList.add('invisible');
    load(apiURL, getReview);
}


function reviewData(data) {
  var reviewsList = document.querySelector('.reviews-list');

  data.forEach(function(element) {
    reviewsList.appendChild(getReview(element));
  });
  reviewsFilter.classList.remove('invisible');
  }

module.exports = reviewData;



