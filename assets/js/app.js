var app = {

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

        // Now switch to the landing page
        sm.switchState('landing-screen');
    },
};

// Start the app
app.initialize();
