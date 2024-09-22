document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.createElement('button');
    toggleSwitch.textContent = 'Toggle Dark Mode';
    Object.assign(toggleSwitch.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1001
    });
    document.body.appendChild(toggleSwitch);

    toggleSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    });

    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});
