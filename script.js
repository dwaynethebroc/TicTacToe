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
            console.log(this.gameboardArray, this.index);
    
            return this.gameboardArray;
        },
    
        //clear board function
        clear: function() {
    
            while(this.gameboardArray.length > 0){
                this.gameboardArray.pop();
                this.index--;
            }
            
            console.log(this.gameboardArray, this.index);
    
            return this.gameboardArray;
        },
    
        display: function() {
            let boardDiv = document.getElementById('board');
    
            this.gameboardArray.forEach(function(ticTac, index) {
    
                let ticOrTac = ticTac;
    
                let tile = document.createElement("div");
                tile.classList.add("tile");
                tile.innerText = `${ticOrTac}`
    
                tile.addEventListener('click', Board.changeTile)
    
                boardDiv.append(tile);
            })
        },
    
        changeTile: function() {
            if (this.innerText === '-') {
                console.log(playerSelection);
                this.innerText = `${Players.selection.playerSelection}`
            }
        },
    
    };
    
    const Players = {
        // Select X or O coin flip 

        cachedChoices: null,

        selection: function() {
            let playerSelection = Number(prompt(`Select heads(1) or tails(2)`));
            let computerSelection = '';
            let coin = 0; 
            const x = Math.floor(Math.random() * 100) + 1;
    
            if(x >= 51) {
                coin = 'heads';
            }
            else if(x <= 50) {
                coin = 'tails';
            }
    
            console.log(x);
            console.log(coin);
    
    
            if(coin === 'heads' && playerSelection === 1 || coin === 'heads' && playerSelection === 2) {
                playerSelection = 'X';
                computerSelection = 'O';
            }
            else if(coin === 'tails' && playerSelection === 1 || coin === 'tails' && playerSelection === 2) {
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


    
        pickTileHuman: function(){
            //Ask for user input of a tile to choose
            //go through array until correct sub-array and position are chosen
            //if selected number has already not been chosen, change "-" to Human's choice
            //else run program again until unselected tile has been chosen
            const userTile = Number(prompt(`Pick a tile 1-9 that hasn't been chosen yet`));
            let counter = 0;
            const choices = Players.humanComputerChoices();
            const playerChoice = choices.playerSelection;
            console.log(`Player's Character = ${playerChoice}`);
    
            for(let i = 0; i < Board.gameboardArray.length; i++){
                for(let j = 0; j < Board.gameboardArray[i].length; j++){
                    counter++;
                    if (userTile === counter) {
                        // Board.gameboardArray[i][j] = playerChoice;
                        // console.table(Board.gameboardArray);
                        if (Board.gameboardArray[i][j] === "-") {
                            Board.gameboardArray[i][j] = playerChoice;
                            console.table(Board.gameboardArray);
                            //checkTie and checkWin
                            //otherwise make human pick another tile
                            
                        }
                        
                        else if(Board.gameboardArray[i][j] === "X" || "O"){
                            console.log(Board.gameboardArray[i][j]);
                            console.table(Board.gameboardArray);
                        }
                    }
                }
            }
        },

        pickTileComputer: function() {
            //select random number 1-9
            //go through array until correct sub-array and position are chosen
            //if selected number has already not been chosen, change "-" to computer's player
            //else run program again until unselected tile has been chosen
            let computerTile = Math.floor(Math.random() * 9) + 1;
            console.log(`Computer's choice: ${computerTile}`)
            let counter = 0; 
            const choices = Players.humanComputerChoices();
            const computerChoice = choices.computerSelection;
            console.log(`Computer's Character = ${computerChoice}`);
            for(let i = 0; i < Board.gameboardArray.length; i++){
                for(let j = 0; j < Board.gameboardArray[i].length; j++){
                    counter++;
                    if (computerTile === counter) {
                        if (Board.gameboardArray[i][j] === "-") {
                            Board.gameboardArray[i][j] = computerChoice;
                            console.table(Board.gameboardArray);
                            //checkTie and checkWin
                            //otherwise make human pick another tile
                        }
                        
                        else if(Board.gameboardArray[i][j] === "X" || "O"){
                            console.log(Board.gameboardArray[i][j]);
                            console.table(Board.gameboardArray);
                            Game.pickTileComputer();
                        }
                        
                    }
                }
            }
        },

        checkTie: function(){
            for(let i = 0; i < Board.gameboardArray.length; i++){
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
                    return alert(`Winner: ${board[i][0]}`);
                }
            }

            //columns 
            for(let j = 0; j < 3; j++) {
                if(board[0][j] !== '-' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                    return alert(`Winner: ${board[0][j]}`);
                }
            }

            if (board[0][0] !== '-' && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
                return alert(`Winner: ${board[0][0]}`);
            }

            if (board[0][2] !== '-' && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
                return alert(`Winner: ${board[0][2]}`);
            }

            return false;
        },
    
    };

    Board.init();
    Players.humanComputerChoices();
    Game.pickTileHuman();
    Game.pickTileComputer();
}) ()


