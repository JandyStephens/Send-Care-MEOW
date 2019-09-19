var customizeMessageScreenState = {
  unloadState: function(nextState) {
    // Start hiding the customization screen
    ui.get$FromRef("customize-message-screen").css("position", "absolute");
    ui.hideByRef("customize-message-screen", function() {
      console.log("done hiding customize message screen");
      ui.get$FromRef("customize-message-screen").css("position", "static");
    });

    // Detach button click events here too (this handles the case of using forward/back navigation buttons causing multiple fade ins/outs)
    customizeMessageScreenState.clearButtonClickHandlers();

    // START: General code to run after this screen finishes transitioning out and immediately before the state switches

    //   >>> Replace this line with any code that may make sense here <<<

    // END: General code to run after this screen finishes transitioning out and immediately before the state switches
  },

  loadState: function(prevState) {
    // START: Code to run before this screen starts transitioning in
    // I'd suggest putting any changes here you want to be visible on the screen when it transitions in.

    if (localStorage.getItem('user-message') !== null) {
        $(".message-input").val(localStorage.getItem("user-message"));
    }
    else {
        $(".message-input").val("");
    }
    // END: Code to run before this screen starts transitioning in

    // Show the customize message screen
    ui.showByRef("customize-message-screen", function() {
      console.log("done showing customize message screen");

      // START: Code to run once the screen is fully transitioned in
      // I'd suggest putting any changes here you want to activate once the screen is done transitioning in.

      //   >>> Replace this line with any code that may make sense here <<<

      // END: Code to run once the screen is fully transitioned in

      // Attach a click event handler to the use button (done here so its not clickable until fully on screen)
      ui.get$FromRef("use-message-button").on("click", function() {
        console.log("handling click on the use button");

        // START: Code to run immediately upon clicking the use button

        //When button clicked, grab text value
        var msg = $(".message-input")
          .val()
          .trim();

        //save to localStorage
        localStorage.setItem("user-message", msg);

        // I'd suggest putting any validation code here; so we can 'return' the function before the transitioning-out code runs.
        // I'd also suggest saving the form data for usage later using 'database.saveObject(saveName, objectToSave)' once the form has been validated.

        //   >>> Replace this line with any code that may make sense here <<<

        // END: Code to run immediately upon clicking the use button

        // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
        customizeMessageScreenState.clearButtonClickHandlers();

        // Switch back to the create package screen
        window.location.hash = "create-package-screen";
      });

      // Attach a click event handler to the cancel button (done here so its not clickable until fully on screen)
      ui.get$FromRef("cancel-message-button").on("click", function() {
        console.log("handling click on the cancel button");

        // START: Code to run immediately upon clicking the cancel button
        // I'd suggest clearing the form or resetting it to saved data here.

        //   >>> Replace this line with any code that may make sense here <<<

        // END: Code to run immediately upon clicking the cancel button

        // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
        customizeMessageScreenState.clearButtonClickHandlers();

        // Switch back to the create package screen
        window.location.hash = "create-package-screen";
      });
    });
  },

  clearButtonClickHandlers: function() {
    ui.get$FromRef("use-message-button").off("click");
    ui.get$FromRef("cancel-message-button").off("click");
  }
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef("customize-message-screen", "#customize-message-screen");

ui.add$ToRef("cancel-message-button", ".cancel-message-button");
ui.add$ToRef("use-message-button", ".use-message-button");

// Add our new state to the state machine
sm.addState("customize-message-screen", customizeMessageScreenState);
