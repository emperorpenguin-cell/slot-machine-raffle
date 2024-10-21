let raffleEntries = [];

// Function to get raffle entries from textarea input
document.getElementById('submitEntries').addEventListener('click', () => {
    const entriesText = document.getElementById('raffleEntries').value.trim();
    
    // Split input by spaces and clean up spaces
    raffleEntries = entriesText.split(/\s+/).map(entry => entry.trim()).filter(entry => entry !== '');
    
    // Ensure all raffle entries are at most 14 characters
    raffleEntries = raffleEntries.map(entry => entry.substring(0, 14));
    
    if (raffleEntries.length > 0) {
        // Enable the spin button if entries are valid
        document.getElementById('spinButton').disabled = false;
        document.getElementById('result').innerText = 'Entries submitted! Press Spin to get the winner.';
    } else {
        document.getElementById('result').innerText = 'Please enter valid raffle entries.';
        document.getElementById('spinButton').disabled = true;
    }
});

// Function to randomly pick a number from the raffle entries
function getRandomEntry() {
    return raffleEntries[Math.floor(Math.random() * raffleEntries.length)];
}

// Function to simulate the reel spin
function spinReel(reel) {
    const totalSpins = 300;  // Increased to make spin last approximately 45 seconds (with 100ms intervals)
    let currentSpin = 0;
    let spinInterval;

    return new Promise((resolve) => {
        spinInterval = setInterval(() => {
            reel.innerText = getRandomEntry();  // Show random raffle entry
            currentSpin++;
            if (currentSpin >= totalSpins) {
                clearInterval(spinInterval);
                resolve(reel.innerText);  // Return the final value (winner)
            }
        }, 100);  // Speed of spins (100ms per spin)
    });
}

// Main spin button event
document.getElementById('spinButton').addEventListener('click', async () => {
    const reel = document.getElementById('reel');
    const music = document.getElementById('backgroundMusic');

    // Start the background music
    music.play();

    // Spin the reel and wait for it to stop
    const winningNumber = await spinReel(reel);
    
    // Stop the music after spinning
    music.pause();
    music.currentTime = 0;  // Reset music to the beginning

    // Display the winning number
    document.getElementById('result').innerText = `🎉 Winner! Raffle Number: ${winningNumber}`;
});
