// Ajax Query URL Templates (using simplified arrow functions)
const memeQueryURL = function(memeInput) {
  return `https://api.giphy.com/v1/gifs/search?api_key=8Exgf9tU7mNJScplIIgNLTVYWdbiaWcL&rating=PG-13&q=${memeInput}&limit=3`;
};

$.ajax({
  url: memeQueryURL("example"),
  method: "GET"
}).then(function(response) {
  console.log("meme response:", response);
});

const postmatesData = function() {
  // return manifest:"",manifest_items:"",pickup_name:"", pickup_address, pickup_phone_Number, dropoff_name, dropoff_address, dropoff_phone_number
  return {
    "manifest": "to-go bowl of soup",
    "manifest_items": [{ "name": "dirty underpants", "quantity": 1, "size": "small" }],
    "pickup_name": "Subway",
    "pickup_address": "501 seneca st, seattle, wa 98101",
    "pickup_phone_number": "4155555555",
    "dropoff_name": "Cinerama",
    "dropoff_address": "2100 4th ave, seattle, wa 98121",
    "dropoff_phone_number": "2066666666"
  };
};

$.ajax({
  url: " https://www.jsea.dev/pm.php",
  method: "POST",
  //   headers: {
  //     Authorization: "Basic " + btoa("a582f566-9146-4c38-82cc-731d2da21732" + ":")
  //   },

  data: postmatesData()
})
  .then(function(response) {
    console.log("postmates response", response);
  })
  .catch(function(error) {
    console.error("Error from Postmates call: ", error.message);
  });
