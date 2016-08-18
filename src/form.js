'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  /* Form Validation Variables */
  var formOverlay = document.querySelector('.review-form');
  var name = formOverlay.elements['review-name'];
  var text = formOverlay.elements['review-text'];
  var stars = formOverlay.elements['review-mark'];
  var submitButton = document.querySelector('.review-submit');
  var textReviewField = document.querySelector('.review-fields-text');
  var nameReviewField = document.querySelector('.review-fields-name');
  var bothLabelFields = document.querySelector('.review-fields');
  /* Cookies variables */
  var cookies = require('browser-cookies');


  name.required = true;
  submitButton.disabled = true;

  formOverlay.onchange = formValidation;

  function formValidation() {
    submitButton.disabled = !validation();
    SaveCookies();
  }

  function validation() {
    text.required = (stars.value < 3);
    var nameValidation = (name.value !== '');
    var textValidation = (text.value !== '') || (stars.value >= 3);

    hideLabels(nameReviewField, !nameValidation);
    hideLabels(textReviewField, !textValidation);
    hideLabels(bothLabelFields, !nameValidation, !textValidation);
    return nameValidation && textValidation;
  }

  function hideLabels(elem, attr, attr2) {
    elem.classList.toggle('invisible', !attr && !attr2);
  }



  function cookieValueGrace() {
    var msecondsPerDay = 24 * 60 * 60 * 1000;
    var currentDate = new Date();
    var yearOfCount = '';
    var lastBirthDayDate = new Date(currentDate.getFullYear() - 1, 11, 9);
    var lastBirthDay;
    var totalDays;

    totalDays = Math.round((currentDate - lastBirthDayDate) / msecondsPerDay);
    if (totalDays <= 365) {
      yearOfCount = currentDate.getFullYear() - 1;
    } else {
      yearOfCount = currentDate.getFullYear();
    }

    lastBirthDay = new Date(yearOfCount, 11, 9);
    totalDays = Math.round((currentDate - lastBirthDay) / msecondsPerDay);
    return totalDays;
  }

  function SaveCookies() {
    var options = {
      expires: cookieValueGrace()
    };
    cookies.set('review-name', name.value, options);
    cookies.set('review-mark', stars.value, options);
  }

  function GetCookies() {
    name.value = cookies.get('review-name');
    stars.value = cookies.get('review-mark');
  }


  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
      GetCookies();
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





