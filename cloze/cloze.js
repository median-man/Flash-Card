/* 
*   This module runs a command line interface for
*   reviewing cloze cards.
 */

 /* 
 *  Import Modules 
 */
const fs = require("fs");
const inquirer = require("inquirer");
const ClozeCard = require("./ClozeCard");
const cardData = require("./cloze.json"); // array of flash card objects

/* 
* Globals
 */
var cards = []; // array of cloze cards
var cardIndex = 0;
var score = 0; // counts correctly answered cards

// Runs the app until all cards have been reviewed by the user.
function run() {
    var clozeCard = cards[cardIndex];
    cardIndex++; // next card index

    // display the card prompt
    inquirer.prompt(
        {
            name: "userAnswer",
            type: "input",
            message: clozeCard.partial + "\nAnswer: "
        }
    ).then(
        function(answers) {
            // build result string to display to the user
            var resultMsg;
            // compare input to answer after user enters input
            if ( answers.userAnswer === clozeCard.cloze ) {
                resultMsg = "You answered correctly!\n";                
                score++; // increment score
            } else {
                resultMsg = "Incorrect answer.\n";
            }
            resultMsg += clozeCard.fullText;
            resultMsg += "\n--------------------------------------------------\n";
            // display result string
            console.log(resultMsg);
            
            // continue to next card if there are more cards
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
            console.log(reason);
        }
    );
}
// build array of cloze cards from data
for ( var i = 0; i < cardData.length; i++ ) {
    // string of error messages to log
    var errorMessages = ""; 
    try {
        // get instance of ClozeCard
        var card = new ClozeCard(
            cardData[i].text, 
            cardData[i].cloze
        );
        cards.push(card);
    }
    catch (error) {
        // add a timestampe to the error
        error.ts = Date.now();
        // error occured constructing the card
        // quietly log the error and continue
        errorMessages += 
            "TS: " + Date.now() + "\n" +
            JSON.stringify(error, null, 2) + 
            "\n--------------------------------------------------\n";
    }
    // add errors to the log ignoring error when appending to
    // the log by passing a callback to appendfile that does nothing
    // to prevent 'no callback error' from being thrown by fs module
    fs.appendFile("errors.log", errorMessages ,function(err) {});
}

module.exports.run = run;