function resetGameStatus() {
    activePlayer = 0;
    currentRound = 0;
    isGameOver = false;
    gameOverElement.firstElementChild.innerHTML = "You won, <span id='winner'>Player Name</span>!";
    gameOverElement.style.display = 'none';
    let gameBoardIndex = 0;
    for(let i = 0; i< 3; i++) {
        for(let j = 0; j<3; j++) {
            gameData[i][j] = 0;
            const gameBoardItem = gameFieldElements[gameBoardIndex]
            gameBoardItem.textContent = "";
            gameBoardItem.classList.remove('disabled');
            gameBoardItem.classList.remove('win');
            gameBoardIndex++;
        }
    }

}
function startNewGame() {
    if(!players[0].name || !players[1].name) {
        alert('Please set name for both players!');
        return;
    }
    resetGameStatus();
    gameAreaElement.style.display = 'block';
    activePlayernameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    currentRound++;
    if(isGameOver) {
        alert('Game is over! Please restart the game');
        return;
    }
    if(event.target.classList.contains('disabled')) {
        alert('Please select a valid space!');
        return;
    }
    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');
    const selectedFeild = event.target;
    const selectedColumn = selectedFeild.dataset.col - 1;
    const selectedRow = selectedFeild.dataset.row - 1;
    gameData[selectedRow][selectedColumn] = activePlayer+1;

    const winnerId = checkGameOver();
    if (winnerId != 0) {
        isGameOver = true;
        endGame(winnerId);
    }
    activePlayer = (activePlayer+1)%2;
    activePlayernameElement.textContent = players[activePlayer].name;
}

function checkGameOver() {
    // checking for rows
    for(let i=0; i<3; i++) {
        if(gameData[i][0]>0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]){
            for(let k = (i*3); k<(i*3)+3; k++)
            {
                gameFieldElements[k].classList.add('win');
            }
            return gameData[i][0];
        }
    }
    // checking for columns
    for(let j=0; j<3; j++) {
        if(gameData[0][j]>0 && gameData[0][j] === gameData[1][j] && gameData[1][j] === gameData[2][j]){
            for(let k = j; k<=6+j; k+=3)
            {
                gameFieldElements[k].classList.add('win');
            }
            return gameData[0][j];
        }
    }

// check for diagonal
    if(gameData[0][0]>0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]){
        for(let k = 0; k<9; k+=4)
            {
                gameFieldElements[k].classList.add('win');
            }
        return gameData[0][0];
    }
    if(gameData[0][2]>0 && gameData[0][2] === gameData[1][1] && gameData[1][1] === gameData[2][0]){
        for(let k = 2; k<=6; k+=2)
            {
                gameFieldElements[k].classList.add('win');
            }
        return gameData[0][2];
    }
    if(currentRound === 9) {
        return -1;
    }
    console.log("Inside checkGameOver");
    return 0;
}

function endGame(winnerId) {
    gameOverElement.style.display = 'block';
    console.log(currentRound);
    if(winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOverElement.firstElementChild.textContent = "It's a Draw!";
    }
    
}