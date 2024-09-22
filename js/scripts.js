document.addEventListener('DOMContentLoaded', () => {
    console.log('Document is ready');
    setupInteractiveResearchVisuals();
    setupLoadMoreProjects();
    setupContactButton();
    setupDarkModeToggle();
    lazyLoadImages(); // Ensure lazy loading is set up
});

function setupInteractiveResearchVisuals() {
    const ctx = document.getElementById('researchChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Data 1', 'Data 2', 'Data 3'],
            datasets: [{
                label: 'Research Data',
                data: [12, 19, 3],
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function setupLoadMoreProjects() {
    const loadMoreButton = document.getElementById('loadMoreProjects');
    loadMoreButton.addEventListener('click', () => {
        // Logic to load more projects
        alert('Load more projects functionality to be implemented.');
    });
}

function setupContactButton() {
    const contactButton = document.getElementById('contactButton');
    contactButton.addEventListener('click', () => {
        // Logic to open contact form
        alert('Contact form functionality to be implemented.');
    });
}
function setupDarkModeToggle() {
    const toggleSwitch = document.createElement('button');
    toggleSwitch.textContent = '🌙 Dark Mode';
    Object.assign(toggleSwitch.style, {
        position: 'fixed',
        top: '80px',
        right: '20px',
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
}

function lazyLoadImages() {
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
}
