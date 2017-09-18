/* 
*   Prompt user to select and run a command line implementation
*   of either the cloze or basic flash card app.
 */

 /* 
 *  Import modules
  */
const inquirer = require("inquirer");
const fs = require("fs");
const Basic = require("./basic/basic.js");
const Cloze = require("./cloze/cloze.js");

// choices
const chBasic = "Basic";
const chCloze = "Cloze";

// get title string from file
fs.readFile("title.txt", "utf8", 
    function(err, data) {
        // display title string (continues running if file doesn't load)
        console.log(data);

        // get user input for flash card app
        inquirer.prompt(
            {
                name:"userChoice",
                message:"What would you like to run?",
                type:"list",
                choices: [chBasic, chCloze]
            }
        ).then(
            function(answers) {
                // run the app chosen by the user
                if ( answers.userChoice === chBasic ) {
                    Basic.run();
                }
                else if ( answers.userChoice === chCloze ) {
                    Cloze.run();
                }
            }
        ).catch(
            function(reason) {
                console.log("Failed to load the application. Good bye.");
            }
        );
    }
);