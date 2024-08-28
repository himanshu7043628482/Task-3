document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const turnBox1 = document.querySelector('.turn-box1');
    const turnBox2 = document.querySelector('.turn-box2');
    let currentPlayer = 'X';
    const boardState = Array(9).fill(null);

    const handleClick = (e) => {
        const index = e.target.dataset.index;
        if (!boardState[index]) {
            boardState[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            if (checkWin()) {
                alert(`${currentPlayer} wins!`);
                resetBoard();
            } else if (boardState.every(cell => cell)) {
                alert("It's a draw!");
                resetBoard();
            } else {
                currentPlayer = currentPlayer === 'X' ? '0' : 'X';
                updateTurnDisplay();
            }
        }
    };

    const updateTurnDisplay = () => {
        turnBox1.style.backgroundColor = currentPlayer === '0' ? '#50566D' : '#3A3F4B';
        turnBox2.style.backgroundColor = currentPlayer === 'X' ? '#50566D' : '#3A3F4B';
    };

    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    };

    const resetBoard = () => {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        updateTurnDisplay();
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    updateTurnDisplay();
});
