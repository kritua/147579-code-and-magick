'use strict';

var Review = require('./review');
var reviewsLoad = require('./load');

//Селекторы
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsList = document.querySelector('.reviews-list');
var reviewsMore = document.querySelector('.reviews-controls-more');



//Технические переменные
var reviews = [];
var checkedReview = null;
var pageNumber = 0;
var loadingData = false;

//Константы
var REVIEW_COUNT = 3;
var REVIEW_SRC = '/api/reviews';
var DEFAULT_FILTER = document.querySelector('input[name="reviews"]:checked').value;

//фильтр
var filterAdd = document.querySelector('#' + loadFilter());
if (filterAdd) {
  filterAdd.checked = true;
}

//Функция загрузки отзывов
function reviewData() {
  //Скрыть блок отзывов
  reviewsFilter.classList.add('invisible');
  //Селектор выбранного инпута
  checkedReview = DEFAULT_FILTER;
  //Текущая страница
  pageNumber = 0;
  //Следующая страница отзывов
  addNextReview();
}

//Функция добавления следующих отзывов
function addNextReview() {
  var reviewFromTo = {
    from: pageNumber * REVIEW_COUNT,
    to: pageNumber * REVIEW_COUNT + REVIEW_COUNT,
    filter: checkedReview
  };
  if (!loadingData) {
    reviewsLoad(REVIEW_SRC, reviewFromTo, insertReview);
    loadingData = true;
  }
}

//Функция вставки отзывов на страницу
function insertReview(data) {
  reviews = data;
  reviews.forEach(function(element) {
    var review = new Review(element);
    reviewsList.appendChild(review.elem);
  });
  reviewsFilter.classList.remove('invisible');
  var isLoaded = Boolean(data.length);
  reviewsMore.classList.toggle('invisible', !isLoaded);
  pageNumber++;
  loadingData = false;
}

function filteringReviews(event) {
  event.preventDefault();
  checkedReview = event.target.value;
  reviewsList.innerHTML = '';
  saveFilter(checkedReview);
  pageNumber = 0;
  addNextReview();
}

function saveFilter(filter) {
  localStorage.setItem('filter', filter);
}

function loadFilter() {
  if (!localStorage.filter) {
    localStorage.setItem('filter', DEFAULT_FILTER);
  }
  return localStorage.getItem('filter');
}

//Событие для добавления отзывов
reviewsFilter.addEventListener('change', filteringReviews, true);
reviewsMore.addEventListener('click', addNextReview);

module.exports = reviewData;
