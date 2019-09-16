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
    manifest: "to-go bowl of soup"
  };
};

$.ajax({
  url: "https://api.postmates.com/v1/customers/cus_MMZwGJZ84IUybk/deliveries",
  method: "POST",
  data: postmatesData()
}).then(function(response) {
  console.log("postmates response", response);
});
