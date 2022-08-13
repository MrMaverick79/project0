# Project0
## A tic-tac-toe game
 
:x: :o: :x:

![A game screen shot](https://github.com/MrMaverick79/MrMaverick79.github.io/blob/main/images/TTT-screenshot.png)

----

**Author:** Brendan Tuckerman

**Link:** https://mrmaverick79.github.io/project0/

**Background / Spec:** 

A tic-tac-toe game using ** HTML, CSS, JavaScript and Jquery **.

Implements a minimax algorithm for the 'impossible ai'.

This is the first project as part of General Assembly's Software Engineering Intensive 2022. 

### Technical Requirements

Your app must:

- Render a game board in the browser
- Switch turns between X and O (or whichever markers you select); your game should prevent users from playing a turn into a square that is already occupied
- Visually display which side won if a player gets three in a row; or show a draw/"cat’s game" if neither wins
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Use Javascript with jQuery (or vanilla DOM methods if you really prefer) for DOM manipulation
- Deploy your game online, where the rest of the world can access it
- Use semantic markup for HTML and CSS (adhere to best practices)

## Features


**UI:**
- Tracks Player wins and Computer wins
- Lightweight interface
- Mobile media queries :iphone:

**AI:**
- Easy (AI randomly selects a square)
- Medium (AI chooses random 50% of the time, impossible 50% of the time)
- Impossible (AI determines all possible future moves and gives them a score of either +10 or -10, dependent on the outcome. The then determine the move with th highest score.)



---

### Impossible AI using the minimax algorithm

The AI in this game is impossible to beat as it uses the [minimax](https://en.wikipedia.org/wiki/Minimax) decision making rules. 

The `minmax()` takes two paramaters- a game board and a current player. It then determines all of the free spots to play a move and then determines whether there is a win, a draw, or a loss:

~~~javascript
const minmax =  ( board, player ) => {
        let currentPlayer =  player;
        
        recursionCounter++ //this can be toggled on or off from the second last line of this function.
        
        //an array to keep all the objects
        let moves = [];
        let availableSpots =  emptySpaces( board ); //all of the possible moves on the board.

        //the players need to be opposite as the move has not yet been made
        //that is, it checks the state of the board after a move has just been made
        if (player === ai && game.checkVictory( board )){ //assigns 10 points for an ai victory
            return {score :10};
        }
        else if(player === human && game.checkVictory( board )){ //detracts 10 points for a human victory
            return {score: -10};
        }
        else if (availableSpots.length===0){ //scores a draw 
            return {score: 0};
        }
~~~

Tha AI will return a score depending on the outcome: +10 , -10, or 0. It's ultimately determining which moves will lead to a win.

If the current board does not yield any outcome, the function will **recursively** call itself by iterating over every available spot, adding the results of each call and the index of where it went:

~~~javascript

 //loop through all the available places where a move could be made
        for (let i = 0; i < availableSpots.length; i++) {
            let element = availableSpots[i]; //elements are indexes (as #s) relating to a position on the gameboard. I.e a number--NOT the actual board spot
            let move = {}; //   records an index of each move, with an index and a score(if possible)
            move.index = element; //store the index of the available spot
            //set the empty spot to the player
            
            board[element] = currentPlayer;

            //check the current state of the board that has been passed in to see if any of the end game states have been met
    
            if (player === ai){
                let result = minmax(board, human);
                move.score = result.score;
            }
            else {
                let result = minmax(board, ai);
                move.score = result.score; 
            }

~~~

Lastly, now that the game has made these recursions (it makes 55000 on turn 2!), it then has to determine which of the possible moves would be best (max) for it and worst (mini) for its opponent (you!):

~~~javascript

 let bestMove;
        if(player === human){
            let bestScore = -100000 //this needs to be lower than any possible loss moves.
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }//end inner if
                
            }//end for
        }//end if
        else{//for the player
            let bestScore = 100000 //this needs to be a large number--larger than the possible win.
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }//end inner if
                
            }//end for
        }//end if/else
    
    
     //switch this on to get a recursion counter
    //  console.log('Moves considered:', recursionCounter);
    
    return moves[bestMove]; //should return the index and score
~~~

Ultimately, it return an index and score for the best move out of **all possible choices**. 

This is then fed into the game. And this is why you won't win. :stuck_out_tongue_winking_eye:


---



### TODO

 - AI (~~simple: random~~, ~~intermediate, random 50%, impossible 50%~~, ~~impossible: minmax~~)
 - ~~Restart button~~
 - ~~media queries~~
 - ~~move script tags to the bottom as does not run 50% of the time.~~
 - ~~Turn display is not toggling~~
 - DRY code
 - ~~Remove console.logs~~
 - ~~Add 'menu' which shows win / loss / draw + allows you to select Easy / Medium / Impossible~~
 - ~~Player wins is being replaced with showturn()~~
 - ~~ Choosing a game difficulty needs to reset the board ~~
 - NB: See below for future fixes/ current bugs.
 

 ### Log

 **Day 1:** 

 - Created game logic for 3 x 3 game in JS.
 - Styled page and linked game logic to html using JQuery.

 **Day 2:**

- Created a reset button and reset functionality.
- updated styling in side panel
- created basic (random) AI player
- read up on Minmax ai algorithm for the 'impossible' AI

**Day 3:**

- Refactored code to use only array to store data
- Multiple refactors to make code succinct
- Fixed display toggle
- Created impossible AI using min max
- created underline styles for menu items.
- dealt with edge cases and bugs around clicking the same squares

**Day 4:**

- Added more detailed explanation of code in the comments.
- Updated the READ.ME and documentation.

## Known bugs / Future fixes / Wish list


**Bugs**
- Media queries for small screens misaligned
- ~~ Clicks still available post game ~~
- ~~ Display of reset misaligned with turns ~~

**Future Fixes**
- [ ] Game log on right hand side showing moves
- [ ] Allow choice of token
- [ ] strikethru effec on winning line
- [x] Update README for formatting
- [x] Update README to explain the impossible AI
- [ ]Human / AI toggle
- [ ] Remove hardcoded win states to allow for larger boards or other games.
