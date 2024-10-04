document.addEventListener('DOMContentLoaded', () => {
    console.log('Document is ready');
    setupInteractiveResearchVisuals();
    setupLoadMoreProjects();
    setupContactButton();
    lazyLoadImages(); // Ensure lazy loading is set up
    setupThemeSwitcher();
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

function setupThemeSwitcher() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    themeSwitcher.addEventListener('change', (event) => {
        document.body.className = ''; // Reset any existing theme
        const selectedTheme = event.target.value;
        if (selectedTheme !== 'default') {
            document.body.classList.add(`${selectedTheme}-theme`);
        }
    });
}
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
