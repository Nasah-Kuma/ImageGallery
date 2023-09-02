"use strict";

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

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    openModal(images[currentImageIndex], descriptions[currentImageIndex]);
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    openModal(images[currentImageIndex], descriptions[currentImageIndex]);
}

window.onload = function () {
    const thumbnailImages = document.querySelectorAll('.thumbnails img');
    thumbnailImages.forEach(function (thumbnail) {
        images.push(thumbnail.src);
        descriptions.push(thumbnail.alt);
        thumbnail.setAttribute('tabindex', '0');
        thumbnail.setAttribute('role', 'button');
        thumbnail.setAttribute('aria-label', 'Open Image');
    });

    const modal = document.getElementById('modal');
    modal.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        }
    });
};