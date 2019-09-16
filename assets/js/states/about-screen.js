var aboutScreenState = {

    unloadState: function (nextState) {

    },

    loadState: function (prevState) {

        // Show the about screen
        ui.showByRef('about-screen', function(){
            console.log('done showing about screen');
        });
    },
};

sm.addState('about-screen', aboutScreenState);
