const Players = (function(doc){
    let players = [];

    // cache DOM
    let buttons = doc.querySelectorAll('dialog button');
    let playerDialog1 = doc.querySelector('#addPlayer1');
    let playerDialog2 = doc.querySelector('#addPlayer2');
    let playersPane = doc.querySelector('#playersInfo');

    // bind events
    buttons.forEach(btn => btn.addEventListener('click',_addPlayer));
    // open player1 dialog
    playerDialog1?.showModal();
    // open player2 dialog after first dialog is closed
    playerDialog1?.addEventListener("close", ()=> playerDialog2.showModal());
    PubSub.on('DisplayPlayers',displayPlayers);
    

    function _addPlayer(value) {
        event.preventDefault();
        let playerNumber = players.length + 1;
        players.push({name:typeof value === "string"?value:this.closest('dialog').querySelector('input').value,token:playerNumber});
        this.removeEventListener('click',_addPlayer);
        this.closest('dialog').close();
        PubSub.trigger('PlayerAdded',players);
    }

    function createPlayerInfo(player) {
        let playerInfo = doc.createElement('div');
        let playerTitle = doc.createElement('h2');
        let nameRow = doc.createElement('div');
        let playerNameTitle = doc.createElement('h3');
        let playerName = doc.createElement('p');
        let markRow = doc.createElement('div');
        let playerMarkTitle = doc.createElement('h3');
        let playerMark = doc.createElement('span');
        playerTitle.textContent = `Player ${player.token}`;
        nameRow.classList.add('row');
        playerNameTitle.textContent  = 'Player Name:';
        playerName.textContent  = `${player.name}`;
        markRow.classList.add('row');
        playerMarkTitle.textContent  = 'Player Mark:';
        playerMark.classList.add('mark');
        playerMark.setAttribute('data-token',player.token);
        nameRow.append(playerNameTitle,playerName);
        markRow.append(playerMarkTitle,playerMark);
        playerInfo.append(playerTitle,nameRow,markRow);
        return playerInfo;
    }

    function displayPlayers() {
        let playersInfo = players.map((player)=> createPlayerInfo(player));
        playersInfo.forEach((playerInfo)=>{
            playersPane.appendChild(playerInfo);
        });
    }
})(document||documentMock);