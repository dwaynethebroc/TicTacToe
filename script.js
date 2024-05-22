(function() {
    const Board = {
        // Initalize Board Function
        // Add EventListener for game tiles to select x or O placement
        // Refresh board function 
        // Selected Board Tile must be a new tile, not already X or O
    
        gameboardArray: [],
        index: 0,
    
        //Create initial board
        init: function() {
            for(let i = 1; i <= 3; i++) {
                let a = [];
    
                for(let j = 1; j<= 3; j++) {
                    a.push("-")
                    this.index++;
                }
                this.gameboardArray.push(a);
            }
            console.table(this.gameboardArray);
    
            return this.gameboardArray;
        },
    
        //clear board function
        clear: function() {
    
            while(this.gameboardArray.length > 0){
                this.gameboardArray.pop();
                this.index--;
            }
            
            console.table(this.gameboardArray);
    
            return this.gameboardArray;
        },
    };
    
    const Players = {
        // Select X or O coin flip 

        cachedChoices: null,

        selection: function() {
            const regex = /^[1-2]$/;
            let playerSelection = Number(prompt(`Select heads(1) or tails(2)`)); 
            let result = regex.test(playerSelection);

            while (!result){
                playerSelection = Number(prompt(`Select heads(1) or tails(2)`));
                result = regex.test(playerSelection);
            }
            
            if (regex.test(playerSelection)){
                if (playerSelection === 1) {
                    console.log(`You have selected: Heads`);
                }
                else if (playerSelection === 2) {
                    console.log(`You have selected: Tails`);
                }
            }
            let computerSelection = '';
            let coin = 0; 
            const x = Math.floor(Math.random() * 100) + 1;
    
            if(x >= 51) {
                coin = 'heads';
            }
            else if(x <= 50) {
                coin = 'tails';
            }
    
            if((coin === 'heads' && playerSelection === 1) || (playerSelection === 1 && coin === 'tails')) {
                playerSelection = 'X';
                computerSelection = 'O';
            }
            else if((coin === 'tails' && playerSelection === 2) || (playerSelection === 2 && coin ==='heads')) {
                playerSelection = 'O';
                computerSelection = 'X';
            }
            
            return {playerSelection, computerSelection}; 
        },

        humanComputerChoices: function(){
            // If choices are already cached, return them
            if (this.cachedChoices) {
                return this.cachedChoices;
            }
    
            // Otherwise, compute and cache the choices
            const choices = this.selection();
            this.cachedChoices = choices;
            console.log(choices);
            console.table(Board.gameboardArray);
            return choices;
        },
        // Human Player 
        // Computer
    };
    
    const Game = {
        // Check Win function 
        // Check Tie function 
        // Pick tile function
        // Add name
        // Game Turn function
        // Restart Game function
        // Scoreboard

        gameTurn: function() {
            DOM.updateBoard();
            
            this.pickTileComputer();
            let checkTie = this.checkTie();
            let checkWin = this.checkWin(Board.gameboardArray);

            if (checkTie === false && checkWin === false){
                return true;

            } else if (checkTie === true && checkWin === false) {
                alert(`It's a tie! Nobody wins.`);
                this.restart();
            } else if (checkTie === false && checkWin ===true){
                this.restart();
            }
        },
    
        pickTileHuman: function() {
            //User clicks on a tile on the gameboard
            //go through array until correct sub-array and position are chosen
            //if selected number has already not been chosen, change "-" to Human's choice
            //else run program again until unselected tile has been chosen
            const triggeredDiv = event.target;
            const row = parseInt(triggeredDiv.dataset.row);
            const col = parseInt(triggeredDiv.dataset.col);

            const choices = Players.humanComputerChoices();
            const playerChoice = choices.playerSelection;
            console.log(`Player's Character = ${playerChoice}`);

            if(Board.gameboardArray[row][col] === '-') {
                DOM.changeTileHuman(row, col);
                DOM.updateBoard();

                if (this.checkWin(Board.gameboardArray)) {
                    // alert(`Winner: ${playerChoice}`);
                    this.restart();
                } else if (this.checkTie()) {
                    alert(`It's a tie! Nobody wins.`);
                    this.restart();
                } else {
                    this.gameTurn(); // Let the computer make its move
                }
            }

            else {
                alert(`Selected tile has already been chosen. Choose another.`);
            }

        },

        pickTileComputer: function() {
            //select random number 1-9
            //go through array until correct sub-array and position are chosen
            //if selected number has already not been chosen, change "-" to computer's player
            //else run program again until unselected tile has been chosen
            console.table(Board.gameboardArray);
            let computerTile;
            let counter = 0; 

            do {
               computerTile = Math.floor(Math.random() * 9) + 1;

               // Convert tile number to corresponding row and column positions
                let row = Math.floor((computerTile - 1) / 3);
                let col = (computerTile - 1) % 3;

                if(Board.gameboardArray[row][col] === '-') {
                    // console.log(`Computer's choice: ${computerTile}`);
                    // Board.gameboardArray[row][col] = computerChoice;
                    // console.table(Board.gameboardArray);

                    DOM.changeTileComputer(row, col);
                    break;
                }

                counter++;

                if(counter >= 9){
                    console.log("Board is full. No empty tiles available");
                    break;
                }
            } while(true);

            if (this.checkWin(Board.gameboardArray)) {
                // alert(`Winner: ${computerChoice}`);
                this.restart();
            } else if (this.checkTie()) {
                alert(`It's a tie! Nobody wins.`);
                this.restart();
            }
        },

        checkTie: function() {
            for (let i = 0; i < Board.gameboardArray.length; i++) {
                for(let j = 0; j < Board.gameboardArray[i].length; j++){
                    if (Board.gameboardArray[i][j] === `-`) {
                        return false;
                    }
                }
            }
            return true;
        },

        checkWin: function(board){
            
            //rows
            for(let i = 0; i < 3; i++){
                if(board[i][0] !== '-' && board[i][0] === board[i][1] && board[i][1] === board[i][2]){
                    DOM.updateBoard();
                    alert(`Winner: ${board[i][0]}`);
                    console.log("rowsWin");
                    return true;
                }
            }

            //columns 
            for(let j = 0; j < 3; j++) {
                if(board[0][j] !== '-' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                    DOM.updateBoard();
                    alert(`Winner: ${board[0][j]}`);
                    console.log("colsWin");
                    return true;
                }
            }

            if (board[0][0] !== '-' && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
                    DOM.updateBoard();
                    console.log("diags1Win");
                    alert(`Winner: ${board[0][0]}`);
                    return true;
            }

            if (board[0][2] !== '-' && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
                    DOM.updateBoard();
                    console.log("diags2Win")
                    alert(`Winner: ${board[0][2]}`);
                    return true;
            }

            return false;
        },

        restart: function(){
            let restart = Number(prompt(`Would you like to play again? \n 1: Yes \n 2: No`));
            const regex = /^[1-2]$/;
            let result = regex.test(restart);

            while (!result) {
                restart = Number(prompt(`Would you like to play again? \n 1: Yes \n 2: No`));
                result = regex.test(restart);
            }

            if(restart === 1) {
                alert(`Ok! Game is restarting now!`)

                Board.clear();
                Board.init();
                Players.selection();
                Players.humanComputerChoices();

            } else if (restart === 2){
                alert(`Got it! Thanks for playing!`);
            }
        },
    
    };

    const DOM = {
        display: function() {
            //create display of array 
            let boardDiv = document.getElementById('board');

            for(let i = 0; i < Board.gameboardArray.length; i++){

                let row = document.createElement("div");
                row.classList.add("row");

                for(let j = 0; j < Board.gameboardArray[i].length; j++){
                    let tile = document.createElement("div");
                    tile.classList.add("tile");
                    tile.innerText = `${Board.gameboardArray[i][j]}`;

                    tile.dataset.row = i;
                    tile.dataset.col = j;

                    tile.addEventListener('click', Game.pickTileHuman.bind(Game));
                    
                    row.append(tile);
                }
                
                boardDiv.append(row);
            }
        },

        updateBoard: function() {

            let boardDiv = document.getElementById('board');
            const tiles = boardDiv.getElementsByClassName('tile');

            for (let tile of tiles) {
                let row = tile.dataset.row;
                let col = tile.dataset.col;

                tile.innerText = Board.gameboardArray[row][col];
            }

        },
    
        changeTileHuman: function(row, col) {
            //if player triggers this, change tile to players choice
            //if computer triggers this, change tile to computers choice
            const choices = Players.humanComputerChoices();
            const humanChoice = choices.playerSelection;

            Board.gameboardArray[row][col] = humanChoice;
            DOM.updateBoard();

            console.table(Board.gameboardArray);
            
        },

        changeTileComputer: function(row, col) {
            //if player triggers this, change tile to players choice
            //if computer triggers this, change tile to computers choice
            const choices = Players.humanComputerChoices();
            const computerChoice = choices.computerSelection;

            Board.gameboardArray[row][col] = computerChoice;
            DOM.updateBoard();
            console.table(Board.gameboardArray);
        },
    };

    Board.clear();
    Board.init();
    Players.humanComputerChoices();
    DOM.display();
})()


