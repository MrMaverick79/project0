# Project0
## A tic-tac-toe game 

----

Author: Brendan Tuckerman

Link:

Background / Spec: This is the first project as part of General Assembly's Software Engineering Intensive. 

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

### TODO

 - AI (~~simple: random~~, ~intermediate, random 50%, impossible 50%~, ~impossible: minmax~)
 - ~~Restart button~~
 - media queries
 - move script tags to the bottom as does not run 50% of the time.
 - ~Turn display is not toggling~
 - DRY 
 - ~Remove console.logs~
 - Add 'menu' which shows win / loss / draw + allows you to select Easy / Medium / Impossible
 - Player wins is being replaced with showturn()

 ### Log

 Day 1: 

 - Created game logic for 3 x 3 game in JS.
 - Styled page and linked game logic to html using JQuery.

 Day 2:

- Created a reset button and reset functionality.
- updated styling in side panel
- created basic (random) AI player
- read up on Minmax ai algorithm for the 'impossible' AI

Day 3:

- Refactored code to use only array to store data
- Multiple refactors to make code succinct
- Fixed display toggle
- Created impossible AI using min max

