// Updated script.js with fixed ZenQuotes click logic

var imgHappy = document.querySelector("#happyButton");
var imgMeh = document.querySelector("#mehButton");
var showlastJoke = document.querySelector("#lastJoke");
var lastJoke = localStorage.getItem("last joke");

if (lastJoke != null) {
  showlastJoke.innerHTML = lastJoke;
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

/* imgMeh.addEventListener("click", function () {
  const canvas = document.getElementById("quoteCanvas");
  const ctx = canvas.getContext("2d"); */

imgMeh.addEventListener("click", function () {
  console.log("Meh button clicked");

  const canvas = document.getElementById("quoteCanvas");
  if (!canvas) {
    console.error("Canvas element not found.");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get canvas context.");
    return;
  }
  canvas.width = 600;
  canvas.height = 400;

/*   const proxyUrl = "https://api.allorigins.win/get?url="; */
  const proxyUrl = "https://api.allorigins.win/get?disableCache=true&url=";
  const targetUrl = "https://zenquotes.io/api/random";

  // Move current quote to last before fetching new one
  const currentQuote = localStorage.getItem("current quote");
  if (currentQuote) {
    document.getElementById("lastQuoteText").innerText = "Last Quote: " + currentQuote;
    localStorage.setItem("last quote", currentQuote);
  }

  fetch(proxyUrl + encodeURIComponent(targetUrl))
    .then(response => {
      if (response.ok) return response.json();
      else throw new Error("Network response was not ok.");
    })
    .then(data => {
      const parsed = JSON.parse(data.contents);
      const quote = parsed[0].q;
      const author = parsed[0].a;
      const fullText = `"${quote}"\n— ${author}`;

      // Save this as the new current quote
      localStorage.setItem("current quote", fullText);

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = "#ffffff"; // pure white
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw quote text
      ctx.fillStyle = "#333";
      ctx.font = "20px Georgia";
      ctx.textAlign = "center";
      wrapText(ctx, quote, canvas.width / 2, 150, 520, 28);

      // Draw author
      ctx.font = "italic 18px Georgia";
      ctx.fillText("- " + author, canvas.width / 2, 300);
    })
    .catch(err => {
      console.error("Quote fetch error:", err);
    });
});

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

// OLD HealthThruWords API (commented out)
/*
imgMeh.addEventListener("click", function () {
  var QuotePic = document.querySelector("#QuoteNow");
  QuotePic.innerHTML = "";
  
  fetch("https://healthruwords.p.rapidapi.com/v1/quotes/?size=medium&maxR=1&t=Wisdom", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "de5cbe4ed9msh2b83413369c5e7fp1efe2djsn1a22cdab5bb4",
      "x-rapidapi-host": "healthruwords.p.rapidapi.com"
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    else {
      alert("Error: " + response.statusText);
    }
  })
  .then(data => {
    console.log(data);
    console.log(data[0].media);
    QuotePic.src = data[0].media;

    var storeQuotePic = localStorage.getItem("last pic");
    if (storeQuotePic != null) {
      lastQuote.src = storeQuotePic;
    }; 

    localStorage.setItem("last pic", data[0].media);
  })
  .catch(err => {
    console.error(err);
  });
});
*/
