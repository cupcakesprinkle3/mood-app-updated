var imgHappy = document.querySelector("#happyButton");
var imgMeh = document.querySelector("#mehButton");
var showlastJoke = document.querySelector("#lastJoke");
var showlastQuote = document.querySelector("#lastQuote");
var lastJoke = localStorage.getItem("last joke");

if (lastJoke != null) {
  showlastJoke.innerHTML = "Last Joke: " + lastJoke;
}; 

imgHappy.addEventListener("click", function () {
  var jokeHere = document.querySelector("#happyText");
  jokeHere.innerHTML = "";

  fetch("https://jokeapi-v2.p.rapidapi.com/joke/Any?type=twopart&format=json&contains=%252C&idRange=0-300&safe-mode", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "d0416af555mshf2696a6e4f197f9p15a59djsna68a0f653c54",
      "x-rapidapi-host": "jokeapi-v2.p.rapidapi.com"
    }
  })
    .then(response => { 
      if (response.ok) {
        return response.json();
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .then(data => {
      console.log(data);
      var setup = data.setup;
      var delivery = data.delivery;
      var fullJoke = data.setup + "..." + data.delivery;

      jokeHere.append("New Joke: " + fullJoke);

      var storeJoke = localStorage.getItem("last joke");
      if (storeJoke != null) {
        showlastJoke.innerHTML = "Last Joke: " + storeJoke;
      }; 

      localStorage.setItem("last joke", fullJoke);
    })
    .catch(err => {
      console.error(err);
    });
});

imgMeh.addEventListener("click", function () {
  var QuotePic = document.querySelector("#QuoteNow");
  QuotePic.innerHTML = "";

  fetch("https://zenquotes.io/api/random")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .then(data => {
      console.log(data);
      const quoteText = data[0].q + " — " + data[0].a;
      QuotePic.innerText = quoteText;
      localStorage.setItem("last quote", quoteText);
      showlastQuote.innerText = "Last Quote: " + quoteText;
    })
    .catch(err => {
      console.error(err);
    });
});