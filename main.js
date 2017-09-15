/* 
*   Import Modules
 */
const BasicCard = require("./BasicCard");
const ClozeCard = require("./ClozeCard");

/* 
*   Globals
 */
const opAdd = "add";
const opReview = "review";

/* 
*   Evaluate parameters
 */
var operation = process.argv[2]; // add or review cards
var args = process.argv.slice(3);
if ( operation === opAdd ) {
    // add card data passed in parameters
}
else if ( operation === opReview ) {
    // return array of cards
}
else {
    // invalid operation
    throw (operation + " is not a valid operation.");
}

// TODO: this function is a placeholder. needs logic to store the card data.
// Returns a promise. Adds a new card to storage passing the new card
// to the returned promise.
function addCard(cardData) {
    return new Promise(
        function(resolve, reject) {
            try {
                // add the card data to storage

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