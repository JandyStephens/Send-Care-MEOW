var ui = (function(){

    var privateFeatures = {

        jqueryRefs: {},
    };

    var publicFeatures = {

        add$ToRef: function (refName, jquerySelector) {
            //#region Error Checking

            // If the parameters are not the data types we expect
            if (typeof refName !== 'string'
                || typeof jquerySelector !== 'string') {

                throw new TypeError('This method needs the following types for its parameters: add$ToRef(String, String)');
            }

            // If a jQuery reference already exists by that name
            if (refName in privateFeatures.jqueryRefs) {

                throw new Error(`Cannot add jQuery due to reference name conflict! '${refName}' already exists!`);
            }
            
            //#endregion
            
            var jqueryObj = publicFeatures.get$(jquerySelector);
            privateFeatures.jqueryRefs[refName] = jqueryObj;
        },

        get$FromRef: function (refName) {
            //#region Error Checking

            // If the parameter is not the data type we expect
            if (typeof refName !== 'string') {

                throw new TypeError('This method needs the following types for its parameters: get$FromRef(String)');
            }

            // If a jQuery reference by that name does not exist
            if (!(refName in privateFeatures.jqueryRefs)) {

                throw new Error(`'${refName}' jQuery reference doesn't exist in the UI!`);
            }

            //#endregion

            return privateFeatures.jqueryRefs[refName];
        },

        get$(jquerySelector) {

            // If the parameters are not the data types we expect
            if (typeof jquerySelector !== 'string') {
                
                throw new TypeError('This method needs the following types for its parameters: addJquery(String, String)');
            }

            var jqueryObj = $(jquerySelector);

            // If we've got the jQuery Selector Error enabled, and No HTML elements were found using the provided jQuery Selector
            if (JQUERY_SELECTOR_ERROR_ENABLED
                && jqueryObj.length === 0) {

                throw new Error(`No HTML elements could be selected with: '${jquerySelector}'`);
            }

            return jqueryObj;
        },

        showByRef: function (refName, callback = undefined) {
            //#region Error Checking

            // If the parameters are not the data types we expect
            if (typeof refName !== 'string'
                || (typeof callback !== 'function' && typeof callback !== 'undefined')) {

                throw new TypeError('This method needs the following types for its parameters: showByRef(String, Function[optional])');
            }

            //#endregion

            var elementToShow = publicFeatures.get$FromRef(refName);
            publicFeatures.show(elementToShow, callback);
        },

        hideByRef: function (refName, callback = undefined) {
            //#region Error Checking

            // If the parameters are not the data types we expect
            if (typeof refName !== 'string'
                || (typeof callback !== 'function' && typeof callback !== 'undefined')) {

                throw new TypeError('This method needs the following types for its parameters: hideByRef(String, Function[optional])');
            }

            //#endregion

            var elementToHide = publicFeatures.get$FromRef(refName);
            publicFeatures.hide(elementToHide, callback);
        },

        show: function (jqueryObj, callback = undefined) {
            //#region Error Checking

            // If the parameters are not the data types we expect
            if ((typeof jqueryObj !== 'object' || !(jqueryObj instanceof jQuery))
                || (typeof callback !== 'function' && typeof callback !== 'undefined')) {

                throw new TypeError('This method needs the following types for its parameters: show(jQuery Object, Function[optional])');
            }

            //#endregion

            // If we have a callback function
            if (callback !== undefined) {

                // Transition the HTML element in and then call the callback function
                jqueryObj.fadeIn(SHOW_OPTIONS.duration, SHOW_OPTIONS.easing, callback);
            }
            // If we do not have a callback function
            else {

                // Transition the HTML element in
                jqueryObj.fadeIn(SHOW_OPTIONS.duration, SHOW_OPTIONS.easing);
            }
        },

        hide: function (jqueryObj, callback = undefined) {
            //#region Error Checking

            // If the parameters are not the data types we expect
            if ((typeof jqueryObj !== 'object' || !(jqueryObj instanceof jQuery))
            || (typeof callback !== 'function' && typeof callback !== 'undefined')) {

                throw new TypeError('This method needs the following types for its parameters: hide(jQuery Object, Function[optional])');
            }

            //#endregion

            // If we have a callback function
            if (callback !== undefined) {

                // Transition the HTML element out and then call the callback function
                jqueryObj.fadeOut(SHOW_OPTIONS.duration, SHOW_OPTIONS.easing, callback);
            }
            // If we do not have a callback function
            else {

                // Transition the HTML element out
                jqueryObj.fadeOut(SHOW_OPTIONS.duration, SHOW_OPTIONS.easing);
            }
        },
    };

    return publicFeatures;
})();
