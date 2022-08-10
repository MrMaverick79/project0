
//create game
const game = {

    gameActive: true, //this can be used to start / end the game
    turnCount: 0,
    aiLevel: 0,
    isPlayerXTurn: false,
    playerWins: 0,
    computerWins: 0,
    gameBoard: [0,1,2,3,4,5,6,7,8],  //state of the board in array with insex numbers
    
    displayBoard : function() { //for testing
        console.log(this.gameBoard);
    }, 

    getValue: function(index) {
        return this.gameBoard[index];
    },

    resetBoard: function(board){
        for (let i = 0; i < board.length; i++) {
            board[i] = i;  
        }
    },//end resetBoard
   
    placeMove: function( board, player, index ) { //returns true or false if move was successful
        if(typeof board[index] !== 'string'  ){ 
            board[index] = player; //places move
            return true;
        }
        else {
            return false;
        }
       
    }, //end placeMove

    onlyOneType(array){
        let s = new Set(array);
        return s.size ===1
    },//

    checkVictory: function( board ) { //checks all possible victory conditions 
         //This set is reused to see if the contents of the different interations are the same. A set with a length === 1 means the player has won.
        //condition 1: if an entire row is the same
        for (let i = 0; i < board.length; i+=3) {
            let currentSlice =  board.slice(i, i+3) //create slices for each row
            if (this.onlyOneType(currentSlice)){
                console.log('row win');
                
                return true;
            };
            
        };
        
        //condition 2: if an entire column is the same
        for (let i = 0; i < board.length-6; i++) {
            let columnSlice = [board[i], board[i+3], board[i+6]]; //create 'slice' of columns
            if ( this.onlyOneType(columnSlice)){
                console.log('column win');
                
                return true;
            };
            
        };

        //condition 3: diagonals left to right
        let diagonalSlice = [];
        for (let i = 0; i < board.length; i+=4) {
            diagonalSlice.push(board[i]);
        }
        if( this.onlyOneType(diagonalSlice)){
            console.log('diagonal l r win');
            
            return true;
        };
            
        //condition 4: diagonals right to left
        //TODO this is still hardcoded
        let diagonalSliceOpp = [];
            diagonalSliceOpp.push(board[2]);
             diagonalSliceOpp.push(board[4]);
             diagonalSliceOpp.push(board[6]);
        if (this.onlyOneType(diagonalSliceOpp)){
            console.log('diagonal l r win');
            
            return true;
        };

    },//end checkVictory
   
    toggleTurn: function() { //returns whether it is currently the players turn or not.
        if(this.isPlayerXTurn === true){
            this.isPlayerXTurn = false;
        } else{
            this.isPlayerXTurn = true;
        } 
    }, //end toggleplayer turn
   
    checkDraw : function( board ) { //returns True or False after checking whether all board tiles have been used.
        for (let i = 0; i < board.length; i++) {
            if(typeof board[i]  === 'number'){
                return false;
            }
            
        }
        return true;     
           
    },// end checkDraw

    

}; //end game

//==========================AI===================================//

//============

const chooseRandomPosition = () => {
    const randomIndex = Math.floor(Math.random() * 8);
    return randomIndex;
}

const basicAI = () =>{
    //looks over board and chooses a random free square
    let selection = chooseRandomPosition();
    console.log('basicAI', selection);
        if (game.placeMove(game.gameBoard, 'X', selection)){
            //place o on UI <=--this is the only place where this can gor weon
            $(`#${selection}`).html('X').delay(500).animate({
                'fontSize': '4em'
            }, 1000)
            
        }
        else{
            basicAI();
        }
}//end basic AI;;


    //============impossible AI==================================//



let boardClone = JSON.parse(JSON.stringify(game.gameBoard));//this takes the originalboard and makes a deep copy (clone). Thus, you won't impact the game itself.

// let boardClone = ['O', 'O', 2, 3, 4, 5, 6, 7, 8] //for testing
console.log(boardClone);
let human = 'O';
let ai ='X';


const emptySpaces = ( board ) => { //returns the positions of the empty spaces
    let emptySpaces = board.filter(x => typeof x === 'number') //returns any spaces that are still a number
    return emptySpaces; //returns an aray  of the possible locations to make a move
}//end emptySpaces


const minmax =  ( board, player ) => {
        let currentPlayer =  player;
        console.log('Current player is', player);
        
        //an array to keep all the objects
        let moves = [];
        let availableSpots =  emptySpaces( board ); //all of the possible moves on the board.
        console.log('Length of available spots: ', availableSpots.length);
        
        
        //the players need to be opposite as the move has not yet been made
        //that is, it checks the state of the board after a move has just been made
        if (player === ai && game.checkVictory( board )){ //assigns 10 points for an ai victory
            console.log('Ai victory found');
            return {score :10};
        }
        else if(player === human && game.checkVictory( board )){ //detracts 10 points for a human victory
            console.log('Human victory found :(');
            return {score: -10};
        }
        else if (availableSpots.length===0){ //scores a draw 
            console.log('Results in a draw');
            return {score: 0};
        }


        //loop through the spots
        for (let i = 0; i < availableSpots.length; i++) {
            let element = availableSpots[i]; //elements are indexes (as #s) relating to a position on the gameboard. I.e a number--NOT the actual board spot
            console.log('element is', element);
            
            
            let move = {}; //   records an index of each move, with an index and a score(if possible)
            move.index = element; //store the index of the available spot
            //set the empty spot to the player
            console.log('Checking current player ', currentPlayer);
            
            board[element] = currentPlayer;

            //check the current state of the board that has been passed in to see if any of the end game states have been met
           

            console.log('move:', move);
            if (player === ai){
                let result = minmax(board, human);
                console.log('ai move', boardClone);
                console.log('result', result);
                move.score = result.score;
            }
            else {
                let result = minmax(board, ai);
                console.log('player move', boardClone);
                console.log('player result', result);
                move.score = result.score; //this returns undefined because it is not found?
            }

            // //reset the board by replacing the move with the original element
            board[element] = move.index;
            moves.push(move);
            
            
        }//end for loop

        //loop through moves and determine which is the min or max (depending on player)
        let bestMove;
        if(player === human){
            let bestScore = -100000 //does this work here? Could I just use a large number? 
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }//end inner if
                
            }//end for
        }//end if
        else{//for the player
            let bestScore = 100000 //does this work here? Could I just use a large number? 
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }//end inner if
                
            }//end for
        }
    
    
     //this returns a move as an object: {index: # score: #}
    
    return moves[bestMove]; //should return the index and score

}; //end minmax

const impossibleAi = (board) => {
    const move = minmax(board, ai).index
    game.placeMove(board, 'X', move);
    $(`#${move}`).html('X').delay(500).animate({
        'fontSize': '4em'
    }, 1000)
    
};




// call the minimax function on each available spot (recursion)
// evaluate returning values from function calls
// and return the best value

//==============UI===========//

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
   

const showTurn = () => { //displays whose turn it is in the right hand margin
    const $turnIndicator = $('#turn')
        $turnIndicator.html('Thinking...');
    if(game.isPlayerXTurn) {
        $turnIndicator.html('X');
    } else {
        $turnIndicator.html("O");
    }
}//end showTurn

showTurn();//initialise

const determinePlayer = () =>{
    let currentPlayer = game.isPlayerXTurn===true ? 'X' : 'O';
    return currentPlayer;
}

const playGame = (square) => {

        let currentPlayer = determinePlayer();
        console.log('This turn is', currentPlayer);
        
        game.gameActive = true;
        toggleReset(); //displays reset button

        if(!game.isPlayerXTurn){

    
            if (game.placeMove(game.gameBoard, 'O', square.attr('id'))){
                
                   square.html('O')
                    square.animate({
                        'fontSize': '4em'
                    }, 1000)
                    game.toggleTurn()
                

                    console.log('The move is now' , currentPlayer);
                    
                    
                // if (game.placeMove('X', coords[0], parseInt(coords[1]))) {
                //     $(this).html('X')
                //     $(this).animate({
                //         'fontSize': '4em'
                //     }, 1000)
                //     game.togglePlayerTurn();
                // }
                }
            
            showTurn();
            
            //check whether the player has won
            if(game.checkVictory(game.gameBoard)){
                    game.gameActive = false;
                    game.isPlayerXTurn = false;
                    $('#status').html(`${currentPlayer} Wins!`)
                    return;
            }
           
            //check whether the player has drawn
            if(game.checkDraw(game.gameBoard)){
                 $('#status').html("Draw.")
                 return;
            }
         
            currentPlayer ='X';
            //computer turn
            if(game.aiLevel === 2){
                impossibleAi(game.gameBoard);
            }
            else if(game.aiLevel === 1){ //this should just toggle between the two
                mediumAI();
            }
            else{
                basicAI();
            }

            //see if AI has won              
            if(game.checkVictory(game.gameBoard)){
                game.gameActive= false;
                game.isPlayerXTurn = false;
                $('#status').html(`${currentPlayer} Wins!`)
                return;
            }
           
            //see if AI has drawn
            if(game.checkDraw(game.gameBoard)){
                    game.isPlayerXTurn = false;
                    $('#status').html("Draw.");
                    return;
            }
            game.toggleTurn();
            currentPlayer = "O"
            showTurn();

        }; 

}//end playGame




const resetGame = () => { //resets the board 
    
        //replace the js game board with original indexes
    game.resetBoard(game.gameBoard);
         //end inner for loop
    $('.gridItem').html('') //clear the UI gameboard
    game.gameActive = false;
    game.isPlayerXTurn = false;
    //hide the reset button
    toggleReset();
   //end resetGame
}


//event listeners

$('.gridItem').on('click', function(){
    playGame($(this));
})
$('#reset').on('click', function(){
    resetGame();
})



