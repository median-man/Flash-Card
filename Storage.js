// Store module provides methods for saving and writing to file storage.

// import fs module
const fs = require('fs');

/* 
*   Global Values
 */
// fully resolved or relative path and file name for file storage
const fileName = "cards.json";
const fileEncoding = "utf8";

/* 
*   Module Methods
 */
// Returns a promise. Passes contents of file storage as
// a string on success to the promise.
var getData = function() {
    return new Promise( 
        function(resolve, reject) {
            fs.readFile(
                fileName, 
                fileEncoding, 
                function(err, data) {
                    if ( err ) {
                        // pass error reading file to promise
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                }
            );
        }
    );
};

// Returns a promise.
var storeData = function(dataString) {
    return new Promise(
        function(resolve, reject) {
            // write data to file storing data as a json string
            fs.writeFile(
                fileName, 
                dataString, 
                { encoding: fileEncoding }, 
                function(err) {
                    // pass error writing file to promise
                    if ( err ) { reject(err); }
                    else { resolve(); }
                }
            );
        }
    );
}

/* 
*   Export methods
 */
module.exports = {
    getData: getData,
    storeData: storeData
};