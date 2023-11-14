// JS variables
const boardSize = 4; // Size of the board (4x4)
let tiles = [];
let emptyTile = { row: boardSize - 1, col: boardSize - 1 }; // Initial empty tile position
let moveCounter = 0;
let timerInterval;
let timerSeconds = 0;

//function to create the board
function create_board(number, row, col) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerText = number;
    tile.addEventListener("click", () => onTileClick(row, col));
    return tile;
}

// function to shufffle board
function board_shuffle() {
    tiles = [];
    const numbers = Array.from({ length: boardSize * boardSize - 1 }, (_, i) => i + 1);
    numbers.push(0); // Add the empty tile
    numbers.sort(() => Math.random() - 0.5); //scramble

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const number = numbers[row * boardSize + col];
            tiles.push({ number, row, col });
        }
    }

    board_update();
}


// function to update board
function board_update() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const tile = tiles.find((t) => t.row === row && t.col === col);
            if (tile) {
                const tileElement = create_board(tile.number, row, col);
                board.appendChild(tileElement);
            }
        }
    }
}

// function that responds once user clicks on tile
function onTileClick(row, col) {
    const tile = tiles.find((t) => t.row === row && t.col === col);
    if (!tile) return;

    const adjacentTiles = [
        { row: row - 1, col },
        { row: row + 1, col },
        { row, col: col - 1 },
        { row, col: col + 1 },
    ];

    const adjacentEmptyTile = adjacentTiles.find(
        (at) => at.row === emptyTile.row && at.col === emptyTile.col
    );

    if (adjacentEmptyTile) {
        swapTiles(tile, emptyTile);
        emptyTile = { row, col };
        moveCounter++;
        document.getElementById("move-counter").textContent = moveCounter;
        checkForWin();
    }
}
// swap tile functons
function swapTiles(tile1, tile2) {
    const temp = { ...tile1 };
    tile1.row = tile2.row;
    tile1.col = tile2.col;
    tile2.row = temp.row;
    tile2.col = temp.col;
    tiles = tiles.map((t) =>
        t.row === tile1.row && t.col === tile1.col
            ? { ...tile1 }
            : t.row === tile2.row && t.col === tile2.col
            ? { ...tile2 }
            : t
    );
    board_update();
}

// function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimer();
    }, 1000);
}
// function to stop timer
function stopTimer() {
    clearInterval(timerInterval);
}
// function to update timer
function updateTimer() {
    document.getElementById("timer").textContent = "Time spent in the current game: " + timerSeconds + "";
}

// function to teset game 
function resetGame() {
    moveCounter = 0;
    document.getElementById("move-counter").textContent = moveCounter;
    timerSeconds = 0; // Reset the timer
    updateTimer(); // Update the timer display
    stopTimer(); // stop the timer once user clicks new game or other button
    board_shuffle();
    emptyTile = { row: boardSize - 1, col: boardSize - 1 };
    startTimer(); // Start the timer here
}

// function for user to win
function win() {
    // if loop for the tile game 
    if (
        document.getElementById("cell11").className === "tile1" &&
        document.getElementById("cell12").className === "tile2" &&
        document.getElementById("cell13").className === "tile3" &&
        document.getElementById("cell44").className === "tile16"
    ) {
        // function for winning
        const confirmation = window.confirm(
            "Congratulations!!\nAmount spent on current game in seconds: " +
                timerSeconds +
                "\nNumber of moves so far: " +
                moveCounter +
                "\nWould you like to play again?"
        );
        if (confirmation) {
            window.location.reload(); // Reload page upon confirmation
        }
    }
}

// Function for window initialization for the game when the page loads
window.onload = () => {
    document.getElementById("new-game-button").addEventListener("click", resetGame); // new game using reseet function
    document.getElementById("simple-game-button").addEventListener("click", () => { // simple game 
        resetGame();
        tiles[tiles.length - 2].number = 0;
        tiles[tiles.length - 1].number = 15;
        board_update();
    });
    resetGame(); // reset game function
};
