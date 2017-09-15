// Store module provides simple data storage to a json file

const fs = require('fs');

/* 
    CardStore Factory

    Store(fileName[, path])
    * fileName <string> name of file in which to store data; and file from which data is retrieved.
    * path <string> Path to file. Directory of Store.js is used if path parameter is omitted.

    Returns a CardStore Object
*/
var CardStore = function(fileName, path, data) {
    var filePath;
    var encoding = "utf8";
    // build a full file name and path if path argument is defined
    if ( typeof path !== 'undefined' ) {
        filePath = path + fileName;
    } else {
        // set the file name
        filePath = fileName;
    }

    // return CardStore object
    return {
        filePath: function() { return filePath },
        // returns promise passing data read from file
        getData: function() {
            return new Promise( 
                function(resolve, reject) {
                    fs.readFile(
                        fileName, 
                        encoding, 
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
        },
        // Write data to file and return promise
        storeData: function(data) {
            return new Promise(
                function(resolve, reject) {
                    // write data to file storing data as a json string
                    fs.writeFile(
                        filePath, 
                        data, 
                        { encoding: encoding }, 
                        function(err) {
                            // pass error writing file to promise
                            if ( err ) { reject(err); }
                            else { resolve(); }
                        }
                    );
                }
            );
        }
    }
};

module.exports = CardStore;