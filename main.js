/* 
*   Import Modules
 */
const inquirer = require("inquirer");
const BasicCard = require("./BasicCard");
const ClozeCard = require("./ClozeCard");
const Storage = require("./Storage.js");

// get the cards
Storage.getData()
    .then(
        function(cardData) {
            // get the cards from file storage
            var cardsArray = JSON.parse(cardData);
            // begin interactive review
            reviewCards(cardsArray);
        }
    )

// Interactively displays cards to user
function reviewCards(cards, i = 0 ) {
    var card = cards[i];

    // question object to be passed to inquirer
    var question = {
        name: "card",
        type: "input"
    };
    var answer;

    // if the card has the front property ...
    if ( typeof card.front !== 'undefined' ) {
        // the card is a 'basic card'
        card = new BasicCard(card.front, card.back);
        // set question and answer
        question.message = card.front;
        answer = card.back;
    }

    // if the card has the cloze property ...
    else if ( typeof card.cloze !== 'undefined' ) {
        // card is a 'cloze card'
        card = new ClozeCard(card.fullText, card.cloze);
        // get the question and answer
        question.message = card.partial;
        answer = card.cloze;
    }

    // show first part of card to user
    inquirer.prompt(question)
        .then(
            function(answers) {
                var result;
                if ( answers.card === answer ) {
                    // the user answered correctly
                    result = "You answered correctly!\n" + "-------------------------";
                }
                else {
                    // incorrect answer
                    result = "You answered incorrectly.\n'" + answer + 
                        "' is the correct answer.\n-------------------------";
                }
                console.log(result);

                // increment loop counter
                i++;
                // if more cards
                if ( i < cards.length ) {
                    // next card
                    reviewCards(cards, i);
                }
            }
        )
        .catch(
            function(err) {
                // end program and display the error
                console.log(err);
                process.exit();
            }
        );
}