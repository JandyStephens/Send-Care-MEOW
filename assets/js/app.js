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

            // Set our starting page
            var startingPage = 'landing-screen';

            // If the URL of the page has a hashtag attached
            if (window.location.hash !== '') {

                // Change our starting page to the correct page
                startingPage = window.location.hash.slice(1);
            }

            // Now switch to the starting page
            window.location.hash = startingPage;

            // If we're not already switching states from setting the hash above
            if (!sm.isSwitching()) {

                // And if we're not already in this state
                if (sm.getCurrentState() !== window.location.hash.slice(1)) {

                    // Switch to the starting page manually
                    sm.switchState(startingPage);
                }
            }

            // Attach an event handler to the window location hash change event
            $(window).on('hashchange', function(jQueryEvent){

                // If we're not already in this state
                if (sm.getCurrentState() !== window.location.hash.slice(1)){

                    // Switch to the state specified by the new window location hash
                    sm.switchState(window.location.hash.slice(1)); // Slicing 1 here is grabbing the string minus the first character

                    // Scroll to the top
                    TweenMax.to(window, 1, {
                        scrollTo: {
                          y: 0,
                        },
                    });
                }
            });
        },
    };

    return publicFeatures;
})();

// Start the app
app.initialize();
