var createPackageScreenState = {

    unloadState: function (nextState) {

        // Start hiding the create package screen
        ui.get$FromRef('create-package-screen').css('position', 'absolute');
        ui.hideByRef('create-package-screen', function(){
            console.log('done hiding create package screen');
            ui.get$FromRef('create-package-screen').css('position', 'static');
        });
    },

    loadState: function (prevState) {

        // Push this state to the browser history
        history.pushState({storedState: 'create-package-screen'}, 'Create a Care Package', '#create-package-screen');

        // Show the create package screen
        ui.showByRef('create-package-screen', function(){
            console.log('done showing create package screen');

            // Attach a click event handler to the customize message button
            createPackageScreenState.attachCustomizeClickHandler('customize-message-button', 'customize-message-screen');

            // Attach a click event handler to the customize postmates button
            createPackageScreenState.attachCustomizeClickHandler('customize-postmates-button', 'customize-postmates-screen');

            // Attach a click event handler to the customize meme button
            createPackageScreenState.attachCustomizeClickHandler('customize-meme-button', 'customize-meme-screen');

            // Attach a click event handler to the customize spotify button
            createPackageScreenState.attachCustomizeClickHandler('customize-spotify-button', 'customize-spotify-screen');

            ui.get$FromRef('preview-button').on('click', function(){
                console.log(`handling click on the preview button`);

                // START: Code to run immediately upon clicking the use button
                // I'd suggest putting any validation code here; so we can 'return' the function before the transitioning-out code runs.

                //   >>> Replace this line with any code that may make sense here <<<

                // END: Code to run immediately upon clicking the use button

                // Detach the click event handlers from all the buttons
                ui.get$FromRef('customize-buttons').off('click');
                ui.get$FromRef('preview-button').off('click');

                // Switch to the respective customization screen
                sm.switchState('preview-screen');
            });
        });
    },

    attachCustomizeClickHandler: function ($ref, nextState) {
        ui.get$FromRef($ref).on('click', function(){
            console.log(`handling click on the ${$ref} customize button`);

            // Detach the click event handlers from all the buttons
            ui.get$FromRef('customize-buttons').off('click');
            ui.get$FromRef('preview-button').off('click');

            // Switch to the respective customization screen
            sm.switchState(nextState);
        });
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('create-package-screen', '#create-package-screen');
ui.add$ToRef('preview-button', '.preview-button');
ui.add$ToRef('customize-buttons', '.customize-button');
ui.add$ToRef('customize-message-button', '.customize-message-button');
ui.add$ToRef('customize-meme-button', '.customize-meme-button');
ui.add$ToRef('customize-postmates-button', '.customize-postmates-button');
ui.add$ToRef('customize-spotify-button', '.customize-spotify-button');

// Add our new state to the state machine
sm.addState('create-package-screen', createPackageScreenState);
