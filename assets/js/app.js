var app = {

    initialize: function(){

    },

    // Set up methods for hiding and showing screens
    hideScreen: function(screenName){
        console.log(`hiding screen: ${screenName}`);

        JQUERY_REF[screenName].addClass('hidden');
    },

    showScreen: function(screenName){
        console.log(`showing screen: ${screenName}`);

        JQUERY_REF[screenName].removeClass('hidden');
    },

    // Set up the method to handle switching between App States
    switchState(newState) {

        // Set the next state so individual states can plan accordingly
        app.nextState = newState;
        
        // If we have a state loaded already, unload it first
        if (app.currentState !== '') {
            console.log(`unloading '${app.currentState}' state`);

            // Unload the current state
            // NOTE: If the 'currentState' variable isn't empty, the state object must exist; so no error checking necessary
            app.stateObjects[app.currentState].unloadState();
        }
        
        // Now load the new state as long as it exists
        if (app.stateObjects.hasOwnProperty(newState)) {
            console.log(`loading '${newState}' state`);

            // Set the previous state so individual states can plan accordingly
            app.previousState = app.currentState;

            // Change the app state to our new state
            app.currentState = newState;

            // Load the new state
            app.stateObjects[app.currentState].loadState();
        }
        else {
            // Raise an exception if the current state doesn't exist since that probably means a typo in the state name occurred when calling the method
            throw `The state '${newState}' does not exist!`;
        }

        // Clear the next state since there isn't one anymore
        app.nextState = '';
    }
};
