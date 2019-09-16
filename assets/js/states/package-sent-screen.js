var packageSentScreenState = {

    unloadState: function (nextState) {

    },

    loadState: function (prevState) {

        // Show the package sent screen
        ui.showByRef('package-sent-screen', function(){
            console.log('done showing package sent screen');
        });
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('package-sent-screen', '.package-sent');

// Add our new state to the state machine
sm.addState('package-sent-screen', packageSentScreenState);
