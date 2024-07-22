let points = parseInt(localStorage.getItem('points')) || 0;
let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 1000;
let incrementInterval;
let hasStarted = false;
let musicToggleCount = 0;

// Update the displayed points on page load
document.addEventListener('DOMContentLoaded', updatePointsDisplay);

function handleTap(tapCount) {
  if (!hasStarted) {
    startIncrementing();
    hasStarted = true;
  }

  if (totalPoints > 0) {
    points += tapCount;
    totalPoints -= tapCount;
    localStorage.setItem('points', points);
    localStorage.setItem('totalPoints', totalPoints);
    updatePointsDisplay();

    // Play the coin clink sound
    document.getElementById('coin-sound').play();
  } else {
    alert("No more points to gain!");
  }

  // Trigger haptic feedback
  if (navigator.vibrate) {
    navigator.vibrate(50); // Vibrate for 50ms
  }
}

document.getElementById('tapButtonContainer').addEventListener('touchstart', (event) => {
  const tapCount = event.touches.length;
  handleTap(tapCount);
});

function startIncrementing() {
  incrementInterval = setInterval(() => {
    if (totalPoints < 1000) {
      totalPoints++;
      localStorage.setItem('totalPoints', totalPoints);
      updatePointsDisplay();
    }
  }, 1000);
}

function updatePointsDisplay() {
  document.getElementById('points').innerText = `${points}`;
  const energyBar = document.getElementById('energy-bar');
  const percentage = (totalPoints / 1000) * 100;

  // Set the width of the energy bar
  energyBar.style.width = `${percentage}%`;

  // Update the gradient based on the percentage
  if (percentage <= 20) {
    energyBar.style.background = 'red';
  } else if (percentage <= 40) {
    energyBar.style.background = 'linear-gradient(to right, red, orange)';
  } else if (percentage <= 60) {
    energyBar.style.background = 'linear-gradient(to right, red, orange, yellow)';
  } else if (percentage <= 80) {
    energyBar.style.background = 'linear-gradient(to right, red, orange, yellow, green)';
  } else {
    energyBar.style.background = 'green';
  }

  // Add 3D effect with gradient and shadow
  energyBar.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.5), 0 5px 15px rgba(0, 0, 0, 0.3)';
  energyBar.style.borderRadius = '15px 0 0 15px';
}

// Play music button functionality
document.getElementById('play-music-button').addEventListener('click', () => {
  const backgroundMusic = document.getElementById('background-music');
  musicToggleCount++;

  if (musicToggleCount === 2) {
    backgroundMusic.src = "https://www.youtube.com/embed/H_G-kvMxg3Y?autoplay=1";
    musicToggleCount = 0;
  } else if (musicToggleCount === 1) {
    if (backgroundMusic.src.includes('autoplay=1')) {
      backgroundMusic.src = "https://www.youtube.com/embed/H_G-kvMxg3Y?autoplay=0";
    } else {
      backgroundMusic.src = "https://www.youtube.com/embed/H_G-kvMxg3Y?autoplay=1";
    }
  }
});
