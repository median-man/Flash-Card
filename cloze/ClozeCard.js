// Constructor for ClozeCard class
var ClozeCard = function(text, cloze) {
    if ( this instanceof ClozeCard ) {
        // TODO: validate text and cloze
        this.cloze = cloze;
        this.fullText = text;

        // if cloze is not found in text...
        if ( text.indexOf(cloze) === -1 ) {
            // ... throw an error
            throw new InvalidClozeException(text, cloze);
        }
        // replace cloze with placeholder
        this.partial = text.replace(cloze, "...");
    } else {
        return new ClozeCard(text, cloze);
    }
};

// Constructor for an Invalid Cloze Exception error
function InvalidClozeException(text, cloze) {
    this.type = "CLOZE_ERROR";
    this.text = text;
    this.cloze = cloze;
    this.message = "Invalid ClozeCard parameters. Cloze parameter must be found in text parameter.";
    this.toString = function() {
        return this.type + ":" + this.message + "\n\"" + this.cloze + "\" was not found in \"" + this.text + "\"";
    }
}
module.exports = ClozeCard;