var manifestItems = [];

function storePostmatesFormValues(){
    database.saveObject('postmates-form-data', {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        phoneNumber: $('#phoneNumber').val(),
        friendAddress: $("#friend-address").val(),
        friendCity: $("#friend-city").val(),
        friendState: $("#friend-state").val(),
        friendZip: $("#friend-zip").val(),
        pickupName: $('#pickup-name').val(),
        pickupAddress: $("#pickup-address").val(), 
        pickupCity: $("#pickup-city").val(),
        pickupState: $("#pickup-state").val(), 
        pickupZip: $("#pickup-zip").val(),
        manifestItems: manifestItems,
    });
}

function loadPostmatesFormValues(){
    var savedPostmatesFormData = database.loadObject('postmates-form-data');

    $('#firstName').val(savedPostmatesFormData.firstName);
    $('#lastName').val(savedPostmatesFormData.lastName);
    $('#phoneNumber').val(savedPostmatesFormData.phoneNumber);
    $("#friend-address").val(savedPostmatesFormData.friendAddress);
    $("#friend-city").val(savedPostmatesFormData.friendCity);
    $("#friend-state").val(savedPostmatesFormData.friendState);
    $("#friend-zip").val(savedPostmatesFormData.friendZip);
    $('#pickup-name').val(savedPostmatesFormData.pickupName);
    $("#pickup-address").val(savedPostmatesFormData.pickupAddress);
    $("#pickup-city").val(savedPostmatesFormData.pickupCity);
    $("#pickup-state").val(savedPostmatesFormData.pickupState);
    $("#pickup-zip").val(savedPostmatesFormData.pickupZip);

    manifestItems = [];
    $('.cart-sub-group').empty();
    for (let i = 0; i < savedPostmatesFormData.manifestItems.length; i++) {

        customizePostmatesScreenState.pushNewItemToMenu(savedPostmatesFormData.manifestItems[i].name);
    }
}

var customizePostmatesScreenState = {

    unloadState: function (nextState) {

        // Start hiding the customization screen
        ui.get$FromRef('customize-postmates-screen').css('position', 'absolute');
        ui.hideByRef('customize-postmates-screen', function () {
            console.log('done hiding customize postmates screen');
            ui.get$FromRef('customize-postmates-screen').css('position', 'static');
        });

        // Detach button click events here too (this handles the case of using forward/back navigation buttons causing multiple fade ins/outs)
        customizePostmatesScreenState.clearButtonClickHandlers();

        // START: General code to run after this screen finishes transitioning out and immediately before the state switches

        //   >>> Replace this line with any code that may make sense here <<<

        // END: General code to run after this screen finishes transitioning out and immediately before the state switches
    },

    loadState: function (prevState) {

        // START: Code to run before this screen starts transitioning in
        // I'd suggest putting any changes here you want to be visible on the screen when it transitions in.

        if (database.exists('postmates-form-data')) {

            loadPostmatesFormValues();
        }

        // END: Code to run before this screen starts transitioning in

        // Show the customize postmates screen
        ui.showByRef('customize-postmates-screen', function () {
            console.log('done showing customize postmates screen');

            // START: Code to run once the screen is fully transitioned in
            // I'd suggest putting any changes here you want to activate once the screen is done transitioning in.

            ui.get$FromRef('add-to-cart').on('click', function () {

                // If there is an item to add
                if ($("#menu-item-input").val().trim().length !== 0) {

                    customizePostmatesScreenState.pushNewItemToMenu($("#menu-item-input").val().trim());
                    $("#menu-item-input").val('');
                }
            });

            ui.get$('#menu-item-input').on('keydown', function (jqueryEvent) {

                // If we've pressed an enter key
                if (jqueryEvent.which == 13) {

                    // Prevent the form from actually getting submitted
                    jqueryEvent.preventDefault();

                    // If there is an item to add
                    if ($("#menu-item-input").val().trim().length !== 0) {

                        customizePostmatesScreenState.pushNewItemToMenu($("#menu-item-input").val().trim());
                        $("#menu-item-input").val('');
                    }
                }
            });

            // Attach a click event handler to the use button (done here so its not clickable until fully on screen)
            ui.get$('.postmates-order-creator').on('submit', function (jqueryEvent) {
                console.log('handling click on the use button');
                
                // Prevent the form from actually submitting
                jqueryEvent.preventDefault();

                // Check to make sure we have everything we need to make an order
                // NOTE: Everything else is being validated by HTML5
                if (manifestItems.length === 0) {

                    ui.get$('.add-item-needed').show();
                    return;
                }
                // If we have everything we need, make sure the validation text is hidden
                else {
                    
                    ui.get$('.add-item-needed').hide();
                }

                console.log('WHy am i running')
                // START: Code to run immediately upon clicking the use button
                // I'd suggest putting any validation code here; so we can 'return' the function before the transitioning-out code runs.
                // I'd also suggest saving the form data for usage later using 'database.saveObject(saveName, objectToSave)' once the form has been validated.

                // Store the postmates form data into our database
                storePostmatesFormValues();

                // END: Code to run immediately upon clicking the use button

                // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
                customizePostmatesScreenState.clearButtonClickHandlers();

                // Switch back to the create package screen
                window.location.hash = 'create-package-screen';
            });

            // Attach a click event handler to the cancel button (done here so its not clickable until fully on screen)
            ui.get$FromRef('cancel-postmates-button').on('click', function () {
                console.log('handling click on the cancel button');

                // START: Code to run immediately upon clicking the cancel button
                // I'd suggest clearing the form or resetting it to saved data here.

                //   >>> Replace this line with any code that may make sense here <<<

                // END: Code to run immediately upon clicking the cancel button

                // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
                customizePostmatesScreenState.clearButtonClickHandlers();

                // Switch back to the create package screen
                window.location.hash = 'create-package-screen';
            });
        });
    },

    pushNewItemToMenu: function (itemName) {

        // Create new HTML node for cart list when an item is searched
        let newItem = $("<li>");
        let title = $("<h6>");
        // let span = $("<span>");
        let searchTerm = { 
            "name": itemName, 
            "quantity": 1, 
            "size": "small" 
        };

        newItem.addClass("list-group-item d-flex justify-content-between lh-condensed");
        // span.addClass("text-muted");
        title.addClass("my-0");

        manifestItems.push(searchTerm);
        // span.text("$" + Math.ceil(Math.random() * 15));
        title.text(searchTerm.name);
        newItem.append(title);
        // newItem.append(span);

        // If there's nothing in the cart, clear the "Empty" notifier
        if ($('.cart-sub-group').children().eq(0).text() === '(Empty)') {
            $('.cart-sub-group').empty();
        }

        $(".cart-sub-group").append(newItem);
        console.log(manifestItems);

        $('.package-item-count').text(manifestItems.length);
    },

    clearButtonClickHandlers: function () {

        ui.get$FromRef('use-postmates-button').off('click');
        ui.get$FromRef('cancel-postmates-button').off('click');
        ui.get$FromRef('add-to-cart').off('click');
        ui.get$('#menu-item-input').off('keydown');
        ui.get$('.postmates-order-creator').off('submit');
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('customize-postmates-screen', '#customize-postmates-screen');
ui.add$ToRef('cancel-postmates-button', '.cancel-postmates-button');
ui.add$ToRef('use-postmates-button', '.use-postmates-button');
ui.add$ToRef('add-to-cart', '.add-to-cart');

// Add our new state to the state machine
sm.addState('customize-postmates-screen', customizePostmatesScreenState);