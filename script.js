const cells = document.querySelectorAll("[data-cell]");
const popup = document.getElementById("popup");
const popupContent = document.getElementById("popupContent");
const popupText = document.getElementById("popupText");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "O";
let isGameOver = false;

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.textContent === "" && !isGameOver) {
            cell.textContent = currentPlayer;
            checkWin();
            currentPlayer = (currentPlayer === "O") ? "X" : "O";
        }
    });
});

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            showPopup(`Player ${cells[a].textContent} wins!`);
            return;
        }
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        showPopup("It's a draw!");
    }
}

function showPopup(message) {
    isGameOver = true;
    popup.style.display = "flex";
    popupText.textContent = message;
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = "";
    });
    currentPlayer = "O";
    isGameOver = false;
    popup.style.display = "none";
}

restartButton.addEventListener("click", restartGame);
