var database = (function(){

    var privateFeatures = {

    };

    var publicFeatures = {

        // Handle any special needs to load the database
        open: function () {
            console.log('opening the database');
        },

        // Handle any special needs to close the database
        close: function () {
            console.log('closing the database');
        },

        // Use this method to save objects to the database
        saveObject: function (saveName, objectToSave) {
            //#region Error Checking

            // If the parameter is not the data type we expect
            if (typeof saveName !== 'string' && (typeof objectToSave !== 'object' || objectToSave === null)) {

                throw new TypeError('This method needs the following types for its parameters: saveObject(String, Object)');
            }

            // If we don't allow overwriting save names and a saved object by that name already exists in the database
            if (!ALLOW_OVERWRITING_KEYS
                && window.localStorage.getItem(saveName) !== null) {

                throw new Error(`Cannot save object! '${saveName}' already exists in the database! (If you were expecting it to automatically overwrite the value, change 'ALLOW_OVERWRITING_KEYS' to equal 'true' in database-settings.js)`);
            }

            //#endregion

            // Convert the object into a string record and store it in the database
            window.localStorage.setItem(saveName, JSON.stringify(objectToSave));
        },

        // Use this method to load objects from the database
        loadObject: function (saveName) {
            //#region Error Checking

            // If the parameter is not the data type we expect
            if (typeof saveName !== 'string') {

                throw new TypeError('This method needs the following types for its parameters: loadObject(String)');
            }

            // If an object by that name does not exist in the database
            if (window.localStorage.getItem(saveName) === null) {

                throw new Error(`Cannot load object! '${saveName}' does not exist in the database!`);
            }

            //#endregion

            // Convert the stored string record back into an object and return it
            return JSON.parse(window.localStorage.getItem(saveName));
        },
    };

    return publicFeatures;
})();