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
            const regex = /^[1-2]$/;
            let playerSelection = Number(prompt(`Select heads(1) or tails(2)`)); 

            while (regex.test(!playerSelection)){
                playerSelection = Number(prompt(`Select heads(1) or tails(2)`));
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
    
            console.log(coin);
    
    
            if(coin === 'heads' && playerSelection === 1 || playerSelection === 2 && coin === 'tails') {
                playerSelection = 'X';
                computerSelection = 'O';
            }
            else if(coin === 'tails' && playerSelection === 2 || playerSelection === 1 && coin ==='heads') {
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
            this.pickTileHuman();
            this.pickTileComputer();
            let checkTie = this.checkTie();
            let checkWin = this.checkWin(Board.gameboardArray);

            if (checkTie === false && checkWin === false){
                this.gameTurn();
            } else if (checkTie === true && checkWin === false) {
                alert(`It's a tie! Nobody wins. Game will restart now`);
                Board.clear();
                Board.init();
                Players.selection();
                Players.humanComputerChoices();
                Game.gameTurn();
            }

        },
    
        pickTileHuman: function() {
            //Ask for user input of a tile to choose
            //go through array until correct sub-array and position are chosen
            //if selected number has already not been chosen, change "-" to Human's choice
            //else run program again until unselected tile has been chosen
            console.table(Board.gameboardArray);
            let userTile = Number(prompt(`Pick a tile 1-9 that hasn't been chosen yet`));
            const regex = /^[0-9]+$/;

            while(regex.test(!userTile) || userTile < 1 || userTile > 9){
                userTile = Number(prompt(`Pick a tile 1-9 that hasn't been chosen yet`));
            }
            if (regex.test(userTile)){
                console.log(userTile);
            }
            
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
                            alert(`Selected tile has already been chosen. Choose another.`)
                            console.table(Board.gameboardArray);
                            this.pickTileHuman();
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
            console.table(Board.gameboardArray);
            let computerTile;
            let counter = 0; 

            do {
               computerTile = Math.floor(Math.random() * 9) + 1;

               // Convert tile number to corresponding row and column positions
                let row = Math.floor((computerTile - 1) / 3);
                let col = (computerTile - 1) % 3;

                if(Board.gameboardArray[row][col] === '-') {
                    const choices = Players.humanComputerChoices();
                    const computerChoice = choices.computerSelection;
                    console.log(`Computer's choice: ${computerTile}`)
                    Board.gameboardArray[row][col] = computerChoice;
                    console.table(Board.gameboardArray);
                    break;
                }

                counter++;

                if(counter >= 9){
                    console.log("Board is full. No empty tiles available");
                    break;
                }
            } while(true);
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

    Board.clear();
    Board.init();
    Players.humanComputerChoices();
    Game.gameTurn();
})()


