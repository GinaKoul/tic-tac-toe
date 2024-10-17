const Board = (function(doc) {

    // cache DOM
    let gameBoard = doc.querySelector('#gameBoard');
    let gameState = doc.querySelector('#gameState');
    let restartButton = doc.querySelector('#restartGame');
    // bind events
    PubSub.on('UpdateBoard',displayBoard);
    PubSub.on('UpdateState',gameUpdateState);
    restartButton.addEventListener('click',_gameRestart);

    function displayBoard(board) {
        while (gameBoard.firstChild) {  
            gameBoard.firstChild.remove(); 
        }
        board.forEach((row,index)=>{
            let boardRow = doc.createElement('div');
            let rowIndex = index;
            boardRow.classList.add('row');
            row.forEach((cell,index)=>{
                let boardCell = doc.createElement('div');
                boardCell.classList.add('cell');
                boardCell.setAttribute('data-token',cell);
                boardCell.setAttribute('data-row',rowIndex);
                boardCell.setAttribute('data-col',index);
                // if(cell==0) {
                    boardCell.addEventListener('click',playerMove)
                // }
                boardRow.appendChild(boardCell);
            })
            gameBoard.appendChild(boardRow);
        })
    }

    function gameUpdateState(message) {
        gameState.textContent = message;
    }

    function playerMove(event) {
        PubSub.trigger('GameMove',[this.getAttribute('data-row'),this.getAttribute('data-col')]);
    }

    function _gameRestart() {
        PubSub.trigger('RestartGame');
    }
})(document||documentMock);