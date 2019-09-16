var packageSentScreenState = {

    unloadState: function (nextState) {

        // Hide the package sent screen
        ui.get$FromRef('package-sent-screen').css('position', 'absolute');
        ui.hideByRef('package-sent-screen', function(){
            console.log('done hiding package sent screen');
            ui.get$FromRef('package-sent-screen').css('position', 'static');
        });
    },

    loadState: function (prevState) {

        history.pushState({storedState: 'package-sent-screen'}, 'Care Package Sent!', '#package-sent-screen');

        // Show the package sent screen
        ui.showByRef('package-sent-screen', function(){
            console.log('done showing package sent screen');
        });
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('package-sent-screen', '#package-sent-screen');

// Add our new state to the state machine
sm.addState('package-sent-screen', packageSentScreenState);
