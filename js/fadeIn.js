document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 1s ease-in-out';
    requestAnimationFrame(() => {
        document.body.style.opacity = 1;
    });
});
