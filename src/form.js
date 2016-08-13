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

var name = document.querySelector('#review-name');
var text = document.querySelector('#review-text');
var stars = document.getElementsByName('review-mark');
var submitButton = document.querySelector('.review-submit');
var nameLabel = document.querySelector('.review-fields-label');
var textLabel = document.querySelector('.review-fields-text');
var reviewField = document.querySelector('.review-fields');
var reviewForm = document.querySelector('.review-form');

stars[2].defaultChecked = false;



for (var i = 0; i < stars.length; i++) {
  if (stars.checked === true && stars[i].value <= 2) {
    text.required = true;
  }
}

name.required = 'true';
name.min = 3;

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
};



