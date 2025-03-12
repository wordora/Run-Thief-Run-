const thief = document.getElementById('thief');
const police = document.getElementById('police');
const scoreElement = document.getElementById('score');
let score = 0;
let isJumping = false;

// Jump function
function jump() {
  if (isJumping) return;
  isJumping = true;
  let jumpHeight = 0;
  const upInterval = setInterval(() => {
    if (jumpHeight >= 150) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (jumpHeight <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        jumpHeight -= 10;
        thief.style.bottom = 100 + jumpHeight + 'px';
      }, 20);
    }
    jumpHeight += 10;
    thief.style.bottom = 100 + jumpHeight + 'px';
  }, 20);
}

// Detect collision
function checkCollision() {
  const thiefRect = thief.getBoundingClientRect();
  const policeRect = police.getBoundingClientRect();

  if (
    thiefRect.left < policeRect.right &&
    thiefRect.right > policeRect.left &&
    thiefRect.bottom > policeRect.top
  ) {
    alert('Game Over! Your score: ' + score);
    score = 0;
    scoreElement.textContent = 'Score: ' + score;
    police.style.animation = 'none';
    police.offsetHeight; // Trigger reflow
    police.style.animation = null;
  }
}

// Update score
function updateScore() {
  score++;
  scoreElement.textContent = 'Score: ' + score;
}

// Event listener for jumping
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    jump();
  }
});

// Game loop
setInterval(() => {
  checkCollision();
  updateScore();
}, 100);
