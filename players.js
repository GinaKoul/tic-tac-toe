const Players = (function(doc){
    let players = [];

    // cache DOM
    let buttons = doc.querySelectorAll('button');
    let playerDialog1 = doc.querySelector('#addPlayer1');
    let playerDialog2 = doc.querySelector('#addPlayer2');

    // bind events
    buttons.forEach(btn => btn.addEventListener('click',_addPlayer));
    // open player1 dialog
    playerDialog1.showModal();
    // open player2 dialog after first dialog is closed
    playerDialog1.addEventListener("close", ()=> playerDialog2.showModal());
    

    function _addPlayer(value) {
        event.preventDefault();
        let playerNumber = players.length + 1;
        players.push({name:typeof value === "string"?value:this.closest('dialog').querySelector('input').value,token:playerNumber});
        this.removeEventListener('click',_addPlayer);
        this.closest('dialog').close();
        PubSub.trigger('PlayerAdded',players);
    }
})(document||documentMock);