var previewScreenState = {

    unloadState: function (nextState) {

        // Start hiding the customization screen
        ui.get$FromRef('preview-screen').css('position', 'absolute');
        ui.hideByRef('preview-screen', function(){
            console.log('done hiding preview screen');
            ui.get$FromRef('preview-screen').css('position', 'static');
        });

        // START: General code to run after this screen finishes transitioning out and immediately before the state switches

        // Destroy the spotify player
        ui.get$FromRef('spotify-player-container').empty();

        // END: General code to run after this screen finishes transitioning out and immediately before the state switches
    },
    
    loadState: function (prevState) {

        window.history.pushState({storedState: 'preview-screen'}, 'Care Package Preview', '#preview-screen')

        // START: Code to run before this screen starts transitioning in
        // I'd suggest putting any changes here you want to be visible on the screen when it transitions in.

        // If we have a spotify playlist set
        if (database.exists('spotify-playlist')) {

            var playlistID = database.loadObject('spotify-playlist').playlistID;
            ui.get$FromRef('spotify-player-container').html(`<iframe class="spotify-player" src="https://open.spotify.com/embed/playlist/${playlistID}" width="600" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`);
        }

        // END: Code to run before this screen starts transitioning in

        // Show the preview screen
        ui.showByRef('preview-screen', function(){
            console.log('done showing preview screen');

            // START: Code to run once the screen is fully transitioned in
            // I'd suggest putting any changes here you want to activate once the screen is done transitioning in.

            //   >>> Replace this line with any code that may make sense here <<<

            // END: Code to run once the screen is fully transitioned in

            // Attach a click event handler to the use button (done here so its not clickable until fully on screen)
            ui.get$FromRef('use-preview-button').on('click', function(){
                console.log('handling click on the use button');

                // START: Code to run immediately upon clicking the use button
                // I'd suggest putting the code to send the care package here.

                //   >>> Replace this line with any code that may make sense here <<<

                // END: Code to run immediately upon clicking the use button

                // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
                ui.get$FromRef('use-preview-button').off('click');
                ui.get$FromRef('cancel-preview-button').off('click');

                // Switch to the package sent screen
                sm.switchState('package-sent-screen');
            });

            // Attach a click event handler to the cancel button (done here so its not clickable until fully on screen)
            ui.get$FromRef('cancel-preview-button').on('click', function(){
                console.log('handling click on the cancel button');

                // START: Code to run immediately upon clicking the cancel button

                //   >>> Replace this line with any code that may make sense here <<<

                // END: Code to run immediately upon clicking the cancel button

                // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
                ui.get$FromRef('use-preview-button').off('click');
                ui.get$FromRef('cancel-preview-button').off('click');

                // Switch back to the create package screen
                sm.switchState('create-package-screen');
            });
        });
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('preview-screen', '#preview-screen');

ui.add$ToRef('spotify-player-container', '.spotify-player-container');

ui.add$ToRef('cancel-preview-button', '.cancel-preview-button');
ui.add$ToRef('use-preview-button', '.use-preview-button');

// Add our new state to the state machine
sm.addState('preview-screen', previewScreenState);
