document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.createElement('button');
    toggleSwitch.textContent = '🌙 Dark Mode';
    Object.assign(toggleSwitch.style, {
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 1001,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 15px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    });
    document.body.appendChild(toggleSwitch);

    toggleSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    });

    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Ensure text visibility in dark mode
    document.body.style.color = getComputedStyle(document.body).getPropertyValue('--dark-text-color');
});
