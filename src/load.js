'use strict';

function reviewsLoad(url, object, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(event) {
    try {
      var loadData = JSON.parse(event.target.response);
      callback(loadData);
    } catch(err) {
      console.log(err.message);
    }
  };

  xhr.open('GET', url + '?from=' + object.from + '&to=' + object.to + '&filter=' + object.filter);
  xhr.send();
}

module.exports = reviewsLoad;
