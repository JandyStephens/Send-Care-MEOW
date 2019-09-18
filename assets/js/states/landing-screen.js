var landingScreenState = {

    unloadState: function (nextState) {

        // Start hiding the landing screen
        ui.get$FromRef('landing-screen').css('position', 'absolute');
        ui.hideByRef('landing-screen', function(){
            console.log('done hiding landing screen');
            ui.get$FromRef('landing-screen').css('position', 'static');
        });

        // Detach button click events here too (this handles the case of using forward/back navigation buttons causing multiple fade ins/outs)
        landingScreenState.clearButtonClickHandlers();
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
            landingScreenState.clearButtonClickHandlers();

            // Now that we're done hiding the landing screen, switch to the create package screen
            window.location.hash = 'create-package-screen';
        });
    },

    clearButtonClickHandlers: function () {

        ui.get$FromRef('landing-start-button').off('click');
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('landing-screen', '#landing-screen');
ui.add$ToRef('landing-start-button', '.landing-start-button');

// Add our new state to the state machine
sm.addState('landing-screen', landingScreenState);
