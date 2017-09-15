// Store module provides simple data storage to a json file

const fs = require('fs');

/* 
    CardStore Class

    Store(fileName[, path])
    * fileName <string> name of file in which to store data; and file from which data is retrieved.
    * path <string> Path to file. Directory of Store.js is used if path parameter is omitted.

    Returns an instance of Store class.
*/
var CardStore = function(fileName, path, data) {
    if ( this instanceof CardStore ) {
        // build a full file name and path if path argument is defined
        if ( typeof path !== 'undefined' ) {
            this.filePath = path + fileName;
        } else {
            // set the file name
            this.filePath = fileName;
        }
        this.encode = "utf8";
    } else {
        // ensure scope is preserved
        return new CardStore(fileName, path);
    }
};
// Returns a promise passing data object as the only parameter to 
// promise.then(data) on succesfuly retrieving data
CardStore.prototype.getData = function() {
    var fileName = this.filePath;
    var encoding = this.encode;
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
                        try {
                            // parse json data from string
                            data = JSON.parse(data);
                        }
                        catch (e) {
                            // an error occured trying to parse json
                            // pass the error to the promise
                            reject(e);
                        }
                        resolve(data);
                    }
                }
            );
        }
    );
};

// Overwrites log file with data. Returns a promise.
CardStore.prototype.storeData = function(data) {
    var filePath = CardStore.filePath;
    var encoding = CardStore.encode;
    return new Promise(
        function(resolve, reject) {
            // write data to file storing data as a json string
            fs.writeFile(
                filePath, 
                JSON.stringify(data), 
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

// tests
var myCardStore = new CardStore("test.json");
console.log(myCardStore);

// myCardStore
//     .storeData([{
//     front: "hello",
//     back: "world"
//     }])
//     .then(function(){myCardStore.getData()})
//     .then(function(data){
//         console.log("data:", data)
//     })
//     .catch(function(err) {
//         console.log("getData Error Caught:", err);
//     });

myCardStore.getData().then(function(data){console.log(data)});