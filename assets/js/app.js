var app = (function(){

    var privateFeatures = {

    };

    var publicFeatures = {

        initialize: function(){

            // Open the database we'll be using to save data
            database.open();

            // Attach an event handler to the page unloading; so we can safely close the database if we need to
            $(window).on('unload', function(){
                console.log('handling page unloading');

                // Close the database before leaving the page to avoid any sort of issues if we're utilizing a database stream
                database.close();
            });

            // Hide all sections to begin with
            $('section').hide();

            // Set our starting page
            var startingPage = 'landing-screen';

            // If the URL of the page has a hashtag attached
            if (window.location.hash !== '') {

                // Change our starting page to the correct page
                startingPage = window.location.hash.slice(1);
            }

            // Now switch to the starting page
            sm.switchState(startingPage);

            // Attach an event handler to the page popping a state
            $(window).on('popstate', function(jQueryEvent){

                // Now switch to the state it should switch to
                sm.switchState(jQueryEvent.originalEvent.state.storedState)
            });
        },
    };

    return publicFeatures;
})();

// Start the app
app.initialize();
