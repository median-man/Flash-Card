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

// get card
var card = new BasicCard(cards[0].front, cards[0].back);
// display the card prompt
inquirer.prompt(
    {
        name: "userAnswer",
        type: "input",
        message: card.front + "\nAnswer: "
    }
).then(
    function(answers) {
        // build result string to display to the user
        var resultMsg;
        // compare input to answer after user enters input
        if ( answers.userAnswer === card.back ) {
            resultMsg = "You answered correctly!";
        } else {
            resultMsg = "Incorrect answer. The correct answer is \"" + 
                card.back + "\".";
        }
        resultMsg += "\n--------------------------------------------------\n";
        // display result string
        console.log(resultMsg);
    }
).catch(
    function(reason) {
        console.log(reason);
    }
);
// if there are more cards ...
// show the next card