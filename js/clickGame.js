document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const startButton = document.createElement('button');
    const clickButton = document.createElement('button');
    const scoreDisplay = document.createElement('div');
    let score = 0;
    let gameActive = false;

    startButton.textContent = 'Start Game';
    clickButton.textContent = 'Click Me!';
    clickButton.style.display = 'none';
    scoreDisplay.textContent = 'Score: 0';

    gameContainer.appendChild(startButton);
    gameContainer.appendChild(clickButton);
    gameContainer.appendChild(scoreDisplay);

    startButton.addEventListener('click', () => {
        score = 0;
        scoreDisplay.textContent = 'Score: 0';
        gameActive = true;
        clickButton.style.display = 'block';
        startButton.style.display = 'none';

        setTimeout(() => {
            gameActive = false;
            clickButton.style.display = 'none';
            startButton.style.display = 'block';
            alert(`Game over! Your score is ${score}`);
        }, 5000); // 5 seconds game duration
    });

    clickButton.addEventListener('click', () => {
        if (gameActive) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    });
});
