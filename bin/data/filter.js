'use strict';

module.exports = function(list, filterID) {
  switch(filterID) {
    case 'reviews-all':
      return list;
      break;

    case 'reviews-recent':
      var THREE_DAYS = 1000 * 60 * 60 * 24 * 3;
      var threeDaysPast = Date.now() - THREE_DAYS;
      return list.filter(function(item) {
        return item.created >= threeDaysPast;
      }).sort(function(a, b) {
        return b.created - a.created;
      });
      break;

    case 'reviews-good':
      return list.filter(function(item) {
        return item.rating >= 3;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case 'reviews-bad':
      return list.filter(function(item) {
        return item.rating < 3;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case 'reviews-popular':
      return list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }
};
