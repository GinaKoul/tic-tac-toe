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
        console.log(players);
        return players;
    }

    function setCurrentPlayer() {
        currentPlayer = players[0];
    }

    function getCurrentPlayer() {
        console.log(currentPlayer);
        return currentPlayer;
    }

    function _switchTurn() {
        currentPlayer = currentPlayer === players[0]?players[1]:players[0];
    }

    return {
        addPlayer: addPlayer,
        getPlayers: getPlayers,
        setCurrentPlayer: setCurrentPlayer,
        getCurrentPlayer: getCurrentPlayer
    
    }
})(document);

Gameboard.addPlayer('Player1');
Gameboard.addPlayer('Player2');
Gameboard.getPlayers();
Gameboard.setCurrentPlayer();
Gameboard.getCurrentPlayer();