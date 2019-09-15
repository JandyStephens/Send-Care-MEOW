
// This object is a state machine that handles switching between State Objects held in its 'states' property
// NOTE: State Objects must define the following methods (case-sensitive): unloadState(nextState), loadState(prevState)
var sm = (function(){

    // Define our state machine private features here to take advantage of closures.
    // We don't want anybody affecting our state machine's code in ways they're not supposed to.
    var privateFeatures = {
    
        // Set up the different variables needed to switch between States
        states: {},
        currentState: '',
    };

    // Define our state machine public features here which will allow users to use it.
    var publicFeatures = {

        // Set up the method to add a new state to the state machine
        addState: function(stateName, stateObject) {

            //#region Error Checking

            // If the parameters are not the data types we expect
            if (typeof stateName !== 'string'
                || typeof stateObject !== 'object'
                || typeof stateObject === 'function'
                || stateObject === null) {

                throw new TypeError('This method needs the following types for its parameters: addState(String, Object)');
            }

            // If a state already exists by that name
            if (stateName in privateFeatures.states) {

                throw new Error(`Cannot add state! '${stateName}' already exists in this state machine!`);
            }

            // If the added state object has not defined our needed methods
            if (!('loadState' in stateObject)
                || !('unloadState' in stateObject)) {

                throw new Error(`Cannot add state! '${stateName}' must define the following methods (case-sensitive): unloadState(nextState), loadState(prevState)`);
            }

            //#endregion

            // Add the state to our state machine
            privateFeatures.states[stateName] = stateObject;
        },

        // Set up the method to remove an existing state from the state machine
        removeState: function(stateName) {

            //#region Error Checking

            // If the parameter is not the data type we expect
            if (typeof stateName !== 'string') {

                throw new TypeError('This method needs the following types for its parameters: removeState(String)');
            }

            // If a state by that name does not exist in the state machine
            if (!(stateName in privateFeatures.states)) {

                throw new Error(`'${stateName}' doesn't exist in this state machine!`);
            }

            //#endregion

            // Remove the state from our state machine
            delete privateFeatures.states[stateName];
        },

        // Set up the method to handle switching between States
        switchState: function(stateName) {

            //#region Error Checking

            // If the parameter is not the data type we expect
            if (typeof stateName !== 'string') {

                throw new TypeError('This method needs the following types for its parameters: switchState(String)');
            }

            // If a state by that name does not exist in the state machine
            if (!(stateName in privateFeatures.states)) {

                throw new Error(`'${stateName}' doesn't exist in this state machine!`);
            }

            //#endregion

            // Store the next state so individual states can plan accordingly
            var nextState = stateName;

            // If we have a state loaded already, unload it first
            if (privateFeatures.currentState !== '') {
                console.log(`unloading '${privateFeatures.currentState}' state`);

                // Unload the current state
                // NOTE: If the 'currentState' variable isn't empty, the state object must exist; so no error checking necessary
                privateFeatures.states[privateFeatures.currentState].unloadState(nextState);
            }

            console.log(`loading '${stateName}' state`);

            // Store the previous state so individual states can plan accordingly
            var previousState = privateFeatures.currentState;

            // Change the state machine's state to our new state
            privateFeatures.currentState = stateName;

            // Load the new state
            privateFeatures.states[privateFeatures.currentState].loadState(previousState);
        },
    };

    // Return our public collection of features
    return publicFeatures;
})();
