var localSelection = [];
var customizeMemeScreenState = {
  unloadState: function(nextState) {
    // Start hiding the customization screen
    ui.get$FromRef("customize-meme-screen").css("position", "absolute");
    ui.hideByRef("customize-meme-screen", function() {
      console.log("done hiding customize meme screen");
      ui.get$FromRef("customize-meme-screen").css("position", "static");
    });

    // Detach button click events here too (this handles the case of using forward/back navigation buttons causing multiple fade ins/outs)
    customizeMemeScreenState.clearButtonClickHandlers();

    // START: General code to run after this screen finishes transitioning out and immediately before the state switches

    //   >>> Replace this line with any code that may make sense here <<<

    // END: General code to run after this screen finishes transitioning out and immediately before the state switches
  },

  loadState: function(prevState) {
    // START: Code to run before this screen starts transitioning in
    // I'd suggest putting any changes here you want to be visible on the screen when it transitions in.
    $(".gif-results").empty();
    $(".meme-input").val("");

    // END: Code to run before this screen starts transitioning in

    // Show the customize meme screen
    ui.showByRef("customize-meme-screen", function() {
      //   console.log("done showing customize meme screen");

      // START: Code to run once the screen is fully transitioned in
      // I'd suggest putting any changes here you want to activate once the screen is done transitioning in.

      $(".meme-btn").on("click", function(event) {
        event.preventDefault();
        // event.stopPropagation();
        $(".gif-results").empty();
        //GIPHY Ajax Query URL
        const memeQueryURL = function(memeInput) {
          return `https://api.giphy.com/v1/gifs/search?api_key=8Exgf9tU7mNJScplIIgNLTVYWdbiaWcL&rating=PG-13&q=${memeInput}&limit=3`;
        };

        // console.log(
        //   memeQueryURL(
        //     $(".meme-input")
        //       .val()
        //       .trim()
        //   )
        // );

        $.ajax({
          url: memeQueryURL(
            $(".meme-input")
              .val()
              .trim()
          ),
          method: "GET"
        }).then(function(response) {
          //   console.log("meme response:", response.data);
          localSelection = [];
          for (let i = 0; i < response.data.length; i++) {
            // console.log(response.data[i].images.original.url);
            var gifUrl = response.data[i].images.original.url;
            var gifImg = $("<img>");
            gifImg
              .attr("class", "gif-images")
              .attr("src", gifUrl)
              .attr("alt", "gifs");
            $(".gif-results").prepend(gifImg);
            localSelection.push(gifUrl);
          }
          $(".gif-results").show();
          $(".use-meme-button").show();
        });
      });

      //CLASS EXAMPLE: localStorage.setItem("todolist", JSON.stringify(list));

      // Attach a click event handler to the use button (done here so its not clickable until fully on screen)
      ui.get$FromRef("use-meme-button").on("click", function() {
        // console.log("handling click on the use button");

        // START: Code to run immediately upon clicking the use button
        // I'd suggest putting any validation code here; so we can 'return' the function before the transitioning-out code runs.
        // I'd also suggest saving the form data for usage later using 'database.saveObject(saveName, objectToSave)' once the form has been validated.

        for (let i = 0; i < localSelection.length; i++) {
          localStorage.setItem("gif" + i, localSelection[i]);
        }
        // END: Code to run immediately upon clicking the use button

        // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
        customizeMemeScreenState.clearButtonClickHandlers();

        // Switch back to the create package screen
        sm.switchState("create-package-screen");
      });

      // Attach a click event handler to the cancel button (done here so its not clickable until fully on screen)
      ui.get$FromRef("cancel-meme-button").on("click", function() {
        // console.log("handling click on the cancel button");

        // START: Code to run immediately upon clicking the cancel button
        // I'd suggest clearing the form or resetting it to saved data here.

        //   >>> Replace this line with any code that may make sense here <<<

        // END: Code to run immediately upon clicking the use button

        // Detach the click event handlers from the main screen buttons (so they're not clicked more than once)
        customizeMemeScreenState.clearButtonClickHandlers();

        // Switch back to the create package screen
        window.location.hash = "create-package-screen";
      });
    });
  },

  clearButtonClickHandlers: function() {
    ui.get$FromRef("use-meme-button").off("click");
    ui.get$FromRef("cancel-meme-button").off("click");
    $(".meme-btn").off("click");
  }
};

// Add references to jQuery selections of HTML elements that are permanently on the page
ui.add$ToRef("customize-meme-screen", "#customize-meme-screen");
ui.add$ToRef("cancel-meme-button", ".cancel-meme-button");
ui.add$ToRef("use-meme-button", ".use-meme-button");

// Add our new state to the state machine
sm.addState("customize-meme-screen", customizeMemeScreenState);
