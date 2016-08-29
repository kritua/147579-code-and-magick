var Gallery = function(pictures) {
	this.overlayGallery = document.querySelector('.overlay-gallery');
	this.leftControl = document.querySelector('.overlay-gallery-control-left');
	this.rightControl = document.querySelector('.overlay-gallery-control-right');
	this.closeGallery = document.querySelector('.overlay-gallery-close');
	this.currentSlide = document.querySelector('.preview-number-current');
	this.previewSlide = document.querySelector('.overlay-gallery-preview');

	this.picturesLink = document.querySelectorAll('.photogallery-image');
	this.picturesAll = document.querySelectorAll('.photogallery-image img');



	this.nextSlide = this.nextPicture.bind(this);
	this.prevSlide = this.prevPicture.bind(this);
	this.hideGallery = this.hide.bind(this);

	this.pictures = pictures;
	this.activePicture = 0;
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
// Вешаем обработчики событий. Лучше это сделать через addEventListener
// прочитай про метод .bind
// Выглядит примерно так addEventListener('click', this.next.bind(this)), или использовать var self = this  и addEventListener('click', self.next)
// this.overlayGallery убираем класс invisible
// вызываем setActivePicture для выбора и показа картинки
};
/*
 Закрываем галерею
 */
Gallery.prototype.hide = function() {
	this.overlayGallery.classList.add('invisible');
	this.closeGallery.removeEventListener('click', this.hideGallery);
	this.rightControl.removeEventListener('click', this.nextSlide);
	this.leftControl.removeEventListener('click', this.prevSlide);
// ставим класс invisible
// убираем обработчики this.removeEventListener
};
/*
 Показ изображения
 */
Gallery.prototype.setActivePicture = function(activePicture) {
	var image = new Image();
	this.activePicture = activePicture;

	if (this.currentSlide) {
		this.previewSlide.replaceChild(image, this.currentSlide);
	} else {
		this.previewSlide.appendChild(image);
	}

// создаем картинку
// сохраняем активную картинку
// выбираем картинку из нашего массива адресов
// Смотрим если уже картинка до этого была добавлена то ее заменяем.
// Если нет то добавляем
}
/*
 Следующая картинка
 */
Gallery.prototype.nextPicture = function() {
// проверяем если activePicture+1 меньше длины массива
// То вызываем setActivePicture(нужный номер) 
}
/*
 Предыдущая картинка
 */
Gallery.prototype.prevPicture = function() {
// проверяем если this.activePicture - 1 >= 0
// Вызываем setActivePicture
}