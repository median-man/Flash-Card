/* 
*   Import Modules
 */
const BasicCard = require("./BasicCard");
const ClozeCard = require("./ClozeCard");
const CardStore = require("./CardStore.js")

/* 
*   Globals
 */
// constants for operators
const opAdd = "add";
const opReview = "review";

// constants for card type
const typeCloze = "cloze";
const typeBasic = "basic";

// storage for cards
const myStore = new CardStore("cards.json");

/* 
*   Evaluate parameters
 */
var operation = process.argv[2]; // add or review cards
var args = process.argv.slice(3);

// add a new card to storage from input
if ( operation === opAdd ) {
    // add card data from args
    var cardType = args[0];
    var newCard;
    if ( cardType === typeBasic ) {
        // create a new basic card
        newCard = new BasicCard(args[1], args[2]);
        newCard.type = typeBasic;
    }
    else if ( cardType === typeCloze ) {
        // create a new cloze card
        newCard = new ClozeCard(args[1], args[2]);
        newCard.type = typeCloze;
    }
    else {
        // invalid type
        throw new InvalidArgumentException(type + " is not a valid card type.");
    }
    // add card to storage
    addCard(JSON.stringify(newCard));
}
// return array of cards from storage
else if ( operation === opReview ) {
    // get the cards from storage
    getCards()
        .then(
            function(cardData) {
                // log the cards array
                console.log("Successfully retrieved cards.\n" + JSON.parse(cardData));
            }
        )
        .catch(
            function(reason) {
                // log reason for failure to retrive cards
                console.log("Failed to get the cards.\n" + reason);
            }
        );
}
else {
    // invalid operation
    throw new InvalidArgumentException(operation + " is not a valid operation.");
}

// TODO: this function is a placeholder. needs logic to store the card data.
// Returns a promise. Adds a new card to storage passing the new card
// to the returned promise.
function addCard(cardData) {
    return new Promise(
        function(resolve, reject) {
            var cardsArray;
            try {
                // TODO: add the card data to storage
                // get cards from storage
                getCards()
                    .then(
                        function(data) {
                            cardsArray = JSON.parse(data);
                            cardsArray.push(cardData);                            
                        }
                    )
                    .catch(
                        function(reason) {
                            reject(reason);
                        }
                    )
                // pass card to the callback
                resolve(cardData);
            }
            catch (reason) {
                // return failure message to callback
                reject(reason);
            }
        }
    );
}

// Returns a promise which is passed an array of card objects.
// The array contains all cards in storage.
function getCards() {
    return new Promise(
        function(resolve, reject) {
            try {
                var cards = [];
                // TODO: get the cards from storage
                resolve(cards);
            }
            catch (reason) {
                reject(reason);
            }
        }
    );
}

/* 
* Exception Classes
 */
function InvalidArgumentException(message) {
    this.message = message;
    this.name = "InvalidInputException";
}



/* 
*   Tests
*/
