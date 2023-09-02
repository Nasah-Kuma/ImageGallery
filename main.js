let currentImageIndex = 0;
let images = [];
let descriptions = [];

function openModal(imageSrc, description) {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');

  modalImage.src = imageSrc;
  modalDescription.textContent = description;
  modal.style.display = 'block';

  currentImageIndex = images.indexOf(imageSrc);
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function changeImage(n) {
  currentImageIndex += n;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  modalImage.src = images[currentImageIndex];
  modalDescription.textContent = descriptions[currentImageIndex];
}

window.onload = function() {
  const thumbnailImages = document.querySelectorAll('.thumbnails img');
  thumbnailImages.forEach(function(thumbnail, index) {
    images.push(thumbnail.src);
    descriptions.push(thumbnail.alt);

    thumbnail.addEventListener('click', function() {
      openModal(thumbnail.src, thumbnail.alt);
    });

    thumbnail.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        openModal(thumbnail.src, thumbnail.alt);
      }
    });

    thumbnail.setAttribute('tabindex', '0');
    thumbnail.setAttribute('role', 'button');
    thumbnail.setAttribute('aria-label', 'Open Image');
  });

  const modal = document.getElementById('modal');
  modal.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    } else if (event.key === 'ArrowLeft') {
      changeImage(-1);
    } else if (event.key === 'ArrowRight') {
      changeImage(1);
    }
  });
};