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
}

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
