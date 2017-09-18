/* 
*   This module implements a command line interface for
*   reviewing basic cards.
 */

 /* 
 *  Import Modules 
 */
const fs = require("fs");
const inquirer = require("inquirer");
const BasicCard = require("./BasicCard");
const cards = require("./basic.json"); // array of flash card objects

/* 
* Globals
 */
var cardIndex = 0;
var score = 0; // counts correctly answered cards

// Runs the app until all cards have been reviewed by the user.
function run() {
    // get instance of BasicCard
    var basicCard = new BasicCard(
        cards[cardIndex].front, 
        cards[cardIndex].back
    );
    // display the card prompt
    inquirer.prompt(
        {
            name: "userAnswer",
            type: "input",
            message: basicCard.front + "\nAnswer: "
        }
    ).then(
        function(answers) {
            // build result string to display to the user
            var resultMsg;
            // compare input to answer after user enters input
            if ( answers.userAnswer === basicCard.back ) {
                resultMsg = "You answered correctly!";                
                score++; // increment score
            } else {
                resultMsg = "Incorrect answer. The correct answer is \"" + 
                    basicCard.back + "\".";
            }
            resultMsg += "\n--------------------------------------------------\n";
            // display result string
            console.log(resultMsg);
            
            // continue to next card if there are more cards
            cardIndex++;
            if ( cardIndex < cards.length ) {
                run();
            }

            // display end of game message
            else {
                console.log(
                    "Game Over!\nYou correctly answered " + score + 
                    " of " + cardIndex + " questions."
                );
            }
        }
    ).catch(
        function(reason) {
            console.log("An unexpected error has occured. Please restart the application.");
        }
    );
}

// export run method
module.exports.run = run;