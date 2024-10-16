const Board = (function(doc) {

    // cache DOM
    let gameBoard = doc.querySelector('#gameBoard');
    // bind events
    PubSub.on('UpdateBoard',displayBoard);

    function displayBoard(board) {
        console.log("hi");
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
                boardRow.setAttribute('data-row',rowIndex);
                boardCell.setAttribute('data-col',index);
                if(cell==0) {
                    boardCell.addEventListener('click',playerMove)
                }
                boardRow.appendChild(boardCell);
            })
            gameBoard.appendChild(boardRow);
        })
    }

    function playerMove(event) {
        console.log("hi");
        // TODO problem here
        PubSub.trigger('GameMove',[this.getAttribute('data-row'),this.getAttribute('data-column')]);
    }
})(document||documentMock);