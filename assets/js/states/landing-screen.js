var landingScreenState = {

    currentlyScrolling: false,
    currentScrollPosition: $(document).scrollTop(),

    unloadState: function (nextState) {

        // Start hiding the landing screen
        ui.get$FromRef('landing-screen').css('position', 'absolute');
        ui.hideByRef('landing-screen', function(){
            console.log('done hiding landing screen');
            ui.get$FromRef('landing-screen').css('position', 'static');
        });

        // Detach button click events here too (this handles the case of using forward/back navigation buttons causing multiple fade ins/outs)
        landingScreenState.clearButtonClickHandlers();

        // Detach window scroll event handler
        $(window).off('scroll');
    },

    loadState: function (prevState) {

        // Show the landing screen
        ui.showByRef('landing-screen', function(){
            console.log('done showing landing screen');
        });

        // Attach a click event handler to our package icon
        ui.get$FromRef('landing-start-button').on('click', function(){
            console.log('handling click on the landing start button');
            
            // Detach the click event handler from the landing start button
            landingScreenState.clearButtonClickHandlers();

            // Now that we're done hiding the landing screen, switch to the create package screen
            window.location.hash = 'create-package-screen';
        });

        // Attach a scroll event handler to handle auto scrolling between top and bottom
        $(window).on('scroll', function(jQueryEvent){

            if (!landingScreenState.currentlyScrolling) {

                console.log('handling scroll event');

                // Flag us as scrolling manually
                landingScreenState.currentlyScrolling = true;

                // If we're scrolling up
                if ($(document).scrollTop() < landingScreenState.currentScrollPosition) {
                    console.log('scrolling up');

                    TweenMax.to(window, 1, {
                        scrollTo: {
                          y: 0,
                        },
                        onComplete: landingScreenState.handleScrollerStop,
                        onOverwrite: landingScreenState.handleScrollerStop,
                    });
                }
                // If we're scrolling down
                else {
                    console.log('scrolling down');

                    TweenMax.to(window, 1, {
                        scrollTo: {
                          y: $(window).height(),
                        },
                        onComplete: landingScreenState.handleScrollerStop,
                        onOverwrite: landingScreenState.handleScrollerStop,
                    });
                }
            }
        });
    },

    handleScrollerStop: function () {
        landingScreenState.currentlyScrolling = false;
        landingScreenState.currentScrollPosition = $(document).scrollTop();
    },

    clearButtonClickHandlers: function () {

        ui.get$FromRef('landing-start-button').off('click');
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('landing-screen', '#landing-screen');
ui.add$ToRef('landing-start-button', '.landing-start-button');

// Add our new state to the state machine
sm.addState('landing-screen', landingScreenState);
