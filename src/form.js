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
    if (b.value != '') {
      button.disabled = false;
    }
    else {
      button.disabled = true;
    }
  }
}


function reviewLabelHide1(a, b, c, d) {
  var elemOne = document.querySelector(c);
  var elemTwo = document.querySelector(d);
    if (a.value != '') {
      elemOne.style.visibility = 'hidden';
    }
    else {
      elemOne.style.visibility = 'visible';
    }
    if (a.value != '' && b.value != '') {
      elemTwo.style.visibility = 'hidden';
    }
    else {
      elemTwo.style.visibility = 'visible';
    }
}

function starsRatingCheck(a) {
  var stars = document.querySelectorAll(a);
  for (var i = 0; i < stars.length; i++) (function(i) {
    stars[i].onclick = function() {
      if (stars[i].previousSibling.value < 3) {
        text.required = true;
      }
      else {
        text.required = false;
      }
    };
  })(i);
}

starsRatingCheck('.review-mark-label');

name.oninput = function() {
  reviewLabelHide1(name, text, '.review-fields-name', '.review-fields');
};

text.oninput = function() {
  reviewLabelHide1(text, name, '.review-fields-text', '.review-fields');
};

submitButtonManipulation(form, name, 10);



//Old code

/* var name = document.querySelector('#review-name');
 var text = document.querySelector('#review-text');
 var stars = document.querySelectorAll('.review-mark-label');
 var nameLabel = document.querySelector('.review-fields-label');
 var textLabel = document.querySelector('.review-fields-text');
 var submitButton = document.querySelector('.review-submit');
 var reviewField = document.querySelector('.review-fields');
 var reviewForm = document.querySelector('.review-form');


 for (var i = 0; i < stars.length; i++) (function(i) {
 stars[i].onclick = function() {
 if (stars[i].previousSibling.value <= 2) {
 text.required = true;
 }
 else {
 text.required = false;
 }
 };
 })(i);

 name.required = 'true';

 if (name.value <= 0 || text.value == '') {
 submitButton.disabled = true;
 }

 reviewForm.oninput = function() {
 if (name.value != 0) {
 nameLabel.style.visibility = 'hidden';
 submitButton.disabled = false;
 }
 else {
 nameLabel.style.visibility = 'visible';
 submitButton.disabled = true;
 }

 if (text.value != '') {
 textLabel.style.visibility = 'hidden';
 }
 else {
 textLabel.style.visibility = 'visible';
 }
 if (text.value != '' && name.value != 0) {
 reviewField.style.visibility = 'hidden';
 }
 else {
 reviewField.style.visibility = 'visible';
 }
 }; */




//first try of this stupid function 
/*
 function reviewLabelHide(a, b, c) {
 var nameLabel = document.querySelector('.review-fields-name');
 var textLabel = document.querySelector('.review-fields-text');
 var reviewField = document.querySelector('.review-fields');
 a.oninput = function() {
 if (b.value != '') {
 nameLabel.style.visibility = 'hidden';
 }
 else {
 nameLabel.style.visibility = 'visible';
 }
 if (c.value != '') {
 nameLabel.style.visibility = 'hidden';
 }
 else {
 nameLabel.style.visibility = 'visible';
 }
 if (b.value != '' && c.value != '') {
 reviewField.style.visibility = 'hidden';
 }
 else {
 reviewField.style.visibility = 'visible';
 }
 }
 } */



/* for (var i = 0; i < form.length; i++) {
  console.log(i, form.elements[i]);
} */



