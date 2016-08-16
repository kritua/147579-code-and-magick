'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formOverlay = document.querySelector('.review-form');
  var name = formOverlay.elements['review-name'];
  var text = formOverlay.elements['review-text'];
  var stars = formOverlay.elements['review-mark'];
  var submitButton = document.querySelector('.review-submit');

  name.required = true;
  submitButton.disabled = true;
  //text.required = (stars.value < 3);

  formOverlay.onchange = formValidation;

  function formValidation() {
    submitButton.disabled = !validation();
  }

  function validation() {
    text.required = (stars.value < 3);
    var nameValidation = (name.value !== '');
    var textValidation = (text.value !== '');
    
    
    return nameValidation && textValidation;
  }
  console.log(formValidation());
  console.log(validation());
  console.log(stars.value);
  

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
/*
var form = document.forms[1];
var name = form.elements['review-name'];
var text = form.elements['review-text'];

name.required = true;


function submitButtonManipulation(a, b, c) {
  var button = form.elements[c];
  button.disabled = true;
  a.oninput = function() {
    button.disabled = (b.value === '');
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
        text.required = (stars[y].previousSibling.value < 3);
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



console.log(starsCheck[3].previousSibling.value);
console.log(totalStars);

function starsCookie() {
  for (var i = 0; i < starsCheck.length; i++) {
    (function(y) {
      starsCheck[y].onclick = function() {
        if (starsCheck[y].onclick === null) {
          totalStars = 3;
        } else {
          totalStars = starsCheck[y].previousSibling.value;
        }
      };
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
/* var browserCookies = require('browser-cookies');
var totalDays = '';
var starsCheck = document.querySelectorAll('.review-mark-label');
var totalStars = starsCheck[3].previousSibling.value;

function cookieValueGrace(a) {
  var msecondsPerDay = 24 * 60 * 60 * 1000;
  var currentDate = new Date();
  var yearOfCount = '';
  var lastBirthDayDate = new Date(currentDate.getFullYear() - 1, 11, 9);
  if (a <= 365) {
    yearOfCount = currentDate.getFullYear() - 1;
  } else {
    yearOfCount = currentDate.getFullYear();
  }
  var lastBirthDay = new Date(yearOfCount, 11, 9);
  a = Math.round((currentDate - lastBirthDay) / msecondsPerDay);
  return a;
}
cookieValueGrace(totalDays);
console.log(totalStars);
console.log(cookieValueGrace(totalDays));

console.log(totalDays);
form.onsubmit = function() {
  browserCookies.set('review-name', name.value, {expires: cookieValueGrace(totalDays)});
  browserCookies.set('review-mark', totalStars);
  alert(document.cookie);
}; */





