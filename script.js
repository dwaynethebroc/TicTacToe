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
    
        cachedChoices: null,

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
        // Restart Game function
        // Scoreboard
    
        pickTileHuman: function(){
            const userTile = Number(prompt(`Pick a tile 1-9 that hasn't been chosen yet`));
            let counter = 0;
            const choices = Players.humanComputerChoices();
            const playerChoice = choices.playerSelection;
            const computerChoice = choices.computerSelection;
            console.log(`Player's Character = ${playerChoice}`);
            console.log(`Computer's Character = ${computerChoice}`);
    
            for(let i = 0; i < Board.gameboardArray.length; i++){
                for(let j = 0; j < Board.gameboardArray[i].length; j++){
                    counter++;
                    if (userTile === counter) {
                        Board.gameboardArray[i][j] = playerChoice;
                        console.table(Board.gameboardArray);
                    }
                }
            }

            Game.pickTileComputer();
        }

        pickTileComputer: function(){
            
        }
    
    };

    Board.init();
    Players.humanComputerChoices();
    Game.pickTileHuman();
}) ()


