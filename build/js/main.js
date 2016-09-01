/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	var form = __webpack_require__(1);
	var Game = __webpack_require__(3);
	var Gallery = __webpack_require__(4);
	var reviewData = __webpack_require__(5);
	var reviewsLoad = __webpack_require__(7);
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
	
	
	var gallery = new Gallery('.photogallery');
	gallery.initialize();
	
	
	
	
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	var cookies = __webpack_require__(2);
	
	
	name.required = true;
	submitButton.disabled = true;
	
	formOverlay.onchange = formValidation;
	
	function formValidation() {
	  submitButton.disabled = !validation();
	  saveCookies();
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
	
	function saveCookies() {
	  var options = {
	    expires: cookieValueGrace()
	  };
	  cookies.set('review-name', name.value, options);
	  cookies.set('review-mark', stars.value, options);
	}
	
	function getCookies() {
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
	    getCookies();
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
	
	
	module.exports = form;
	
	
	
	


/***/ },
/* 2 */
/***/ function(module, exports) {

	exports.defaults = {};
	
	exports.set = function(name, value, options) {
	  // Retrieve options and defaults
	  var opts = options || {};
	  var defaults = exports.defaults;
	
	  // Apply default value for unspecified options
	  var expires  = opts.expires || defaults.expires;
	  var domain   = opts.domain  || defaults.domain;
	  var path     = opts.path     != undefined ? opts.path     : (defaults.path != undefined ? defaults.path : '/');
	  var secure   = opts.secure   != undefined ? opts.secure   : defaults.secure;
	  var httponly = opts.httponly != undefined ? opts.httponly : defaults.httponly;
	
	  // Determine cookie expiration date
	  // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
	  var expDate = expires ? new Date(
	      // in case expires is an integer, it should specify the number of days till the cookie expires
	      typeof expires == 'number' ? new Date().getTime() + (expires * 864e5) :
	      // else expires should be either a Date object or in a format recognized by Date.parse()
	      expires
	  ) : '';
	
	  // Set cookie
	  document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent)                // Encode cookie name
	  .replace('(', '%28')
	  .replace(')', '%29') +
	  '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +                  // Encode cookie value (RFC6265)
	  (expDate && expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') + // Add expiration date
	  (domain   ? ';domain=' + domain : '') +                                          // Add domain
	  (path     ? ';path='   + path   : '') +                                          // Add path
	  (secure   ? ';secure'           : '') +                                          // Add secure option
	  (httponly ? ';httponly'         : '');                                           // Add httponly option
	};
	
	exports.get = function(name) {
	  var cookies = document.cookie.split(';');
	
	  // Iterate all cookies
	  for(var i = 0; i < cookies.length; i++) {
	    var cookie = cookies[i];
	    var cookieLength = cookie.length;
	
	    // Determine separator index ("name=value")
	    var separatorIndex = cookie.indexOf('=');
	
	    // IE<11 emits the equal sign when the cookie value is empty
	    separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;
	
	    // Decode the cookie name and remove any leading/trailing spaces, then compare to the requested cookie name
	    if (decodeURIComponent(cookie.substring(0, separatorIndex).replace(/^\s+|\s+$/g, '')) == name) {
	      return decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
	    }
	  }
	
	  return null;
	};
	
	exports.erase = function(name, options) {
	  exports.set(name, '', {
	    expires:  -1,
	    domain:   options && options.domain,
	    path:     options && options.path,
	    secure:   0,
	    httponly: 0}
	  );
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * @const
	 * @type {number}
	 */
	var HEIGHT = 300;
	
	/**
	 * @const
	 * @type {number}
	 */
	var WIDTH = 700;
	
	/**
	 * ID уровней.
	 * @enum {number}
	 */
	var Level = {
	  INTRO: 0,
	  MOVE_LEFT: 1,
	  MOVE_RIGHT: 2,
	  LEVITATE: 3,
	  HIT_THE_MARK: 4
	};
	
	/**
	 * Порядок прохождения уровней.
	 * @type {Array.<Level>}
	 */
	var LevelSequence = [
	  Level.INTRO
	];
	
	/**
	 * Начальный уровень.
	 * @type {Level}
	 */
	var INITIAL_LEVEL = LevelSequence[0];
	
	/**
	 * Допустимые виды объектов на карте.
	 * @enum {number}
	 */
	var ObjectType = {
	  ME: 0,
	  FIREBALL: 1
	};
	
	/**
	 * Допустимые состояния объектов.
	 * @enum {number}
	 */
	var ObjectState = {
	  OK: 0,
	  DISPOSED: 1
	};
	
	/**
	 * Коды направлений.
	 * @enum {number}
	 */
	var Direction = {
	  NULL: 0,
	  LEFT: 1,
	  RIGHT: 2,
	  UP: 4,
	  DOWN: 8
	};
	
	/**
	 * Правила перерисовки объектов в зависимости от состояния игры.
	 * @type {Object.<ObjectType, function(Object, Object, number): Object>}
	 */
	var ObjectsBehaviour = {};
	
	/**
	 * Обновление движения мага. Движение мага зависит от нажатых в данный момент
	 * стрелок. Маг может двигаться одновременно по горизонтали и по вертикали.
	 * На движение мага влияет его пересечение с препятствиями.
	 * @param {Object} object
	 * @param {Object} state
	 * @param {number} timeframe
	 */
	ObjectsBehaviour[ObjectType.ME] = function(object, state, timeframe) {
	  // Пока зажата стрелка вверх, маг сначала поднимается, а потом левитирует
	  // в воздухе на определенной высоте.
	  // NB! Сложность заключается в том, что поведение описано в координатах
	  // канваса, а не координатах, относительно нижней границы игры.
	  if (state.keysPressed.UP && object.y > 0) {
	    object.direction = object.direction & ~Direction.DOWN;
	    object.direction = object.direction | Direction.UP;
	    object.y -= object.speed * timeframe * 2;
	
	    if (object.y < 0) {
	      object.y = 0;
	    }
	  }
	
	  // Если стрелка вверх не зажата, а маг находится в воздухе, он плавно
	  // опускается на землю.
	  if (!state.keysPressed.UP) {
	    if (object.y < HEIGHT - object.height) {
	      object.direction = object.direction & ~Direction.UP;
	      object.direction = object.direction | Direction.DOWN;
	      object.y += object.speed * timeframe / 3;
	    } else {
	      object.Direction = object.direction & ~Direction.DOWN;
	    }
	  }
	
	  // Если зажата стрелка влево, маг перемещается влево.
	  if (state.keysPressed.LEFT) {
	    object.direction = object.direction & ~Direction.RIGHT;
	    object.direction = object.direction | Direction.LEFT;
	    object.x -= object.speed * timeframe;
	  }
	
	  // Если зажата стрелка вправо, маг перемещается вправо.
	  if (state.keysPressed.RIGHT) {
	    object.direction = object.direction & ~Direction.LEFT;
	    object.direction = object.direction | Direction.RIGHT;
	    object.x += object.speed * timeframe;
	  }
	
	  // Ограничения по перемещению по полю. Маг не может выйти за пределы поля.
	  if (object.y < 0) {
	    object.y = 0;
	    object.Direction = object.direction & ~Direction.DOWN;
	    object.Direction = object.direction & ~Direction.UP;
	  }
	
	  if (object.y > HEIGHT - object.height) {
	    object.y = HEIGHT - object.height;
	    object.Direction = object.direction & ~Direction.DOWN;
	    object.Direction = object.direction & ~Direction.UP;
	  }
	
	  if (object.x < 0) {
	    object.x = 0;
	  }
	
	  if (object.x > WIDTH - object.width) {
	    object.x = WIDTH - object.width;
	  }
	};
	
	/**
	 * Обновление движения файрбола. Файрбол выпускается в определенном направлении
	 * и после этого неуправляемо движется по прямой в заданном направлении. Если
	 * он пролетает весь экран насквозь, он исчезает.
	 * @param {Object} object
	 * @param {Object} state
	 * @param {number} timeframe
	 */
	ObjectsBehaviour[ObjectType.FIREBALL] = function(object, state, timeframe) {
	  if (object.direction & Direction.LEFT) {
	    object.x -= object.speed * timeframe;
	  }
	
	  if (object.direction & Direction.RIGHT) {
	    object.x += object.speed * timeframe;
	  }
	
	  if (object.x < 0 || object.x > WIDTH) {
	    object.state = ObjectState.DISPOSED;
	  }
	};
	
	/**
	 * ID возможных ответов функций, проверяющих успех прохождения уровня.
	 * CONTINUE говорит о том, что раунд не закончен и игру нужно продолжать,
	 * WIN о том, что раунд выигран, FAIL — о поражении. PAUSE о том, что игру
	 * нужно прервать.
	 * @enum {number}
	 */
	var Verdict = {
	  CONTINUE: 0,
	  WIN: 1,
	  FAIL: 2,
	  PAUSE: 3,
	  INTRO: 4
	};
	
	/**
	 * Правила завершения уровня. Ключами служат ID уровней, значениями функции
	 * принимающие на вход состояние уровня и возвращающие true, если раунд
	 * можно завершать или false если нет.
	 * @type {Object.<Level, function(Object):boolean>}
	 */
	var LevelsRules = {};
	
	/**
	 * Уровень считается пройденным, если был выпущен файлболл и он улетел
	 * за экран.
	 * @param {Object} state
	 * @return {Verdict}
	 */
	LevelsRules[Level.INTRO] = function(state) {
	  var fireballs = state.garbage.filter(function(object) {
	    return object.type === ObjectType.FIREBALL;
	  });
	
	  return fireballs.length ? Verdict.WIN : Verdict.CONTINUE;
	};
	
	/**
	 * Начальные условия для уровней.
	 * @enum {Object.<Level, function>}
	 */
	var LevelsInitialize = {};
	
	/**
	 * Первый уровень.
	 * @param {Object} state
	 * @return {Object}
	 */
	LevelsInitialize[Level.INTRO] = function(state) {
	  state.objects.push(
	    // Установка персонажа в начальное положение. Он стоит в крайнем левом
	    // углу экрана, глядя вправо. Скорость перемещения персонажа на этом
	    // уровне равна 2px за кадр.
	    {
	      direction: Direction.RIGHT,
	      height: 84,
	      speed: 2,
	      sprite: 'img/wizard.gif',
	      spriteReversed: 'img/wizard-reversed.gif',
	      state: ObjectState.OK,
	      type: ObjectType.ME,
	      width: 61,
	      x: WIDTH / 3,
	      y: HEIGHT - 100
	    }
	  );
	
	  return state;
	};
	
	/**
	 * Конструктор объекта Game. Создает canvas, добавляет обработчики событий
	 * и показывает приветственный экран.
	 * @param {Element} container
	 * @constructor
	 */
	var Game = function(container) {
	  this.container = container;
	  this.canvas = document.createElement('canvas');
	  this.canvas.width = container.clientWidth;
	  this.canvas.height = container.clientHeight;
	  this.container.appendChild(this.canvas);
	
	  this.ctx = this.canvas.getContext('2d');
	
	  this._onKeyDown = this._onKeyDown.bind(this);
	  this._onKeyUp = this._onKeyUp.bind(this);
	  this._pauseListener = this._pauseListener.bind(this);
	
	  this.setDeactivated(false);
	};
	
	Game.prototype = {
	  /**
	   * Текущий уровень игры.
	   * @type {Level}
	   */
	  level: INITIAL_LEVEL,
	
	  /** @param {boolean} deactivated */
	  setDeactivated: function(deactivated) {
	    if (this._deactivated === deactivated) {
	      return;
	    }
	
	    this._deactivated = deactivated;
	
	    if (deactivated) {
	      this._removeGameListeners();
	    } else {
	      this._initializeGameListeners();
	    }
	  },
	
	  /**
	   * Состояние игры. Описывает местоположение всех объектов на игровой карте
	   * и время проведенное на уровне и в игре.
	   * @return {Object}
	   */
	  getInitialState: function() {
	    return {
	      // Статус игры. Если CONTINUE, то игра продолжается.
	      currentStatus: Verdict.CONTINUE,
	
	      // Объекты, удаленные на последнем кадре.
	      garbage: [],
	
	      // Время с момента отрисовки предыдущего кадра.
	      lastUpdated: null,
	
	      // Состояние нажатых клавиш.
	      keysPressed: {
	        ESC: false,
	        LEFT: false,
	        RIGHT: false,
	        SPACE: false,
	        UP: false
	      },
	
	      // Время начала прохождения уровня.
	      levelStartTime: null,
	
	      // Все объекты на карте.
	      objects: [],
	
	      // Время начала прохождения игры.
	      startTime: null
	    };
	  },
	
	  /**
	   * Начальные проверки и запуск текущего уровня.
	   * @param {Level=} level
	   * @param {boolean=} restart
	   */
	  initializeLevelAndStart: function(level, restart) {
	    level = typeof level === 'undefined' ? this.level : level;
	    restart = typeof restart === 'undefined' ? true : restart;
	
	    if (restart || !this.state) {
	      // При перезапуске уровня, происходит полная перезапись состояния
	      // игры из изначального состояния.
	      this.state = this.getInitialState();
	      this.state = LevelsInitialize[this.level](this.state);
	    } else {
	      // При продолжении уровня состояние сохраняется, кроме записи о том,
	      // что состояние уровня изменилось с паузы на продолжение игры.
	      this.state.currentStatus = Verdict.CONTINUE;
	    }
	
	    // Запись времени начала игры и времени начала уровня.
	    this.state.levelStartTime = Date.now();
	    if (!this.state.startTime) {
	      this.state.startTime = this.state.levelStartTime;
	    }
	
	    this._preloadImagesForLevel(function() {
	      // Предварительная отрисовка игрового экрана.
	      this.render();
	
	      // Установка обработчиков событий.
	      this._initializeGameListeners();
	
	      // Запуск игрового цикла.
	      this.update();
	    }.bind(this));
	  },
	
	  /**
	   * Временная остановка игры.
	   * @param {Verdict=} verdict
	   */
	  pauseLevel: function(verdict) {
	    if (verdict) {
	      this.state.currentStatus = verdict;
	    }
	
	    this.state.keysPressed.ESC = false;
	    this.state.lastUpdated = null;
	
	    this._removeGameListeners();
	    window.addEventListener('keydown', this._pauseListener);
	
	    this._drawPauseScreen();
	  },
	
	  /**
	   * Обработчик событий клавиатуры во время паузы.
	   * @param {KeyboardsEvent} evt
	   * @private
	   * @private
	   */
	  _pauseListener: function(evt) {
	    if (evt.keyCode === 32 && !this._deactivated) {
	      evt.preventDefault();
	      var needToRestartTheGame = this.state.currentStatus === Verdict.WIN ||
	          this.state.currentStatus === Verdict.FAIL;
	      this.initializeLevelAndStart(this.level, needToRestartTheGame);
	
	      window.removeEventListener('keydown', this._pauseListener);
	    }
	  },
	
	  /**
	   * Отрисовка экрана паузы.
	   */
	  _drawPauseScreen: function() {
	    switch (this.state.currentStatus) {
	      case Verdict.WIN:
	        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	        this.ctx.beginPath();
	        this.ctx.moveTo(315, 205);
	        this.ctx.lineTo(335, 55);
	        this.ctx.lineTo(655, 55);
	        this.ctx.lineTo(655, 160);
	        this.ctx.lineTo(345, 180);
	        this.ctx.closePath();
	        this.ctx.fill();
	        this.ctx.fillStyle = 'white';
	        this.ctx.beginPath();
	        this.ctx.moveTo(310, 200);
	        this.ctx.lineTo(330, 50);
	        this.ctx.lineTo(650, 50);
	        this.ctx.lineTo(650, 155);
	        this.ctx.lineTo(340, 175);
	        this.ctx.closePath();
	        this.ctx.fill();
	        this.ctx.stroke();
	        this.ctx.fillStyle = 'black';
	        this.ctx.font = '16px PT Mono';
	        this.ctx.fillText('Вы сейчас поджарили чью-то', 350, 70);
	        this.ctx.fillText('шкуру. Игры с огнём опасны.', 350, 90);
	        this.ctx.fillText('По возможности, жарьте', 350, 110);
	        this.ctx.fillText('больше злодеев и негодяев.', 350, 130);
	        this.ctx.fillText('"Пробел" чтобы сыграть ещё раз', 350, 150);
	        break;
	      case Verdict.FAIL:
	        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	        this.ctx.beginPath();
	        this.ctx.moveTo(315, 205);
	        this.ctx.lineTo(335, 55);
	        this.ctx.lineTo(655, 55);
	        this.ctx.lineTo(655, 160);
	        this.ctx.lineTo(345, 180);
	        this.ctx.closePath();
	        this.ctx.fill();
	        this.ctx.fillStyle = 'white';
	        this.ctx.beginPath();
	        this.ctx.moveTo(310, 200);
	        this.ctx.lineTo(330, 50);
	        this.ctx.lineTo(650, 50);
	        this.ctx.lineTo(650, 155);
	        this.ctx.lineTo(340, 175);
	        this.ctx.closePath();
	        this.ctx.fill();
	        this.ctx.stroke();
	        this.ctx.fillStyle = 'black';
	        this.ctx.font = '16px PT Mono';
	        this.ctx.fillText('Вы ни на что не способны', 350, 70);
	        this.ctx.fillText('Просто смиритесь. Ни на что.', 350, 90);
	        this.ctx.fillText('Но вы можете попробовать ещё раз', 350, 110);
	        this.ctx.fillText('Просто нажмите "Пробел"', 350, 130);
	        break;
	      case Verdict.PAUSE:
	        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	        this.ctx.beginPath();
	        this.ctx.moveTo(315, 205);
	        this.ctx.lineTo(335, 55);
	        this.ctx.lineTo(655, 55);
	        this.ctx.lineTo(655, 160);
	        this.ctx.lineTo(345, 180);
	        this.ctx.closePath();
	        this.ctx.fill();
	        this.ctx.fillStyle = 'white';
	        this.ctx.beginPath();
	        this.ctx.moveTo(310, 200);
	        this.ctx.lineTo(330, 50);
	        this.ctx.lineTo(650, 50);
	        this.ctx.lineTo(650, 155);
	        this.ctx.lineTo(340, 175);
	        this.ctx.closePath();
	        this.ctx.fill();
	        this.ctx.stroke();
	        this.ctx.fillStyle = 'black';
	        this.ctx.font = '16px PT Mono';
	        this.ctx.fillText('Игра на паузе', 350, 90);
	        this.ctx.fillText('Нажми "Пробел" для старта.', 350, 110);
	        break;
	      case Verdict.INTRO:
	        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	        this.ctx.beginPath();
	        this.ctx.moveTo(315, 205);
	        this.ctx.lineTo(335, 55);
	        this.ctx.lineTo(675, 55);
	        this.ctx.lineTo(675, 160);
	        this.ctx.lineTo(345, 180);
	        this.ctx.closePath();
	        this.ctx.fill();
	        this.ctx.fillStyle = 'white';
	        this.ctx.beginPath();
	        this.ctx.moveTo(310, 200);
	        this.ctx.lineTo(330, 50);
	        this.ctx.lineTo(670, 50);
	        this.ctx.lineTo(670, 155);
	        this.ctx.lineTo(340, 175);
	        this.ctx.closePath();
	        this.ctx.fill();
	        this.ctx.stroke();
	        this.ctx.fillStyle = 'black';
	        this.ctx.font = '16px PT Mono';
	        this.ctx.fillText('Игра про мага, который там короче', 340, 70);
	        this.ctx.fillText('ходит и все такое в общем.', 340, 90);
	        this.ctx.fillText('Нажми "Пробел" для старта.', 340, 110);
	        this.ctx.fillText('Стрелки для управления и прыжка.', 340, 130);
	        this.ctx.fillText('"Shift" для запуска фаерболла.', 340, 150);
	        break;
	    }
	  },
	
	  /**
	   * Предзагрузка необходимых изображений для уровня.
	   * @param {function} callback
	   * @private
	   */
	  _preloadImagesForLevel: function(callback) {
	    if (typeof this._imagesArePreloaded === 'undefined') {
	      this._imagesArePreloaded = [];
	    }
	
	    if (this._imagesArePreloaded[this.level]) {
	      callback();
	      return;
	    }
	
	    var levelImages = [];
	    this.state.objects.forEach(function(object) {
	      levelImages.push(object.sprite);
	
	      if (object.spriteReversed) {
	        levelImages.push(object.spriteReversed);
	      }
	    });
	
	    var i = levelImages.length;
	    var imagesToGo = levelImages.length;
	
	    while (i-- > 0) {
	      var image = new Image();
	      image.src = levelImages[i];
	      image.onload = function() {
	        if (--imagesToGo === 0) {
	          this._imagesArePreloaded[this.level] = true;
	          callback();
	        }
	      }.bind(this);
	    }
	  },
	
	  /**
	   * Обновление статуса объектов на экране. Добавляет объекты, которые должны
	   * появиться, выполняет проверку поведения всех объектов и удаляет те, которые
	   * должны исчезнуть.
	   * @param {number} delta Время, прошеднее с отрисовки прошлого кадра.
	   */
	  updateObjects: function(delta) {
	    // Персонаж.
	    var me = this.state.objects.filter(function(object) {
	      return object.type === ObjectType.ME;
	    })[0];
	
	    // Добавляет на карту файрбол по нажатию на Shift.
	    if (this.state.keysPressed.SHIFT) {
	      this.state.objects.push({
	        direction: me.direction,
	        height: 24,
	        speed: 5,
	        sprite: 'img/fireball.gif',
	        type: ObjectType.FIREBALL,
	        width: 24,
	        x: me.direction & Direction.RIGHT ? me.x + me.width : me.x - 24,
	        y: me.y + me.height / 2
	      });
	
	      this.state.keysPressed.SHIFT = false;
	    }
	
	    this.state.garbage = [];
	
	    // Убирает в garbage не используемые на карте объекты.
	    var remainingObjects = this.state.objects.filter(function(object) {
	      ObjectsBehaviour[object.type](object, this.state, delta);
	
	      if (object.state === ObjectState.DISPOSED) {
	        this.state.garbage.push(object);
	        return false;
	      }
	
	      return true;
	    }, this);
	
	    this.state.objects = remainingObjects;
	  },
	
	  /**
	   * Проверка статуса текущего уровня.
	   */
	  checkStatus: function() {
	    // Нет нужны запускать проверку, нужно ли останавливать уровень, если
	    // заранее известно, что да.
	    if (this.state.currentStatus !== Verdict.CONTINUE) {
	      return;
	    }
	
	    if (!this.commonRules) {
	      /**
	       * Проверки, не зависящие от уровня, но влияющие на его состояние.
	       * @type {Array.<functions(Object):Verdict>}
	       */
	      this.commonRules = [
	        /**
	         * Если персонаж мертв, игра прекращается.
	         * @param {Object} state
	         * @return {Verdict}
	         */
	        function checkDeath(state) {
	          var me = state.objects.filter(function(object) {
	            return object.type === ObjectType.ME;
	          })[0];
	
	          return me.state === ObjectState.DISPOSED ?
	              Verdict.FAIL :
	              Verdict.CONTINUE;
	        },
	
	        /**
	         * Если нажата клавиша Esc игра ставится на паузу.
	         * @param {Object} state
	         * @return {Verdict}
	         */
	        function checkKeys(state) {
	          return state.keysPressed.ESC ? Verdict.PAUSE : Verdict.CONTINUE;
	        },
	
	        /**
	         * Игра прекращается если игрок продолжает играть в нее два часа подряд.
	         * @param {Object} state
	         * @return {Verdict}
	         */
	        function checkTime(state) {
	          return Date.now() - state.startTime > 3 * 60 * 1000 ?
	              Verdict.FAIL :
	              Verdict.CONTINUE;
	        }
	      ];
	    }
	
	    // Проверка всех правил влияющих на уровень. Запускаем цикл проверок
	    // по всем универсальным проверкам и проверкам конкретного уровня.
	    // Цикл продолжается до тех пор, пока какая-либо из проверок не вернет
	    // любое другое состояние кроме CONTINUE или пока не пройдут все
	    // проверки. После этого состояние сохраняется.
	    var allChecks = this.commonRules.concat(LevelsRules[this.level]);
	    var currentCheck = Verdict.CONTINUE;
	    var currentRule;
	
	    while (currentCheck === Verdict.CONTINUE && allChecks.length) {
	      currentRule = allChecks.shift();
	      currentCheck = currentRule(this.state);
	    }
	
	    this.state.currentStatus = currentCheck;
	  },
	
	  /**
	   * Принудительная установка состояния игры. Используется для изменения
	   * состояния игры от внешних условий, например, когда необходимо остановить
	   * игру, если она находится вне области видимости и установить вводный
	   * экран.
	   * @param {Verdict} status
	   */
	  setGameStatus: function(status) {
	    if (this.state.currentStatus !== status) {
	      this.state.currentStatus = status;
	    }
	  },
	
	  /**
	   * Отрисовка всех объектов на экране.
	   */
	  render: function() {
	    // Удаление всех отрисованных на странице элементов.
	    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	    // Выставление всех элементов, оставшихся в this.state.objects согласно
	    // их координатам и направлению.
	    this.state.objects.forEach(function(object) {
	      if (object.sprite) {
	        var image = new Image(object.width, object.height);
	        image.src = (object.spriteReversed && object.direction & Direction.LEFT) ?
	            object.spriteReversed :
	            object.sprite;
	        this.ctx.drawImage(image, object.x, object.y, object.width, object.height);
	      }
	    }, this);
	  },
	
	  /**
	   * Основной игровой цикл. Сначала проверяет состояние всех объектов игры
	   * и обновляет их согласно правилам их поведения, а затем запускает
	   * проверку текущего раунда. Рекурсивно продолжается до тех пор, пока
	   * проверка не вернет состояние FAIL, WIN или PAUSE.
	   */
	  update: function() {
	    if (!this.state.lastUpdated) {
	      this.state.lastUpdated = Date.now();
	    }
	
	    var delta = (Date.now() - this.state.lastUpdated) / 10;
	    this.updateObjects(delta);
	    this.checkStatus();
	
	    switch (this.state.currentStatus) {
	      case Verdict.CONTINUE:
	        this.state.lastUpdated = Date.now();
	        this.render();
	        requestAnimationFrame(function() {
	          this.update();
	        }.bind(this));
	        break;
	
	      case Verdict.WIN:
	      case Verdict.FAIL:
	      case Verdict.PAUSE:
	      case Verdict.INTRO:
	        this.pauseLevel();
	        break;
	    }
	  },
	
	  /**
	   * @param {KeyboardEvent} evt [description]
	   * @private
	   */
	  _onKeyDown: function(evt) {
	    switch (evt.keyCode) {
	      case 37:
	        this.state.keysPressed.LEFT = true;
	        break;
	      case 39:
	        this.state.keysPressed.RIGHT = true;
	        break;
	      case 38:
	        this.state.keysPressed.UP = true;
	        break;
	      case 27:
	        this.state.keysPressed.ESC = true;
	        break;
	    }
	
	    if (evt.shiftKey) {
	      this.state.keysPressed.SHIFT = true;
	    }
	  },
	
	  /**
	   * @param {KeyboardEvent} evt [description]
	   * @private
	   */
	  _onKeyUp: function(evt) {
	    switch (evt.keyCode) {
	      case 37:
	        this.state.keysPressed.LEFT = false;
	        break;
	      case 39:
	        this.state.keysPressed.RIGHT = false;
	        break;
	      case 38:
	        this.state.keysPressed.UP = false;
	        break;
	      case 27:
	        this.state.keysPressed.ESC = false;
	        break;
	    }
	
	    if (evt.shiftKey) {
	      this.state.keysPressed.SHIFT = false;
	    }
	  },
	
	  /** @private */
	  _initializeGameListeners: function() {
	    window.addEventListener('keydown', this._onKeyDown);
	    window.addEventListener('keyup', this._onKeyUp);
	  },
	
	  /** @private */
	  _removeGameListeners: function() {
	    window.removeEventListener('keydown', this._onKeyDown);
	    window.removeEventListener('keyup', this._onKeyUp);
	  }
	};
	
	Game.Verdict = Verdict;
	
	module.exports = Game;


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	var Gallery = function(picturesGallery) {
	  this.overlayGallery = document.querySelector('.overlay-gallery');
	  this.leftControl = document.querySelector('.overlay-gallery-control-left');
	  this.rightControl = document.querySelector('.overlay-gallery-control-right');
	  this.closeGallery = document.querySelector('.overlay-gallery-close');
	  this.currentSlide = document.querySelector('.preview-number-current');
	  this.previewSlide = document.querySelector('.overlay-gallery-preview');
	  this.total = document.querySelector('.preview-number-total');
	
	  this.photogallery = document.querySelector(picturesGallery);
	
	  this.nextSlide = this.nextPicture.bind(this);
	  this.prevSlide = this.prevPicture.bind(this);
	  this.hideGallery = this.hide.bind(this);
	  this.pictures = [];
	  this.activePicture = 0;
	  this.currentPicture = null;
	};
	
	Gallery.prototype.initialize = function() {
	  var self = this;
	  var picturesLink = this.photogallery.querySelectorAll('.photogallery-image');
	  Array.prototype.forEach.call(picturesLink, function(item, i) {
	    item.onclick = function() {
	      self.show(i);
	    };
	    var image = item.querySelector('img');
	    self.pictures.push(image.src);
	  });
	  this.total.textContent = this.pictures.length;
	};
	
	/*
	 Открываем галерею
	 */
	Gallery.prototype.show = function(activePicture) {
	  this.closeGallery.addEventListener('click', this.hideGallery);
	  this.rightControl.addEventListener('click', this.nextSlide);
	  this.leftControl.addEventListener('click', this.prevSlide);
	
	  this.overlayGallery.classList.remove('invisible');
	
	  this.setActivePicture(activePicture);
	};
	/*
	 Закрываем галерею
	 */
	Gallery.prototype.hide = function() {
	  this.overlayGallery.classList.add('invisible');
	  this.closeGallery.removeEventListener('click', this.hideGallery);
	  this.rightControl.removeEventListener('click', this.nextSlide);
	  this.leftControl.removeEventListener('click', this.prevSlide);
	};
	/*
	 Показ изображения
	 */
	Gallery.prototype.setActivePicture = function(activePicture) {
	  var image = new Image();
	  this.activePicture = activePicture;
	
	  image.src = this.pictures[activePicture];
	
	  if (this.currentPicture) {
	    this.previewSlide.replaceChild(image, this.currentPicture);
	  } else {
	    this.previewSlide.appendChild(image);
	  }
	
	  this.currentSlide.innerHTML = this.activePicture + 1;
	  this.currentPicture = image;
	};
	/*
	 Следующая картинка
	 */
	Gallery.prototype.nextPicture = function() {
	  if (this.activePicture + 1 < this.pictures.length) {
	    this.setActivePicture(this.activePicture + 1);
	  }
	};
	/*
	 Предыдущая картинка
	 */
	Gallery.prototype.prevPicture = function() {
	  // не this.pictures.length , а больше 0
	  if (this.activePicture - 1 >= 0) {
	    this.setActivePicture(this.activePicture - 1);
	  }
	};
	
	module.exports = Gallery;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getReview = __webpack_require__(6);
	
	var reviewsFilter = document.querySelector('.reviews-filter');
	var reviewsList = document.querySelector('.reviews-list');
	
	
	function reviewData(data) {
	  reviewsFilter.classList.add('invisible');
	  data.forEach(function(element) {
	    reviewsList.appendChild(getReview(element));
	  });
	  reviewsFilter.classList.remove('invisible');
	}
	
	module.exports = reviewData;
	
	
	


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var reviewsTemplate = document.querySelector('#review-template');
	
	
	function getReview(data) {
	  var imageLoadTimeout;
	  var cloneElem;
	  var IMAGE_SIZE = 124;
	  var IMAGE_LOAD_TIMEOUT = 10000;
	
	  if ('content' in reviewsTemplate) {
	    cloneElem = reviewsTemplate.content.querySelector('.review');
	  } else {
	    cloneElem = reviewsTemplate.querySelector('.review');
	  }
	
	  var elem = cloneElem.cloneNode(true);
	  var desc = elem.querySelector('.review-text');
	  var rate = elem.querySelector('.review-rating');
	  var author = elem.querySelector('.review-author');
	  var authorImage = new Image(IMAGE_SIZE, IMAGE_SIZE);
	
	  authorImage.onload = function() {
	    clearTimeout(imageLoadTimeout);
	    authorImage.classList.add('review-author');
	    elem.replaceChild(authorImage, author);
	  };
	
	  authorImage.onerror = function() {
	    elem.classList.add('review-load-failure');
	  };
	
	  imageLoadTimeout = setTimeout(function() {
	    authorImage.src = '';
	    elem.classList.add('review-load-failure');
	  }, IMAGE_LOAD_TIMEOUT);
	
	  var rating = {
	    2: 'two',
	    3: 'three',
	    4: 'four',
	    5: 'five'
	  };
	  if (rating[data.rating]) {
	    rate.classList.add('review-rating-' + rating[data.rating]);
	  }
	  desc.textContent = data.description;
	  authorImage.src = data.author.picture;
	
	  return elem;
	}
	
	
	module.exports = getReview;


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	window.CallBackRegistry = {};
	
	/**
	 * JSONP запрос
	 * @param {string} link адрес
	 * @param {function} callback callback-функция
	 */
	
	function reviewsLoad(link, callback) {
	  var callbackVar = 'callback' + String(Math.random()).slice(-6);
	  var script = document.createElement('script');
	
	  link = link + '?callback=CallBackRegistry.' + callbackVar;
	  window.CallBackRegistry[callbackVar] = function(data) {
	    callback(data);
	  };
	
	  script.onload = script.onerror = function() {
	    delete window.CallBackRegistry[callbackVar];
	    document.body.removeChild(script);
	  };
	
	  script.src = link;
	  document.body.appendChild(script);
	}
	
	module.exports = reviewsLoad;


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map