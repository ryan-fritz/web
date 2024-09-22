document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src], video[data-src]');
    const loadImage = (image) => {
        image.src = image.dataset.src;
        image.onload = () => image.removeAttribute('data-src');
    };

    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            loadImage(entry.target);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0,
        rootMargin: "0px 0px 300px 0px"
    });

    images.forEach(image => imgObserver.observe(image));
});
