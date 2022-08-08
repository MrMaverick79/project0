console.log('Mic check');
//create game
const game = {

    gameActive:  false, //this can be used to start / end the game
    turnCount: 0,
    isPlayerXTurn: false,
    playerWins: 0,
    computerWins: 0,
    //create a 3 by 3 grid
    //see page 164 of JGD for multidimensional arrays
    gameBoard: { //start with null?
        // row1: [null, null, null],
        // row2: [null, null, null],
        // row3: [null, null, null],
        '0': [null, null, null],
        '1': [null, null, null],
        '2': [null, null , null],
    },

    displayBoard : function() { //for testing
        console.log(this.gameBoard);
    }, 

    getValue: function (row, index) {
        return this.gameBoard[row][index];
    },
   
    placeMove : function(player, row, position) { //returns true or false if move was successful
        if(!game.gameBoard[row][position]){ //should check if there is something in the position
            this.gameBoard[row][position] = player; //places move
            return true; //lets us know whether we can go ahead and make the move
        }
        else {
            return false;
        }
        //check victory conditions
    }, //end placeMove

    checkVictory: function() { //checks all possible victory conditions 
        let nullCount= 0;
        let s = new Set() //This set is reused to see if the contents of the different interations are the same. A set with a length === 1 means the palyer has won.
         //condition 1: if an entire row is the same
        for (keys in this.gameBoard){
            console.log(keys);
            for (let i = 0; i< Object.keys(this.gameBoard).length; i++) { //this iterates over a row
                const element = this.gameBoard[keys][i]; //each element is an entry in one of the rows
                
                if (element === null) {//to avoid null being determined as a win
                    s.add(nullCount);
                    nullCount++;
                }//end if 
                else {
                    s.add(element);
                }
            } //end for
            if(s.size === 1){ //determine whether there is  row victory
                console.log(s);
                
                console.log('Row Win!');
                return true
            }//end if
            s.clear()
        }// end for keys 

        //condition 2: if an entire column is the same
        s.clear();
        for (let i = 0; i < Object.keys(this.gameBoard).length; i++) { 
            for (key in this.gameBoard){
                if (this.gameBoard[key][i] === null) {//to avoid null being determined as a win
                    s.add(nullCount);
                    nullCount++;
                }
                    else{
               s.add(this.gameBoard[key][i]);
                }
            } 
            if (s.size===1) {
                console.log('Column Win!');
                return true;
            }
        }// end for

        //condition 3: diagonals right to left
        s.clear();
        for (let i = 0; i < Object.keys(this.gameBoard).length; i++) { 
            s.add(this.gameBoard[i.toString()][i])
        } 
        if (s.size ===1) {
            console.log('Diagonal Win!');
            return true
        }

        //condition 4: diagonals left to right
        s.clear();
        for (let i = Object.keys(this.gameBoard).length -1; i > -1; i--) { 
            s.add(this.gameBoard[i.toString()][i])
            console.log('s is', s);
        } 
        if (s.size ===1) {
            console.log('Win!');
            return true
        }      
         

    }, //end checkVictory

    checkDraw : function() { //returns True or False after checking whether all board tiles have been used.
        for (keys in this.gameBoard){
            console.log(keys);
            for (let i = 0; i< this.gameBoard[keys].length; i++) { //this iterates over a row
                const element = this.gameBoard[keys][i]; //each element is an entry in one of the rows
                console.log('element:', element);
                
                if (element === null) {//to avoid null being determined as a win
                    return false;
                }//end if
              
            } 
        }//end for
        return true;//this should be called after check victory and check victory should result in game 
    },// end checkDraw

    togglePlayerTurn : function (){
       return  this.isPlayerXTurn ? this.isPlayerXTurn = false : this.isPlayerXTurn = true;

    }

}; //end game


const playGame = () => { //plays the game
    game.gameActive = true;
    
    $('.gridItem').on('click', function(e){
        let coords  = getCoords(e);

        if(game.isPlayerXTurn){
            if (game.placeMove('X', coords[0], parseInt(coords[1]))) {
                $(this).html('X')
                $(this).animate({
                    'fontSize': '4em'
                }, 1000)
                game.togglePlayerTurn();
            }
        }
        else if(game.placeMove('O', coords[0], parseInt(coords[1]))){
            $(this).html('O')
            $(this).animate({
                'fontSize': '4em'
            }, 1000)
            game.togglePlayerTurn();
        }

        game.checkVictory()
        game.checkDraw()
    })
}; //end playGame

playGame()
//==============UI===========//

const renderBoard = () => {
    //might keeep this for larger boards.
}


const getCoords = (e) => { //gets the x y from the clicked option
   const coordArray= (e.target.className.split(" "));
   return [coordArray[1], coordArray[2]];
}

