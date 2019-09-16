var aboutScreenState = {

    unloadState: function (nextState) {

    },

    loadState: function (prevState) {

        // Show the about screen
        ui.showByRef('about-screen', function(){
            console.log('done showing about screen');
        });

        // Attach a click event handler to the get started button
        ui.get$FromRef('get-started-button').on('click', function(){
            console.log('handling click on the get started button');

            // Detach the click event handler from the get started button
            ui.get$FromRef('get-started-button').off('click');

            // Start hiding the about screen
            ui.hideByRef('about-screen', function(){
                console.log('done hiding about screen');

                // Now that we're done hiding the about screen, switch to the create package screen
                sm.switchState('create-package-screen');
            });
        });
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('about-screen', '.about');
ui.add$ToRef('get-started-button', '.get-started-button');

// Add our new state to the state machine
sm.addState('about-screen', aboutScreenState);
