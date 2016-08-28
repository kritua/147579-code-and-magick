'use strict';

var Gallery = function(pictures) {

	var self = this;

	this.pictures = pictures;
	this.activePicture = 0;
	this.picturesAll = document.querySelectorAll('.photogallery-image');
	this.overlayGallery = document.querySelector('.overlay-gallery');
	this.leftControl = document.querySelector('.overlay-gallery-control-left');
	this.rightControl = document.querySelector('.overlay-gallery-control-right');
	this.closeGallery = document.querySelector('.overlay-gallery-close');
	this.currentSlide = document.querySelector('.preview-number-current');
	this.totalSlides = document.querySelector('.preview-number-total');

	this.closeGallery.onclick = function() {
		self.overlayGallery.classList.add('invisible');
	}


};




Gallery.prototype.show = function() {

	overlayGallery.classList.remove('invisible');
};



var galleryShow = new Gallery(pictures);

module.exports = Gallery;
