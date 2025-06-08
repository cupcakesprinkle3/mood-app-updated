// Updated script.js with fixed ZenQuotes click logic

var imgHappy = document.querySelector("#happyButton");
var imgMeh = document.querySelector("#mehButton");
var showlastJoke = document.querySelector("#lastJoke");
var lastJoke = localStorage.getItem("last joke");
var showlastQuote = document.querySelector("#lastQuoteText");
var lastQuote = localStorage.getItem("last quote");


if (lastJoke != null) {
  showlastJoke.innerHTML = lastJoke;
};

if (lastQuote != null) {
  showlastQuote.innerHTML = "Last Quote: " + lastQuote;
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
      var setup = data.setup;
      var delivery = data.delivery;
      var fullJoke = data.setup + "..." + data.delivery;

      /* jokeHere.append("New Joke: " + fullJoke); */
      jokeHere.innerText = `"${fullJoke}"`;

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
  console.log("Meh button clicked");

  const quoteTextBox = document.getElementById("quoteText");
  if (!quoteTextBox) {
    console.error("Quote text container not found.");
    return;
  }

  const proxyUrl = "https://api.allorigins.win/get?disableCache=true&url=";
  const targetUrl = "https://zenquotes.io/api/random";

  // Move current quote to last before fetching new one
  var storeQuote = localStorage.getItem("current quote");
  if (storeQuote != null) {
    var showlastQuote = document.getElementById("lastQuoteText");
    showlastQuote.innerHTML = "Last Quote: " + storeQuote;
    localStorage.setItem("last quote", storeQuote);
  }

  fetch(proxyUrl + encodeURIComponent(targetUrl))
    .then(response => response.ok ? response.json() : Promise.reject("Network error"))
    .then(data => {
      const parsed = JSON.parse(data.contents);
      const quote = parsed[0].q;
      const author = parsed[0].a;

      localStorage.setItem("current quote", `"${quote}" — ${author}`);

      quoteTextBox.innerHTML = `
  <span style="display: block; margin-bottom: 0.5rem; font-size: 1.1rem; font-weight: 400; color: #4a4a4a;">
    "${quote}"
  </span>
  <span style="font-size: 0.95rem; font-weight: 400; color: #4a4a4a;">
    — ${author}
  </span>
`;
    })
    .catch(err => {
      console.error("Quote fetch error:", err);
      quoteTextBox.innerText = "Oops! Couldn't fetch a quote.";
    });
});
