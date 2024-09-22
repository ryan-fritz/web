document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 1s ease-in-out';
    requestAnimationFrame(() => {
        document.body.style.opacity = 1;
    });

    // Ensure text visibility by setting color explicitly
    document.body.style.color = getComputedStyle(document.body).getPropertyValue('--text-color');
});
