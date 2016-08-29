var Gallery = function(pictures) {
	this.picturesAll = document.querySelectorAll('.photogallery-image');
	this.overlayGallery = document.querySelector('.overlay-gallery');
	this.leftControl = document.querySelector('.overlay-gallery-control-left');
	this.rightControl = document.querySelector('.overlay-gallery-control-right');
	this.closeGallery = document.querySelector('.overlay-gallery-close');
	this.currentSlide = document.querySelector('.preview-number-current');

	this.pictures = pictures;
	this.activePicture = 0;
};

/*
 Открываем галерею
 */
Gallery.prototype.show = function(activePicture) {
	this.picturesAll.addEventListener('click', )
// Вешаем обработчики событий. Лучше это сделать через addEventListener
// прочитай про метод .bind
// Выглядит примерно так addEventListener('click', this.next.bind(this)), или использовать var self = this  и addEventListener('click', self.next)
// this.overlayGallery убираем класс invisible
// вызываем setActivePicture для выбора и показа картинки
}
/*
 Закрываем галерею
 */
Gallery.prototype.hide = function() {
// ставим класс invisible
// убираем обработчики this.removeEventListener
}
/*
 Показ изображения
 */
Gallery.prototype.setActivePicture = function(activePicture) {
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