var previewScreenState = {
  unloadState: function (nextState) {
    // Start hiding the customization screen
    ui.get$FromRef("preview-screen").css("position", "absolute");
    ui.hideByRef("preview-screen", function () {
      console.log("done hiding preview screen");
      ui.get$FromRef("preview-screen").css("position", "static");
    });

    // Detach button click events here too (this handles the case of using forward/back navigation buttons causing multiple fade ins/outs)
    previewScreenState.clearButtonClickHandlers();

    // START: General code to run after this screen finishes transitioning out and immediately before the state switches

    // Destroy the spotify player
    ui.get$FromRef("spotify-player-container").empty();

    // END: General code to run after this screen finishes transitioning out and immediately before the state switches
  },

  loadState: function (prevState) {
    // START: Code to run before this screen starts transitioning in
    // I'd suggest putting any changes here you want to be visible on the screen when it transitions in.

    // If we have a spotify playlist set
    if (database.exists("spotify-playlist")) {
      var playlistID = database.loadObject("spotify-playlist").playlistID;
      ui.get$FromRef("spotify-player-container").html(
        `<iframe class="spotify-player" src="https://open.spotify.com/embed/playlist/${playlistID}" width="600" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
      );
    }

    // END: Code to run before this screen starts transitioning in

    // Check to see if we have an order to accept
    if (database.exists('postmates-form-data')) {

      // Grab the postmates form data from the database
      var savedPostmatesFormData = database.loadObject('postmates-form-data');

      // Show the postmates section for the order
      $('.postmates-order').show();

      // Display the manifest items
      var manifestList = '';
      savedPostmatesFormData.manifestItems.forEach(function(value, index){
        if (index !== 0) {
          manifestList += ', ';
        }
        manifestList += value.name;
      });
      $('.order-manifest').text(manifestList);

      // Attach a click handler to the accept button
      $(".accept-order").click(function(){
        console.log('handling click on the accept order button');
  
        // Disable this click event here so that orders aren't placed multiple times accidentally
        $('.accept-order').attr('disabled', true);

        // Clear the order error if it exists
        $('.order-error').text('');

        // Change the button to say 'Accepting' instead of 'Accept'
        $('.accept-order').text('Accepting Order...');
  
        // Declare this here to take advantage of Closure scoping
        let responseCleaned;
  
        $.ajax({
          url: " https://www.jsea.dev/pm.php", // This pm.php file is also in the repo at the root level with API keys removed. It was required to resolve the CORS issue of Postmates' authentication not allowing direct AJAX calls.
          method: "POST",
          data: previewScreenState.createPostmatesData(),
        })
        .done(function (response) {
          // NOTE: This solves a weird, but consistent, issue where a '1' is tagged on to the end of each 'response' string
          // console.log(response); // Uncomment to see the issue this solves
          responseCleaned = JSON.parse(response.slice(0, response.length - 1));
  
          // Remove the accept order button's click event here so that orders aren't placed multiple times
          $('.accept-order').off('click');
  
          // Now programmatically open a new window with JavaScript, with no opener or referrer, and set to the screen size
          window.open(responseCleaned.tracking_url, '_blank', `noopener,noreferrer,width=${screen.width},height=${screen.height}`);
  
          // Change the button to say 'View' instead of 'Accept' now that it has been accepted
          $('.accept-order').text('View Postmates Order!');
  
          // Finally, attach a new click event handler that just opens the Order Delivery screen in case it got closed by the user accidentally
          $('.accept-order').on('click', function () {
            console.log('opening order delivery again');
  
            // Programmatically open a new window with JavaScript, with no opener or referrer, and set to the screen size
            // NOTE: We still have access to 'responseCleaned' here because of Closures
            window.open(responseCleaned.tracking_url, '_blank', `noopener,noreferrer,width=${screen.width},height=${screen.height}`);
          });
        })
        .fail(function (error) {
          console.error("Error from Postmates call: ", error.message);
  
          // Show the order error so the sender can correct the issue
          $('.order-error').text(error.message);
  
          // Set our text to say 'Accept' again to allow them to make another attempt at accepting the request
          $('.accept-order').text('Try Accepting Postmates Order Again!');
        })
        .always(function () {
  
          // Re-enable the order button here now that the AJAX request is complete
          $('.accept-order').attr('disabled', false);
        })
      });
    }
    // If there is no postmates order to accept
    else {

      // Hide the postmates section for the non-existent order
      $('.postmates-order').hide();
    }

    // Show the preview screen
    ui.showByRef("preview-screen", function () {
      console.log("done showing preview screen");

      // START: Code to run once the screen is fully transitioned in
      // I'd suggest putting any changes here you want to activate once the screen is done transitioning in.


      $(".showMsg").empty();
      var pullMsg = localStorage.getItem("user-message");
      var msgArea = $("<p>");
      msgArea.text(pullMsg);
      $(".showMsg").append(msgArea);

      $(".showGifs").empty();
      for (i = 0; i < 3; i++) {
        var gifUrl = localStorage.getItem("gif" + i);
        var imgDiv = $("<img>");
        imgDiv.attr("src", gifUrl).attr("class","gif-images");
        $(".showGifs").append(imgDiv);
      }

      // END: Code to run once the screen is fully transitioned in

      // Attach a click event handler to the use button (done here so its not clickable until fully on screen)
      ui.get$FromRef("use-preview-button").on("click", function () {
        console.log("handling click on the use button");

        // START: Code to run immediately upon clicking the use button
        // I'd suggest putting the code to send the care package here.

        //   >>> Replace this line with any code that may make sense here <<<

        // END: Code to run immediately upon clicking the use button

        // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
        previewScreenState.clearButtonClickHandlers();

        // Switch to the package sent screen
        window.location.hash = "package-sent-screen";
      });

      // Attach a click event handler to the cancel button (done here so its not clickable until fully on screen)
      ui.get$FromRef("cancel-preview-button").on("click", function () {
        console.log("handling click on the cancel button");

        // START: Code to run immediately upon clicking the cancel button

        //   >>> Replace this line with any code that may make sense here <<<

        // END: Code to run immediately upon clicking the cancel button

        // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
        previewScreenState.clearButtonClickHandlers();

        // Switch back to the create package screen
        window.location.hash = "create-package-screen";
      });
    });
  },

  clearButtonClickHandlers: function () {
    ui.get$FromRef("use-preview-button").off("click");
    ui.get$FromRef("cancel-preview-button").off("click");
    ui.get$(".accept-order").off("click");
  },

  createPostmatesData: function () {
    console.log('creating postmates data');

    // Grab the postmates form data from the database
    var savedPostmatesFormData = database.loadObject('postmates-form-data');

    let name = savedPostmatesFormData.firstName + " " + savedPostmatesFormData.lastName;

    let pickupAddress = savedPostmatesFormData.pickupAddress + ", " + 
                        savedPostmatesFormData.pickupCity + ", " + 
                        savedPostmatesFormData.pickupState + ", " + 
                        savedPostmatesFormData.pickupZip;

    let friendAddress = savedPostmatesFormData.friendAddress + ", " + 
                        savedPostmatesFormData.friendCity + ", " + 
                        savedPostmatesFormData.friendState + ", " + 
                        savedPostmatesFormData.friendZip;

    let manifestItems = savedPostmatesFormData.manifestItems;

    return {
      "manifest": name + "'s care package!",
      "manifest_items": manifestItems,
      "pickup_name": savedPostmatesFormData.pickupName,
      "pickup_address": pickupAddress,
      "pickup_phone_number": "4155555555",
      "dropoff_name": name + "'s place",
      "dropoff_address": friendAddress,
      "dropoff_phone_number": savedPostmatesFormData.phoneNumber
    };
  },
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef("preview-screen", "#preview-screen");

ui.add$ToRef("spotify-player-container", ".spotify-player-container");

ui.add$ToRef("cancel-preview-button", ".cancel-preview-button");
ui.add$ToRef("use-preview-button", ".use-preview-button");

// Add our new state to the state machine
sm.addState("preview-screen", previewScreenState);