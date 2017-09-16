/* 
*   CLI for reviewing basic flash cards
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
            } else {
                resultMsg = "Incorrect answer. The correct answer is \"" + 
                    basicCard.back + "\".";
            }
            resultMsg += "\n--------------------------------------------------\n";
            // display result string
            console.log(resultMsg);
            
            // increment cardIndex
            cardIndex++;
            // run the next card if there are more cards
            if ( cardIndex < cards.length ) {
                run();
            }
        }
    ).catch(
        function(reason) {
            console.log(reason);
        }
    );
}

// start the app
run();
