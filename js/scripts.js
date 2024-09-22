document.addEventListener('DOMContentLoaded', () => {
    console.log('Document is ready');

    // Dark mode toggle
    const toggleSwitch = document.createElement('button');
    toggleSwitch.textContent = 'Toggle Dark Mode';
    Object.assign(toggleSwitch.style, {
        position: 'fixed',
        top: '10px',
        right: '10px'
    });
    document.body.appendChild(toggleSwitch);

    toggleSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
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
