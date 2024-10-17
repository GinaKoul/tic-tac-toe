const Game = (function(){
    let rows = 3,
    columns = 3,
    totalPlayers = 2,
    gameboard,
    players = [],
    currentPlayer;


    _init();

    function _init() {   
        gameboard = []; 
        for(let i = 0; i < rows; i++) {
            gameboard[i] = [];
            for(let j = 0; j < columns; j++) {
                gameboard[i].push(0);
            }
        }
        _bindEvents();
        _render();
    }

    function _bindEvents() {
        PubSub.off('PlayerAdded',setPlayers);
        PubSub.off('GameMove',play);
        PubSub.on('PlayerAdded',setPlayers);
        PubSub.on('GameMove',play);
        PubSub.on('RestartGame',gameRestart);
    }

    function _render() {
        PubSub.trigger('UpdateBoard',gameboard);
    }

    function setPlayers(gamePlayers) {
        players = gamePlayers;
        if(players.length >= totalPlayers) {
            PubSub.off('PlayerAdded',setPlayers);
            PubSub.trigger('DisplayPlayers');
            gameRestart();
        }
    }

    function _setCurrentPlayer() {
        currentPlayer = players[0];
        _gameMessage(`It is ${currentPlayer.name}'s turn. Let's play`);
    }

    function _getCurrentPlayer() {
        return currentPlayer;
    }

    function gameRestart() {
        _setCurrentPlayer();
        _init();
    }

    function _switchTurn() {
        currentPlayer = currentPlayer === players[0]?players[1]:players[0];
        _gameMessage(`It is ${currentPlayer.name}'s turn. Let's play`);
    }

    function _declareWinner() {
        PubSub.off('GameMove',play);
        _gameMessage(`${_getCurrentPlayer().name} is the winner`);
    }

    function _gameOver() {
        PubSub.off('GameMove',play);
        _gameMessage('The game is over. No one wins');
    }

    function play([y,x]) {
        if(gameboard[y][x]===0) {
            gameboard[y][x] = _getCurrentPlayer().token;
            _render();
            _findWinner()?_declareWinner():null;
        } else {
            _gameMessage('This position is occupied. Try again');
        }
    }

    function _gameMessage(message) {
        PubSub.trigger('UpdateState',message);
    }

    function _findWinner() {
        let testResults,failedResults,gameOver = true;

        // Test horizontal lines
        for(let i = 0; i < rows; i++) {
            testResults = gameboard[i].map((token,index) => index !== 0?token === gameboard[i][index - 1] && token !== 0:token !== 0);
            failedResults = testResults.filter((result) => result === false);
            if(failedResults.length === 0) return true;
        }

        // Test vertical lines
        for(let j = 0; j < columns; j++) {
            testResults = [];
            for(let i = 0; i < rows; i++) {
                testResults.push(i!==0?gameboard[i][j] === gameboard[i - 1][j]:gameboard[i][j] !== 0);
                if(gameboard[i][j] === 0) gameOver = false;
            }
            failedResults = testResults.filter((result) => result === false);
            if(failedResults.length === 0) return true;
        }

        // Test diagonal line top left to bottom right
        testResults = [];
        for(let z = 0; z < rows; z++) {
            testResults.push(z!==0?gameboard[z][z] === gameboard[z - 1][z - 1]:gameboard[z][z] !== 0);
        }
        failedResults = testResults.filter((result) => result === false);
        if(failedResults.length === 0) return true;

        // Test diagonal line top right to bottom left
        testResults = [];
        for(let i = 0,j = columns -1; i < rows, j >= 0; i++, j--) {
            testResults.push(i!==0?gameboard[i][j] === gameboard[i - 1][j + 1]:gameboard[i][j] !== 0);
        }
        failedResults = testResults.filter((result) => result === false);
        if(failedResults.length === 0) return true;

        // Test if game is over
        gameOver?_gameOver():_switchTurn();
    }
})(document||documentMock);