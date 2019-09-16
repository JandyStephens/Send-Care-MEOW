var customizeSpotifyScreenState = {

    unloadState: function (nextState) {

        // START: General code to run after this screen finishes transitioning out and immediately before the state switches

        //   >>> Replace this line with any code that may make sense here <<<

        // END: General code to run after this screen finishes transitioning out and immediately before the state switches
    },
    
    loadState: function (prevState) {

        // START: Code to run before this screen starts transitioning in
        // I'd suggest putting any changes here you want to be visible on the screen when it transitions in.

        //   >>> Replace this line with any code that may make sense here <<<

        // END: Code to run before this screen starts transitioning in

        // Show the customize spotify screen
        ui.showByRef('customize-spotify-screen', function(){
            console.log('done showing customize spotify screen');

            // START: Code to run once the screen is fully transitioned in
            // I'd suggest putting any changes here you want to activate once the screen is done transitioning in.

            //   >>> Replace this line with any code that may make sense here <<<

            // END: Code to run once the screen is fully transitioned in

            // Attach a click event handler to the use button (done here so its not clickable until fully on screen)
            ui.get$FromRef('use-spotify-button').on('click', function(){
                console.log('handling click on the use button');

                // START: Code to run immediately upon clicking the use button
                // I'd suggest putting any validation code here; so we can 'return' the function before the transitioning-out code runs.
                // I'd also suggest saving the form data for usage later using 'database.saveObject(saveName, objectToSave)' once the form has been validated.

                //   >>> Replace this line with any code that may make sense here <<<

                // END: Code to run immediately upon clicking the use button

                // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
                ui.get$FromRef('use-spotify-button').off('click');
                ui.get$FromRef('cancel-spotify-button').off('click');

                // Start hiding the customization screen
                ui.hideByRef('customize-spotify-screen', function(){
                    console.log('done hiding customize spotify screen');

                    // START: Code to run right before going back to the create package state

                    //   >>> Replace this line with any code that may make sense here <<<

                    // END: Code to run right before going back to the create package state

                    // Now that we're done hiding the customization screen, switch back to the create package screen
                    sm.switchState('create-package-screen');
                });
            });

            // Attach a click event handler to the cancel button (done here so its not clickable until fully on screen)
            ui.get$FromRef('cancel-spotify-button').on('click', function(){
                console.log('handling click on the cancel button');

                // START: Code to run immediately upon clicking the cancel button
                // I'd suggest either clearing the form or resetting it to saved data here or right before the transition back to the create package state. Depends on if you want the user to see the cancellation or not.

                //   >>> Replace this line with any code that may make sense here <<<

                // END: Code to run immediately upon clicking the cancel button

                // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
                ui.get$FromRef('use-spotify-button').off('click');
                ui.get$FromRef('cancel-spotify-button').off('click');

                // Start hiding the customization screen
                ui.hideByRef('customize-spotify-screen', function(){
                    console.log('done hiding customize spotify screen');

                    // START: Code to run right before going back to the create package state
                    // I'd suggest either clearing the form or resetting it to saved data here or immediately upon clicking the cancel button. Depends on if you want the user to see the cancellation or not.

                    //   >>> Replace this line with any code that may make sense here <<<

                    // END: Code to run right before going back to the create package state

                    // Now that we're done hiding the customization screen, switch back to the create package screen
                    sm.switchState('create-package-screen');
                });
            });
        });
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('customize-spotify-screen', '.spotify-form');
ui.add$ToRef('cancel-spotify-button', '.cancel-spotify-button');
ui.add$ToRef('use-spotify-button', '.use-spotify-button');

// Add our new state to the state machine
sm.addState('customize-spotify-screen', customizeSpotifyScreenState);
