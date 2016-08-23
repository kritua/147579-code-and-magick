

function getReview(data) {
  var authorImage = new Image();
  var imageLoadTimeout;
  var cloneElem = null;
  var elem  = cloneElem.cloneNode(true);
  var desc = elem.querySelector('.review-text');
  var rate = elem.querySelector('.review-rating');
  var author = elem.querySelector('.review-author');
  var reviewsTemplate = document.querySelector('#review-template'); 
  
  var IMAGE_LOAD_TIMEOUT = 10000;

  if ('content' in reviewsTemplate) {
    cloneElem = reviewsTemplate.content.querySelector('.review');
  } else {
    cloneElem = reviewsTemplate.querySelector('.review');
  }
  
authorImage.src = data.author.picture;
  authorImage.onload = function (event) {
    clearTimeout(imageLoadTimeout);
    elem.style.authorImage = 'url(\'' + event.target.src + '\')';
    authorImage.width = '124px';
    authorImage.height = '124px';
  };

  authorImage.onerror = function () {
    elem.classList.add('review-load-failure');
  };

  imageLoadTimeout = setTimeout(function () {
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
  author.src = data.author.picture;

  return elem;
}


module.exports = getReview;