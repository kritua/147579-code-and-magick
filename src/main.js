'use strict';


var form = require('./form');
var Game = require('./game');
var Gallery = require('./gallery');
var reviewData = require('./reviews');
var reviewsLoad = require('./load');
var apiURL = 'http://localhost:1506/api/reviews';

var picturesLink = document.querySelectorAll('.photogallery-image');
var picturesAll = document.querySelectorAll('.photogallery-image img');

var game = new Game(document.querySelector('.demo'));
var formOpenButton = document.querySelector('.reviews-controls-new');

/** @param {MouseEvent} evt */
formOpenButton.onclick = function(evt) {
  evt.preventDefault();
  form.open(function() {
    game.setGameStatus(Game.Verdict.PAUSE);
    game.setDeactivated(true);
  });
};

form.onClose = function() {
  game.setDeactivated(false);
};

game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

reviewsLoad(apiURL, reviewData);


var pictures = [];

var picturesArray = Array.prototype.slice.call(picturesAll);
for (var y = 0; y < picturesArray.length; y++) {
  pictures[y] = picturesArray[y].src;
}

var gallery = new Gallery(pictures);

Array.prototype.forEach.call(picturesLink, function(item, i) {
  item.addEventListener('click', gallery.show.bind(gallery, i));
});




