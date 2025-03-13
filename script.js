const player = document.getElementById('player');
const platforms = document.querySelectorAll('.platform');
const enemies = document.querySelectorAll('.enemy');

let velocityX = 0;
let velocityY = 0;
let isJumping = false;
let playerBottom = 100;
let playerLeft = 50;

const gravity = 0.8;
const jumpForce = -15;
const moveSpeed = 5;

// Player movement
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') velocityX = -moveSpeed;
  if (e.key === 'ArrowRight') velocityX = moveSpeed;
  if (e.key === 'ArrowUp' && !isJumping) {
    velocityY = jumpForce;
    isJumping = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') velocityX = 0;
});

// Game loop
function update() {
  // Apply gravity
  velocityY += gravity;
  playerBottom += velocityY;
  playerLeft += velocityX;

  // Keep player in bounds
  if (playerLeft < 0) playerLeft = 0;
  if (playerLeft > window.innerWidth - 40) playerLeft = window.innerWidth - 40;

  // Platform collision
  let onPlatform = false;
  platforms.forEach(platform => {
    const platRect = platform.getBoundingClientRect();
    if (
      playerBottom <= platRect.top &&
      playerBottom + velocityY >= platRect.top &&
      playerLeft + 40 >= platRect.left &&
      playerLeft <= platRect.right
    ) {
      velocityY = 0;
      playerBottom = platRect.top;
      isJumping = false;
      onPlatform = true;
    }
  });

  // Ground collision
  if (playerBottom <= 50) {
    playerBottom = 50;
    velocityY = 0;
    isJumping = false;
    onPlatform = true;
  }

  // Enemy collision
  enemies.forEach(enemy => {
    const enemyRect = enemy.getBoundingClientRect();
    if (
      playerLeft < enemyRect.right &&
      playerLeft + 40 > enemyRect.left &&
      playerBottom < enemyRect.bottom &&
      playerBottom + 40 > enemyRect.top
    ) {
      alert('Game Over!');
      resetGame();
    }
  });

  // Update player position
  player.style.bottom = playerBottom + 'px';
  player.style.left = playerLeft + 'px';

  requestAnimationFrame(update);
}

function resetGame() {
  playerBottom = 100;
  playerLeft = 50;
  velocityX = 0;
  velocityY = 0;
  isJumping = false;
}

// Start the game
update();
