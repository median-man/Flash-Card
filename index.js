/* 
*   Prompt user to select and run a command line implementation
*   of either the cloze or basic flash card app.
 */

 /* 
 *  Import modules
  */
try {
    var inquirer = require("inquirer");
    var fs = require("fs");
    var Basic = require("./basic/basic.js");
    var Cloze = require("./cloze/cloze.js");

// error occured loading modules
} catch (err) {
    if ( err.code === "MODULE_NOT_FOUND" ) {
        // not all modules have been installed correctly
        return console.log(
            "The application was installed incorrectly. Please remove all " + 
            "application files and try installing again. Refer to the " +
            "README. (https://github.com/median-man/Quote-Cards)"
        );
    } else {
        // there was an unexpected error loading the modules
        console.log(
            "An unexpected error occured. One or more files may " +
            "be missing. Please try installing the application again."
        );
    }
}

// choices for flash card mode
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