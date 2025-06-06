var imgHappy = document.querySelector("#happyButton");
var imgMeh = document.querySelector("#mehButton");
var showlastJoke = document.querySelector("#lastJoke");
var showlastQuote = document.querySelector("#lastQuote");
var lastJoke = localStorage.getItem("last joke");
var lastQuote = localStorage.getItem("last quote");

if (lastJoke != null) {
  showlastJoke.innerHTML = "Last Joke: " + lastJoke;
}

if (lastQuote != null) {
  showlastQuote.src = lastQuote;
}

imgHappy.addEventListener("click", function () {
  var jokeHere = document.querySelector("#happyText");
  jokeHere.innerHTML = "";

  fetch("https://jokeapi-v2.p.rapidapi.com/joke/Any?type=twopart&format=json&contains=%252C&idRange=0-300&safe-mode", {
    method: "GET",
    headers: {
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
      var fullJoke = data.setup + "..." + data.delivery;
      jokeHere.append("New Joke: " + fullJoke);
      localStorage.setItem("last joke", fullJoke);
      showlastJoke.innerHTML = "Last Joke: " + fullJoke;
    })
    .catch(err => {
      console.error(err);
    });
});

imgMeh.addEventListener("click", function () {
  var quoteDiv = document.querySelector("#QuoteNow");
  quoteDiv.src = "";
  quoteDiv.alt = "Loading motivational quote...";

  fetch("https://inspirobot.me/api?generate=true")
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then(imageUrl => {
      quoteDiv.src = imageUrl;
      quoteDiv.alt = "Inspirational quote image";
      showlastQuote.src = imageUrl;
      showlastQuote.alt = "Previous inspirational quote image";
      localStorage.setItem("last quote", imageUrl);
    })
    .catch(err => {
      console.error("Quote image fetch error:", err);
      quoteDiv.alt = "Failed to load quote. Please try again.";
    });
});
