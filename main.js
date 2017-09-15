/* 
*   Import Modules
 */
const inquirer = require("inquirer");
const BasicCard = require("./BasicCard");
const ClozeCard = require("./ClozeCard");
const CardStore = require("./CardStore");

// get a global instance of CardStore
var myStore = CardStore("cards.json");

// constants for commands
const cmdAddCards = "add";
const cmdReview = "review";
const cmdQuit = "quit";

function run() {
    // prompt user for command
    inquirer.prompt({
        name: 'command',
        type: 'list',
        message: "Add cards or review?",
        choices: [cmdAddCards, cmdReview, cmdQuit]
    })
    .then(function(answers) {
        if ( answers.command === cmdAddCards ) {
            addCard();
        } else if ( answers.command === cmdReview ) {
            console.log("review cards chosen");
        } else if ( answers.command === cmdQuit ) {
            process.exit();
        }
    });
}

// prompts user for input and adds card to store
function addCard() {
    const typeBasic = 'basic';
    const typeCloze = 'cloze';
    inquirer.prompt(
        [
            {
                name: 'cardType',
                type: 'list',
                message: 'Choose type of card to add:',
                choices: [typeBasic, typeCloze]
            },
            {
                name: 'front',
                type: 'input',
                message: 'Enter front text:',
                when: function(answers) { return answers.cardType === typeBasic }
            },
            {
                name: 'back',
                type: 'input',
                message: 'Enter back text:',
                when: function(answers) { return answers.cardType === typeBasic }
            },
            {
                name: 'fullText',
                type: 'input',
                message: 'Enter full text for cloze card:',
                when: function(answers) { return answers.cardType === typeCloze }
            },
            {
                name: 'clozeText',
                type: 'input',
                message: 'Enter text to delete for cloze card:',
                when: function(answers) { return answers.cardType === typeCloze }
            }
        ]
    )
    .then(
        function(answers) {
            var cardsArray;
            var newCard;
            if ( answers.cardType === typeBasic ) {
                // get a new basic card
                newCard = new BasicCard(answers.front, answers.back);
            }
            else if ( answers.cardType === typeCloze ) {
                newCard = new ClozeCard(answers.fullText, answers.clozeText);
            }
            // get data from the store
            myStore.getData()
            .then(
                function(data) {
                    cardsArray = data;
                    // add new card to data
                    cardsArray.push(newCard);
                    // store data with the new card
                    myStore.storeData(cardsArray);
                    // go back to starting prompt
                    run();
                }
            )
            .catch(
                function(err) {
                    console.log("Error adding card:\n", err);
                }
            );
        }
    )
    // error getting user input
    .catch(
        function(err) {
            console.log(err);
        }
    );
}

// Retrieves cards from store and interactively displays them to the user
function reviewCards() {
    // get the cards
    // for each card in cards
        // show front or text
        // wait for user to input flip card
        // flip the card
        // wait for user to go to next card
        // next card
}

// start the application
run();