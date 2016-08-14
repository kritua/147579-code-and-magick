'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();

/* Refactoring */

var form = document.forms[1];
var name = form.elements['review-name'];
var text = form.elements['review-text'];

name.required = true;


function submitButtonManipulation(a, b, c) {
  var button = form.elements[c];
  button.disabled = true;
  a.oninput = function() {
    if (b.value !== '') {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  };
}


function reviewLabelHide1(a, b, c, d) {
  var elemOne = document.querySelector(c);
  var elemTwo = document.querySelector(d);
  if (a.value !== '') {
    elemOne.style.visibility = 'hidden';
  } else {
    elemOne.style.visibility = 'visible';
  }
  if (a.value !== '' && b.value !== '') {
    elemTwo.style.visibility = 'hidden';
  } else {
    elemTwo.style.visibility = 'visible';
  }
}

function starsRatingCheck(a) {
  var stars = document.querySelectorAll(a);
  for (var i = 0; i < stars.length; i++) {
    (function(y) {
      stars[y].onclick = function() {
        if (stars[y].previousSibling.value < 3) {
          text.required = true;
        } else {
          text.required = false;
        }
      };
    })(i);
  }
}

starsRatingCheck('.review-mark-label');

name.oninput = function() {
  reviewLabelHide1(name, text, '.review-fields-name', '.review-fields');
};

text.oninput = function() {
  reviewLabelHide1(text, name, '.review-fields-text', '.review-fields');
};

submitButtonManipulation(form, name, 10);


var browserCookies = require('browser-cookies');
var totalDays = '';
var totalStars = document.getElementById('#review-mark-3').value;
var starsCheck = document.querySelectorAll('.review-mark-label');

console.log(totalStars);

function starsCookie() {
  for (var i = 0; i < starsCheck.length; i++) {
    (function (y) {
          starsCheck[y].onclick = function () {
              totalStars = starsCheck[y].previousSibling.value;
          }
        })(i);
  }
}

/*
 for (var i = 0; i < starsCheck.length; i++) {
 (function(y) {
 starsCheck[y].onclick = function() {
 form.onsubmit = function() {
 browserCookies.set('review-mark', starsCheck[y].previousSibling.value);
 }
 }
 }
 )(i);
 }
*/

function cookieValueGrace(a) {
  var msecondsPerDay = 24 * 60 * 60 * 1000;
  var currentDate = new Date();
  var yearOfCount = '';
  var lastBirthDayDate = new Date(currentDate.getFullYear() - 1, 11, 9);
  a = Math.round((currentDate - lastBirthDayDate) / msecondsPerDay);
  if (a <= 365) {
    yearOfCount = currentDate.getFullYear() - 1;
  } else {
    yearOfCount = currentDate.getFullYear();
  }
  var lastBirthDay = new Date(yearOfCount, 11, 9);
  return a;
}
cookieValueGrace(totalDays);
starsCookie();

form.onsubmit = function () {
  browserCookies.set('review-name', name.value, {expires: (cookieValueGrace(totalDays))});
  browserCookies.set('review-mark', totalStars);
  alert(document.cookie);
};





