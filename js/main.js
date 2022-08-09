
//create game
const game = {

    gameActive: true, //this can be used to start / end the game
    turnCount: 0,
    aiLevel: 0,
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
        '2': [null, null ,null],
    },

    displayBoard : function() { //for testing
        console.log(this.gameBoard);
    }, 

    getValue: function (row, index) {
        return this.gameBoard[row][index];
    },
   
    placeMove : function(board, player, row, position) { //returns true or false if move was successful
        if(!board[row][position]){ //should check if there is something in the position
            board[row][position] = player; //places move
            return true; //lets us know whether we can go ahead and make the move
        }
        else {
            return false;
        }
        //check victory conditions
    }, //end placeMove

    checkVictory: function(board) { //checks all possible victory conditions 
        let nullCount= 0;
        let s = new Set() //This set is reused to see if the contents of the different interations are the same. A set with a length === 1 means the palyer has won.
         //condition 1: if an entire row is the same
        for (keys in board){
            s.clear()
            for (let i = 0; i< Object.keys(board).length; i++) { //this iterates over a row
                const element = board[i][keys]; 
                
                //each element is an entry in one of the rows
                if (element === null) {//to avoid null being determined as a win
                    s.add(nullCount);
                    nullCount++;
                }//end if 
                else {
                    s.add(element);
                }
                
            } //end for
             if(s.size === 1){ //determine whether there is  row victory
                return true
            }
            
    
        }// end for keys 

        //condition 2: if an entire column is the same
        s.clear();
        
           
        for (key in board){
            s.clear();
            for (let i = 0; i < Object.keys(board).length; i++) {
                    if (board[key][i] === null) {//to avoid null being determined as a win
                    s.add(nullCount);
                    nullCount++;
                }
                else{
                    s.add(board[key][i]);
                }
                
                
            }
            
             
            if (s.size===1) {
                return true;
            }
            
        }// end for

        //condition 3: diagonals right to left
        s.clear();
        for (let i = 0; i < Object.keys(board).length; i++) { 
            if(board[i.toString()][i]===null){
                s.add(nullCount);
                nullCount++
            }
            else{
                s.add(board[i.toString()][i])
            }
        } 
        if (s.size ===1) {
            return true
        }

        //condition 4: diagonals left to right
        s.clear();
        let j = 0;
        for (let i = Object.keys(board).length -1; i > -1; i--) { 
                
                if(board[i][j]===null){
                    s.add(nullCount);
                    nullCount++;
                    j++;
                }
                else{
                    s.add(board[i][j])
                    j++;
                }
                
            } //inner for end
        
            if (s.size ===1) {
                return true
        
            }      
        

    }, //end checkVictory

    checkDraw : function(board) { //returns True or False after checking whether all board tiles have been used.
        for (keys in board){
            for (let i = 0; i< board[keys].length; i++) { //this iterates over a row
                const element = board[keys][i]; //each element is an entry in one of the rows
                
                if (element === null) {//to avoid null being determined as a win
                    return false;
                }//end if
              
            } 
        }//end for
        game.gameActive = false
        return true;//this should be called after check victory and check victory should result in game 
    },// end checkDraw

    togglePlayerTurn : function (){
       return  this.isPlayerXTurn ? this.isPlayerXTurn = false : this.isPlayerXTurn = true;

    }

}; //end game

//==========================AI===================================//

const chooseRandomPosition = () => {
    const randomCol = Math.floor(Math.random() * 3);
    const randomRow = Math.floor(Math.random() * 3);
    return [randomCol, randomRow];
}

const basicAI = () =>{
    //this should look over the available squares and choose one at random
    let selection = chooseRandomPosition();
        if (game.placeMove(game.gameBoard, 'X', selection[0].toString(), selection[1])){
            //place o on UI <=--this is the only place where this can gor weon
            $(`.gridItem.c${selection[0]}.r${selection[1]}`).html('X').delay(500).animate({
                'fontSize': '4em'
            }, 1000)
            game.togglePlayerTurn();
        }
        else{
            basicAI();
        }
}//end basic AI;;


//============impossible AI==================================//



let boardClone = JSON.parse(JSON.stringify(game.gameBoard));//this takes the originalboard and makes a deep copy (clone). Thus, you won't impact the game itself.
let huPlayer = 'O';
let aiPlayer ='X';




const minmax =  (board, player) => {
        if (player = 'X' && this.checkVictory()){
            return 10;
        }
        else if(player = 'O' && this.checkVictory()){
            return -10;
        }
        else if (game.checkDraw()){
            return 0;
        }
};





// call the minimax function on each available spot (recursion)
// evaluate returning values from function calls
// and return the best value

//==============UI===========//

const renderBoard = () => {
    //might keeep this for larger boards.
}

const toggleReset= () => {
    
    
    showTurn()
    $('#status').html("Turn")
    if(game.gameActive) {
        $('#reset').animate({
            opacity: 0.9,
        }, 1500)
       
    }
    else {
        $('#reset').animate({
            opacity: 0, 
        }, 1500)
       
    }
}
   

const getCoords = (e) => { //gets the x y from the clicked option
   const coordArray= (e.target.className.split(" "));
   console.log(parseInt(coordArray[1][1]), parseInt(coordArray[2][1]));
   
   return [parseInt(coordArray[1][1]), parseInt(coordArray[2][1])];
}; //end getCoords

const showTurn = () => { //displays whose turn it is in the right hand margin
    const $turnIndicator = $('#turn')
    if(game.isPlayerXTurn) {
        $turnIndicator.html('X');
    } else {
        $turnIndicator.html("O");
    }
}//end showTurn

showTurn();

const playGame = () => {
    $('.gridItem').on('click', function(e){
            const currentPlayer = game.isPlayerXTurn ? 'X' : 'O';
            game.gameActive = true;
            let coords  = getCoords(e);
            toggleReset();
            if(!game.isPlayerXTurn){
                if (game.placeMove(game.gameBoard, 'O', coords[0], parseInt(coords[1]))){
                    $(this).html('O')
                    $(this).animate({
                        'fontSize': '4em'
                    }, 1000)
                    game.togglePlayerTurn();
                    
                // if (game.placeMove('X', coords[0], parseInt(coords[1]))) {
                //     $(this).html('X')
                //     $(this).animate({
                //         'fontSize': '4em'
                //     }, 1000)
                //     game.togglePlayerTurn();
                // }
                }

            if(game.checkVictory(game.gameBoard)){
                    game.gameActive = false;
                    $('#status').html(`${currentPlayer} Wins!`)
                    return;
            }
            showTurn()

            if(game.checkDraw(game.gameBoard)){
                 $('#status').html("Draw.")
                 return;
            }
         
            
            basicAI(); //computer turn?
                
            if(game.checkVictory(game.gameBoard)){
                    game.gameActive = false;
                    $('#status').html(`${currentPlayer} Wins!`)
                    return;
            }
            showTurn()

            if(game.checkDraw(game.gameBoard)){
                    $('#status').html("Draw.");
                    return;
            }
                 
        }
    })//end click eveents 
    

}//end playGame


playGame();

const resetGame = () => { //resets the board 
    $('#reset').on('click', function(){
        //replace the js game board with null
        for (keys in game.gameBoard){
            for (let i = 0; i < game.gameBoard[keys].length; i++) {
                game.gameBoard[keys][i] = null;
            } //end inner for loop
        }//end outer for loop
        
    $('.gridItem').html('') //clear the UI gameboard
    game.gameActive = false;
    game.isPlayerXTurn = false;
    //hide the reset button
    toggleReset();
    }) //end resetGame
}
resetGame()






