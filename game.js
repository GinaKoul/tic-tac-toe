const Game = (function(){
    let rows = 3,
    columns = 3,
    totalPlayers = 2,
    gameboard,
    players = [],
    currentPlayer;

    // cache DOM

    // bind events
    PubSub.on('PlayerAdded',setPlayers);
    PubSub.on('GameMove',play);

    _init();

    function _init() {   
        gameboard = []; 
        for(let i = 0; i < rows; i++) {
            gameboard[i] = [];
            for(let j = 0; j < columns; j++) {
                gameboard[i].push(0);
            }
        }
        _render();
    }

    function _render() {
        PubSub.trigger('UpdateBoard',gameboard);
    }

    function setPlayers(gamePlayers) {
        players = gamePlayers;
        if(players.length >= totalPlayers) {
            PubSub.off('PlayerAdded',setPlayers);
            gameRestart();
        }
    }

    function _setCurrentPlayer() {
        currentPlayer = players[0];
        console.log(`It is ${currentPlayer.name}'s turn. Let's play`);
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function gameRestart() {
        _setCurrentPlayer();
        _init();
    }

    function _switchTurn() {
        currentPlayer = currentPlayer === players[0]?players[1]:players[0];
        console.log(currentPlayer);
        console.log(`It is ${currentPlayer.name}'s turn. Let's play`);
    }

    function play([y,x]) {
        if(gameboard[y][x]===0) {
            gameboard[y][x] = getCurrentPlayer().token;
            _render();
            _findWinner()?_declareWinner():_switchTurn();
        } else {
            console.log("This position is occupied. Try again");
        }
    }

    function _findWinner() {
        let testResults,failedResults;

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
    }

    function _declareWinner() {
        console.log(`${getCurrentPlayer().name} is the winner`);
    }

    return {
        getCurrentPlayer: getCurrentPlayer,
        gameRestart: gameRestart,
        play: play
    }
})(document||documentMock);