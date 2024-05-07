const Board = {
    // Initalize Board Function
    // Add EventListener for game tiles to select x or O placement
    // Refresh board function 
    // Selected Board Tile must be a new tile, not already X or O

    gameboardArray: [],
    index: 0,

    init: function() {
        for(let i = 1; i <= 9; i++) {
            this.gameboardArray.push("-")
            this.index++;
        }
        console.log(this.gameboardArray, this.index);

        return this.gameboardArray;
    },

    clear: function() {

        //clear board
        while(this.gameboardArray.length > 0){
            this.gameboardArray.pop();
            this.index--;
        }
        
        console.log(this.gameboardArray, this.index);

        return this.gameboardArray;
    },


};

const Players = {
    // Select X or O coin flip 
    // Human Player 
    // Computer
};

const Game = {
    // Check Win function 
    // Check Tie function 
    // Add name
    // Restart Game function
    // Scoreboard



};

Board.init();
Board.clear();