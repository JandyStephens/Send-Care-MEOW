var manifestItems = [];
var postmatesResponse;

function createPostmatesData(){
    let name = $("#firstName").val();
    let pickupAddress = $("#pickup-address").val() + ", " + 
                        $("#pickup-city").val() + ", " + 
                        $("#pickup-state").val() + ", " + 
                        $("#pickup-zip").val();

    let friendAddress = $("#friend-address").val() + ", " + 
                        $("#friend-city").val() + ", " + 
                        $("#friend-state").val() + ", " + 
                        $("#friend-zip").val();
    return {
        "manifest": name + "'s care package!",
        "manifest_items": manifestItems,
        "pickup_name": $("#pickup-name").val(),
        "pickup_address": pickupAddress,
        "pickup_phone_number": "4155555555",
        "dropoff_name": name + "'s house",
        "dropoff_address": friendAddress,
        "dropoff_phone_number": $("#phoneNumber").val()
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

        //   >>> Replace this line with any code that may make sense here <<<

        // END: Code to run before this screen starts transitioning in

        // Show the customize postmates screen
        ui.showByRef('customize-postmates-screen', function () {
            console.log('done showing customize postmates screen');

            // START: Code to run once the screen is fully transitioned in
            // I'd suggest putting any changes here you want to activate once the screen is done transitioning in.

            ui.get$FromRef('add-to-cart').on('click', function () {

                // Create new HTML node for cart list when an item is searched
                let newItem = $("<li>");
                let title = $("<h6>");
                let span = $("<span>");
                let searchTerm = { 
                                "name": $("#menu-item-input").val(), 
                                "quantity": 1, 
                                "size": "small" 
                                }

                newItem.addClass("list-group-item d-flex justify-content-between lh-condensed");
                span.addClass("text-muted");
                title.addClass("my-0");

                manifestItems.push(searchTerm);
                span.text("$" + Math.ceil(Math.random() * 15));
                title.text(searchTerm.name);
                newItem.append(title);
                newItem.append(span);

                $(".cart-sub-group").append(newItem);
                console.log(manifestItems);

                
            });
            // Attach a click event handler to the use button (done here so its not clickable until fully on screen)
            ui.get$FromRef('use-postmates-button').on('click', function () {
                console.log('handling click on the use button');

                // START: Code to run immediately upon clicking the use button
                // I'd suggest putting any validation code here; so we can 'return' the function before the transitioning-out code runs.
                // I'd also suggest saving the form data for usage later using 'database.saveObject(saveName, objectToSave)' once the form has been validated.

                $.ajax({
                        url: " https://www.jsea.dev/pm.php",
                        method: "POST",

                        data: createPostmatesData()
                    })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.error("Error from Postmates call: ", error.message);
                    });

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

    clearButtonClickHandlers: function () {

        ui.get$FromRef('use-postmates-button').off('click');
        ui.get$FromRef('cancel-postmates-button').off('click');
        ui.get$FromRef('add-to-cart').off('click');
    },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef('customize-postmates-screen', '#customize-postmates-screen');
ui.add$ToRef('cancel-postmates-button', '.cancel-postmates-button');
ui.add$ToRef('use-postmates-button', '.use-postmates-button');
ui.add$ToRef('add-to-cart', '.add-to-cart');

// Add our new state to the state machine
sm.addState('customize-postmates-screen', customizePostmatesScreenState);