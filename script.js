const Gameboard = (function(){
    let rows = 3;
    let columns = 3;
    let gameboard = [];
    let players = [];
    let playerCount = 0;
    let currentPlayer;

    for(let i = 0; i < rows; i++) {
        gameboard[i] = [];
        for(let j = 0; j < columns; j++) {
            gameboard[i].push(0);
        }
    }

    // cache DOM

    // bind events

    _render();

    function _render() {
        console.log(gameboard);
    }

    function addPlayer(name) {
        playerCount ++;
        players.push({name:name,token:playerCount});
    }

    function getPlayers() {
        return players;
    }

    function setCurrentPlayer() {
        currentPlayer = players[0];
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function _switchTurn() {
        currentPlayer = currentPlayer === players[0]?players[1]:players[0];
        console.log(currentPlayer);
        console.log(`It is ${currentPlayer.name}'s turn. Let's play`);
    }

    function play(y,x) {
        if(gameboard[y][x]===0) {
            gameboard[y][x] = getCurrentPlayer().token;
            _render();
            _switchTurn();
        }else {
            console.log("This position is occupied. Try again");
        }
    }

    return {
        addPlayer: addPlayer,
        getPlayers: getPlayers,
        setCurrentPlayer: setCurrentPlayer,
        getCurrentPlayer: getCurrentPlayer,
        play: play
    }
})(document);

Gameboard.addPlayer('Player1');
Gameboard.addPlayer('Player2');
Gameboard.setCurrentPlayer();
Gameboard.play(1,2);