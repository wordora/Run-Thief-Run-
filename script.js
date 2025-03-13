const player = document.getElementById('player');
let playerY = 0;
let playerVelocityY = 0;
let gravity = 0.5;
let isJumping = false;

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !isJumping) {
    playerVelocityY = -10;
    isJumping = true;
  }
});

function gameLoop() {
  playerVelocityY += gravity;
  playerY += playerVelocityY;

  if (playerY > 0) {
    playerY = 0;
    playerVelocityY = 0;
    isJumping = false;
  }

  player.style.bottom = `${playerY}px`;

  requestAnimationFrame(gameLoop);
}

gameLoop();

// Additional JavaScript for more features

const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
let score = 0;
let lives = 3;

function updateScore(points) {
  score += points;
  scoreElement.innerText = `Score: ${score}`;
}

function loseLife() {
  lives -= 1;
  livesElement.innerText = `Lives: ${lives}`;
  if (lives <= 0) {
    alert('Game Over!');
    resetGame();
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  updateScore(0);
  livesElement.innerText = `Lives: ${lives}`;
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowLeft') {
    player.style.animation = 'moveLeft 0.5s forwards';
  } else if (event.code === 'ArrowRight') {
    player.style.animation = 'moveRight 0.5s forwards';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyF') {
    shootProjectile();
  }
});

function shootProjectile() {
  const projectile = document.createElement('div');
  projectile.classList.add('projectile');
  projectile.style.left = '50px';
  projectile.style.bottom = `${playerY}px`;
  document.body.appendChild(projectile);

  projectile.style.animation = 'shoot 1s forwards';
  projectile.addEventListener('animationend', () => {
    document.body.removeChild(projectile);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyP') {
    createPowerUp();
  }
});

function createPowerUp() {
  const powerUp = document.createElement('div');
  powerUp.classList.add('power-up');
  powerUp.style.left = `${Math.random() * window.innerWidth}px`;
  powerUp.style.bottom = `${Math.random() * window.innerHeight}px`;
  document.body.appendChild(powerUp);

  powerUp.addEventListener('click', () => {
    document.body.removeChild(powerUp);
    updateScore(10);
  });
}
