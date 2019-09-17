var customizeSpotifyScreenState = {

    playlistID: '',
    savedPlaylistID: '',

    unloadState: function (nextState) {

        // Start hiding the customization screen
        ui.get$FromRef('customize-spotify-screen').css('position', 'absolute');
        ui.hideByRef('customize-spotify-screen', function(){
            console.log('done hiding customize spotify screen');
            ui.get$FromRef('customize-spotify-screen').css('position', 'static');
        });

        // START: General code to run after this screen finishes transitioning out and immediately before the state switches

        //   >>> Replace this line with any code that may make sense here <<<

        // END: General code to run after this screen finishes transitioning out and immediately before the state switches
    },
    
    loadState: function (prevState) {

        // Push this state to the browser history
        history.pushState({storedState: 'customize-spotify-screen'}, 'Customize your Spotify playlist', '#customize-spotify-screen');

        // START: Code to run before this screen starts transitioning in
        // I'd suggest putting any changes here you want to be visible on the screen when it transitions in.

        // Check if there is a stored spotify playlist already
        if (database.exists('spotify-playlist')) {

            // Set the project ID in this state object
            customizeSpotifyScreenState.playlistID = database.loadObject('spotify-playlist').playlistID;
            customizeSpotifyScreenState.savedPlaylistID = customizeSpotifyScreenState.playlistID;

            // Disable the relevant button
            ui.get$FromRef('select-playlist-buttons').filter(`button[data-playlist-id="${customizeSpotifyScreenState.playlistID}"]`).attr('disabled', true);
        }

        // END: Code to run before this screen starts transitioning in

        // Show the customize spotify screen
        ui.showByRef('customize-spotify-screen', function(){
            console.log('done showing customize spotify screen');

            // START: Code to run once the screen is fully transitioned in
            // I'd suggest putting any changes here you want to activate once the screen is done transitioning in.

            // Attach click event handlers to the playlist selection buttons
            ui.get$FromRef('select-playlist-buttons').on('click', function(){

                // Grab the playlist ID and store it in our state object
                customizeSpotifyScreenState.playlistID = $(this).attr('data-playlist-id');

                // Filter our buttons by ones that are disabled (should be only one)
                ui.get$FromRef('select-playlist-buttons').filter(':disabled').attr('disabled', false);

                // Now disable our clicked button
                $(this).attr('disabled', true);
            });

            // END: Code to run once the screen is fully transitioned in

            // Attach a click event handler to the use button (done here so its not clickable until fully on screen)
            ui.get$FromRef('use-spotify-button').on('click', function(){
                console.log('handling click on the use button');

                // START: Code to run immediately upon clicking the use button
                // I'd suggest putting any validation code here; so we can 'return' the function before the transitioning-out code runs.
                // I'd also suggest saving the form data for usage later using 'database.saveObject(saveName, objectToSave)' once the form has been validated.

                // Check if we have a new playlistID stored
                if (customizeSpotifyScreenState.playlistID !== customizeSpotifyScreenState.savedPlaylistID) {

                    // Save our playlist in the database
                    database.saveObject('spotify-playlist', {
                        playlistID: customizeSpotifyScreenState.playlistID
                    });

                    // Update our saved playlist ID
                    customizeSpotifyScreenState.savedPlaylistID = customizeSpotifyScreenState.playlistID;
                }

                // Detach the click handlers from the playlist selection buttons
                ui.get$FromRef('select-playlist-buttons').off('click');

                // END: Code to run immediately upon clicking the use button

                // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
                ui.get$FromRef('use-spotify-button').off('click');
                ui.get$FromRef('cancel-spotify-button').off('click');

                // Switch back to the create package screen
                sm.switchState('create-package-screen');
            });

            // Attach a click event handler to the cancel button (done here so its not clickable until fully on screen)
            ui.get$FromRef('cancel-spotify-button').on('click', function(){
                console.log('handling click on the cancel button');

                // START: Code to run immediately upon clicking the cancel button
                // I'd suggest  clearing the form or resetting it to saved data here.

                // Check if we have a playlistID saved
                if (customizeSpotifyScreenState.savedPlaylistID !== '') {

                    // Update our playlist ID
                    customizeSpotifyScreenState.playlistID = customizeSpotifyScreenState.savedPlaylistID;

                    // Enable any disabled button that exists
                    ui.get$FromRef('select-playlist-buttons').filter(':disabled').attr('disabled', false);

                    // Now disable our saved playlist button
                    ui.get$FromRef('select-playlist-buttons').filter(`button[data-playlist-id="${customizeSpotifyScreenState.playlistID}"]`).attr('disabled', true);
                }

                // Detach the click handlers from the playlist selection buttons
                ui.get$FromRef('select-playlist-buttons').off('click');

                // END: Code to run immediately upon clicking the cancel button

                // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
                ui.get$FromRef('use-spotify-button').off('click');
                ui.get$FromRef('cancel-spotify-button').off('click');

                // Switch back to the create package screen
                sm.switchState('create-package-screen');
            });
        });
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('customize-spotify-screen', '#customize-spotify-screen');

ui.add$ToRef('select-playlist-buttons', '.spotify-item button');
ui.add$ToRef('cancel-spotify-button', '.cancel-spotify-button');
ui.add$ToRef('use-spotify-button', '.use-spotify-button');

// Add our new state to the state machine
sm.addState('customize-spotify-screen', customizeSpotifyScreenState);
