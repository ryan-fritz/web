document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready');

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const loadImage = (image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = () => image.removeAttribute('data-src');
    };

    const imgOptions = {
        threshold: 0,
        rootMargin: "0px 0px 300px 0px"
    };

    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            loadImage(entry.target);
            imgObserver.unobserve(entry.target);
        });
    }, imgOptions);

    images.forEach(image => {
        imgObserver.observe(image);
    });
});
