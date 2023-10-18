
const playerConfigOverlayElement = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');

const editPlayer1BtnElement = document.getElementById('edit-player1-btn');
const editPlayer2BtnElement = document.getElementById('edit-player2-btn');
const cancelConfigBtnElement = document.getElementById("cancel-edit-btn");

const formElement = document.querySelector('form');
const errorsOutputElement = document.getElementById('config-error');
let editedPlayer;
const players = [
    {
        name:'',
        symbol: 'X'
    },
    {
        name:'',
        symbol: 'O'
    }
];
const startNewGameBtnElement = document.getElementById('start-game-btn');
const gameAreaElement = document.getElementById('active-game');
const gameFieldElements = document.querySelectorAll('#game-board li');
let activePlayer = 0;
const activePlayernameElement = document.getElementById('active-playername');

const gameData = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];
let isGameOver = false;
let currentRound = 0;
const gameOverElement = document.getElementById('game-over');
startNewGameBtnElement.addEventListener('click', startNewGame);

for(const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener('click', selectGameField);
}



editPlayer1BtnElement.addEventListener('click', openPlayerConfig);
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);

cancelConfigBtnElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit',savePlayerConfig);
