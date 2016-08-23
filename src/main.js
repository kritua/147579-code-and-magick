'use strict';


var form = require('./form');
var Game = require('./game');
var reviewData = require('./reviews');


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

  reviewData();

