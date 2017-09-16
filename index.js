/* 
*   Prompt user to select and run a command line implementation
*   of either the cloze or basic flash card app.
 */

 /* 
 *  Import modules
  */
const inquirer = require("inquirer");
const fs = require("fs");

// choices
const basic = "Basic";
const cloze = "Cloze";

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
                choices: [basic, cloze]
            }
        ).then(
            function(answers) {
                // run the app chosen by the user
                if ( answers.userChoice === basic ) {
                    require("./basic.js");
                }
                else if ( answers.userChoice === cloze ) {
                    require("./cloze.js");
                }
            }
        ).catch(
            function(reason) {
                console.log("Failed to load the application. Good bye.");
            }
        );
    }
);