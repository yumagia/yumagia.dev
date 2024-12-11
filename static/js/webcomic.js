
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.webcomic-slider img');
    let currentIndex = 0;

    const showImage = (index) => {
        images.forEach((image, i) => {
            image.style.display = i === index ? 'block' : 'none';
        });
    };

    document.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    showImage(currentIndex);
});