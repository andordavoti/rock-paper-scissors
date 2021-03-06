const machinePointsEl = document.getElementById("machinePoints"),
    playerPointsEl = document.getElementById("playerPoints"),
    outputEl = document.getElementById("output"),
    rockImgEl = document.getElementById("rock"),
    scissorsImgEl = document.getElementById("scissors"),
    paperImgEl = document.getElementById("paper"),
    machineImgEl = document.getElementById("machineImg"),
    restartBtn = document.getElementById("restartBtn"),
    winnerPoint = 5;

let activeGame = true,
    machinePoints = 0,
    playerPoints = 0,
    playerStatus = '';

outputEl.innerHTML = 'Choose rock, paper or scissors. First to reach ' + winnerPoint + ' points win.';

restartBtn.onclick = () => {
    activeGame = true;
    machinePoints = 0;
    playerPoints = 0;
    outputEl.innerHTML = "";
    playerPointsEl.innerHTML = 0;
    machinePointsEl.innerHTML = 0;
    restartBtn.style.display = 'none';
    outputEl.innerHTML = 'Choose rock, paper or scissors. First to reach ' + winnerPoint + ' points win.';
    rockImgEl.style.cursor = 'pointer';
    scissorsImgEl.style.cursor = 'pointer';
    paperImgEl.style.cursor = 'pointer';
}

const checkResults = (evt) => {
    if (activeGame) {
        const playersChoice = evt.target.id;
        const machineChoice = machineResult();

        setMachineImg(machineChoice);

        const winner = whoWon(playersChoice, machineChoice);

        if (winner === 'tied') {
            tied();
        }

        if (winner === 'player') {
            playerWon();
        }

        if (winner === 'machine') {
            machineWon();
        }
    }
    else {
        outputEl.innerHTML = "Game over, you " + playerStatus + ' the game.';
    }
}

const machineResult = () => {
    const machineChoiceNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (machineChoiceNum === 1) {
        return 'rock';
    }
    if (machineChoiceNum === 2) {
        return 'scissors';
    }
    if (machineChoiceNum === 3) {
        return 'paper';
    }
}

const whoWon = (playersChoice, machineChoice) => {
    if (playersChoice === machineChoice) {
        return 'tied'
    }
    if (playersChoice === 'rock') {
        if (machineChoice === 'scissors') {
            return 'player'
        }
        if (machineChoice === 'paper') {
            return 'machine'
        }
    }
    if (playersChoice === 'scissors') {
        if (machineChoice === 'paper') {
            return 'player'
        }
        if (machineChoice === 'rock') {
            return 'machine'
        }
    }
    if (playersChoice === 'paper') {
        if (machineChoice === 'rock') {
            return 'player'
        }
        if (machineChoice === 'scissors') {
            return 'machine'
        }
    }
}

const tied = () => {
    outputEl.innerHTML = 'Tied!'
}

const playerWon = () => {
    playerPoints++;
    playerPointsEl.innerHTML = playerPoints;
    outputEl.innerHTML = 'You won!'

    if (playerPoints === winnerPoint) {
        alert('You won the game!');
        activeGame = false;
        playerStatus = 'won';
        outputEl.innerHTML = "Game over, you " + playerStatus + ' the game.';
        restartBtn.style.display = "block";
        rockImgEl.style.cursor = 'not-allowed';
        scissorsImgEl.style.cursor = 'not-allowed';
        paperImgEl.style.cursor = 'not-allowed';
    }
}

const machineWon = () => {
    machinePoints++;
    machinePointsEl.innerHTML = machinePoints;
    outputEl.innerHTML = 'You lost!'

    if (machinePoints === winnerPoint) {
        alert('You lost the game!');
        activeGame = false;
        playerStatus = 'lost';
        outputEl.innerHTML = "Game over, you " + playerStatus + ' the game.';
        restartBtn.style.display = "block";
        rockImgEl.style.cursor = 'not-allowed';
        scissorsImgEl.style.cursor = 'not-allowed';
        paperImgEl.style.cursor = 'not-allowed';
    }
}

const setMachineImg = (choice) => {
    if (choice === 'rock') {
        machineImgEl.src = 'assets/img/computer_rock.png';
        setTimeout(function () { machineImgEl.src = 'assets/img/computer_unknown.png' }, 1200);
    }
    if (choice === 'scissors') {
        machineImgEl.src = 'assets/img/computer_scissors.png';
        setTimeout(function () { machineImgEl.src = 'assets/img/computer_unknown.png' }, 1200);
    }
    if (choice === 'paper') {
        machineImgEl.src = 'assets/img/computer_paper.png';
        setTimeout(function () { machineImgEl.src = 'assets/img/computer_unknown.png' }, 1200);
    }
}

rockImgEl.onclick = checkResults;
scissorsImgEl.onclick = checkResults;
paperImgEl.onclick = checkResults;