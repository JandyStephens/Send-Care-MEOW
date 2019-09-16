var landingScreenState = {

    unloadState: function (nextState) {

    },

    loadState: function (prevState) {

        // Show the landing screen
        ui.showByRef('landing-screen', function(){
            console.log('done showing landing screen');
        });

        // Attach a click event handler to our package icon
        ui.get$FromRef('landing-start-button').on('click', function(){
            console.log('handling click on the landing start button');
            
            // Detach the click event handler from the landing start button
            ui.get$FromRef('landing-start-button').off('click');

            // Start hiding the landing screen
            ui.hideByRef('landing-screen', function(){
                console.log('done hiding landing screen');

                // Now that we're done hiding the landing screen, switch to the about screen
                sm.switchState('create-package-screen');
            });
        });
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('landing-screen', '#landing');
ui.add$ToRef('landing-start-button', '.landing-start-button');

// Add our new state to the state machine
sm.addState('landing-screen', landingScreenState);
