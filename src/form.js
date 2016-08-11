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
var value = document.getElementsByName('review-mark').value;
var submitButton = document.querySelector('.review-submit');


name.required = true;

if (name.length < 0 || text.value == '') {
  submitButton.disabled = true;
}

name.onchange = function() {
  submitButton.disabled = false;
};


  if (value < 3) {
    text.required = true;
  }


