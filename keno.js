document.addEventListener("DOMContentLoaded", function() {
    const MAX_SELECTED_NUMBERS = 15; // Maximum number of selected numbers
    const PRIZE_PER_HIT = 10; // Prize per hit
    let balance = 1000; // Initial balance

    const selectedNumbers = []; // Array to store selected numbers

    // Function to toggle selected numbers
    function toggleNumber() {
        const number = this.textContent;
        if (selectedNumbers.includes(number)) {
            const index = selectedNumbers.indexOf(number);
            selectedNumbers.splice(index, 1);
            this.classList.remove('selected');
        } else {
            if (selectedNumbers.length < MAX_SELECTED_NUMBERS) {
                selectedNumbers.push(number);
                this.classList.add('selected');
            } else {
                alert(`You can only select up to ${MAX_SELECTED_NUMBERS} numbers.`);
            }
        }
        updateSelectedNumbersDisplay(); // Update selected numbers display
    }

    // Function to update selected numbers display
    function updateSelectedNumbersDisplay() {
        const selectedNumbersDisplay = document.querySelector('.selectedNumbersDisplay');
        selectedNumbersDisplay.textContent = `Selected Numbers: ${selectedNumbers.join(', ')}`;
    }

    // Function to handle quick pick
    function quickPick() {
        const quickNumbers = [];
        while (quickNumbers.length < MAX_SELECTED_NUMBERS) {
            const randomNumber = Math.floor(Math.random() * 80) + 1;
            if (!quickNumbers.includes(randomNumber)) {
                quickNumbers.push(randomNumber);
            }
        }
        selectedNumbers.length = 0;
        quickNumbers.forEach(number => {
            const button = document.querySelector(`.numTable .item${number}`);
            button.classList.add('system-selected'); // Apply different class for system-selected numbers
            selectedNumbers.push(button.textContent);
        });
        updateSelectedNumbersDisplay(); // Update selected numbers display
    }

    // Define prizes for each hit
const hitPrizes = {
    0: 10,
    1: 15,
    2: 20,
    3: 35,
    4: 40,
    5: 50,
    6: 100,
    7: 200,
    8: 500,
    9: 1000,
    10: 10000,
    11: 30000,
    12: 100000,
    13: 500000,
    14: 1000000,
    15: 5000000
};

// Function to play Keno
function playKeno() {
    // Generate random winning numbers (let's say 15 numbers for Keno)
    const winningNumbers = generateRandomNumbers(15);

    // Compare selected numbers with winning numbers
    let hits = 0;
    selectedNumbers.forEach(selectedNumber => {
        if (winningNumbers.includes(parseInt(selectedNumber))) {
            hits++;
        }
    });

    // Display hits and winnings
    const hitsDisplay = document.querySelector('.count1');
    const prizeDisplay = document.querySelector('.count2');
    hitsDisplay.textContent = `HITS: ${hits}`;
    const prize = hitPrizes[hits];
    prizeDisplay.textContent = `PRIZE: $${prize}`;

    // Update balance
    balance -= prize;
    const balanceDisplay = document.querySelector('.balance');
    balanceDisplay.textContent = `Balance: $${balance}`;

    // Show winning numbers
    const winningNumbersDisplay = document.querySelector('.winningNumbersDisplay');
    winningNumbersDisplay.textContent = `Winning Numbers: ${winningNumbers.join(', ')}`;

    // Reset selected numbers and remove the 'selected' class
    selectedNumbers.length = 0;
    const numberButtons = document.querySelectorAll('.numTable button');
    numberButtons.forEach(button => {
        button.classList.remove('selected');
    });
    updateSelectedNumbersDisplay(); // Update selected numbers display
}



    // Function to generate random numbers
    function generateRandomNumbers(count) {
        const numbers = [];
        while (numbers.length < count) {
            const randomNumber = Math.floor(Math.random() * 80) + 1; // Assuming Keno numbers are from 1 to 80
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
        return numbers;
    }

    // Function to clear selected numbers
    function clearSelection() {
        // Reset selected numbers and remove the 'selected' class
        selectedNumbers.length = 0;
        const numberButtons = document.querySelectorAll('.numTable button');
        numberButtons.forEach(button => {
            button.classList.remove('selected');
        });
    
        // Reset hits display
        const hitsDisplay = document.querySelector('.count1');
        hitsDisplay.textContent = `HITS: 0`;
    
        // Reset prize display
        const prizeDisplay = document.querySelector('.count2');
        prizeDisplay.textContent = `PRIZE: $0`;
    
        // Reset winning numbers display
        const winningNumbersDisplay = document.querySelector('.winningNumbersDisplay');
        winningNumbersDisplay.textContent = `Winning Numbers:`;
    
        // Reset balance
        balance = 1000;
        const balanceDisplay = document.querySelector('.balance');
        balanceDisplay.textContent = `Balance: $${balance}`;
    
        // Remove 'system-selected' class from buttons
        numberButtons.forEach(button => {
            button.classList.remove('system-selected');
        });
    
        // Update selected numbers display
        updateSelectedNumbersDisplay();
    }

    // Function to handle autoplay
    function autoplay() {
        // Implement autoplay logic here
        alert('Autoplay feature is not implemented yet.');
    }

    // Function to handle repeat
    function repeat() {
        // Implement repeat logic here
        alert('Repeat feature is not implemented yet.');
    }

    // Add event listeners to number buttons
    const numberButtons = document.querySelectorAll('.numTable button');
    numberButtons.forEach(button => {
        button.addEventListener('click', toggleNumber);
    });

    // Add event listeners to quick pick buttons
    const quickPickButtons = document.querySelectorAll('.quickpick button');
    quickPickButtons.forEach(button => {
        button.addEventListener('click', quickPick);
    });

    // Add event listener to the play button
    const playButton = document.querySelector('.option2');
    playButton.addEventListener('click', playKeno);

    // Add event listener to the clear button
    const clearButton = document.querySelector('.option1');
    clearButton.addEventListener('click', clearSelection);

    // Add event listener to the autoplay button
    const autoplayButton = document.querySelector('.option4');
    autoplayButton.addEventListener('click', autoplay);

    // Add event listener to the repeat button
    const repeatButton = document.querySelector('.option3');
    repeatButton.addEventListener('click', repeat);

    // Initialize selected numbers display
    updateSelectedNumbersDisplay();
});
