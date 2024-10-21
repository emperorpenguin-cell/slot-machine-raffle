// Selecting DOM elements
const spinButton = document.getElementById('spinButton');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const celebration = document.getElementById('celebration');
const entriesInput = document.getElementById('entries');
let interval;

// Adding sound effects for spin and win
const spinSound = new Audio('spin-sound.mp3');
const winSound = new Audio('win-sound.mp3');

// Start slot spin on button click
spinButton.addEventListener('click', function() {
  let entries = entriesInput.value.split(" ");
  if (entries.length === 0 || entries[0] === "") {
    alert("Please enter some raffle entries.");
    return;
  }

  // Start spinning sound
  spinSound.play();

  // Activate slot animation
  slot1.classList.add('active');
  slot2.classList.add('active');
  slot3.classList.add('active');

  // Set intervals to change slot text rapidly
  interval = setInterval(() => {
    let randomIndex1 = Math.floor(Math.random() * entries.length);
    let randomIndex2 = Math.floor(Math.random() * entries.length);
    let randomIndex3 = Math.floor(Math.random() * entries.length);
    slot1.innerText = entries[randomIndex1];
    slot2.innerText = entries[randomIndex2];
    slot3.innerText = entries[randomIndex3];
  }, 100);

  // Stop after 30 seconds and pick the final winner
  setTimeout(() => {
    clearInterval(interval);

    // Stop slot animation
    slot1.classList.remove('active');
    slot2.classList.remove('active');
    slot3.classList.remove('active');

    // Select a final winner
    let winnerIndex = Math.floor(Math.random() * entries.length);
    slot1.innerText = entries[winnerIndex];
    slot2.innerText = entries[winnerIndex];
    slot3.innerText = entries[winnerIndex];

    // Play win sound and show celebration
    spinSound.pause();
    winSound.play();
    celebration.style.display = 'block';
    setTimeout(() => {
      celebration.style.display = 'none';
    }, 5000);  // Celebration lasts for 5 seconds
  }, 30000);  // 30 seconds
});
