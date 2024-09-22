document.addEventListener('DOMContentLoaded', () => {
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
});
