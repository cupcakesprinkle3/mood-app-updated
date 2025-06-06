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
      // request was successful
      if (response.ok) {
      return response.json();
    }
      else {
      alert("Error: " + response.statusText);
        }
    })
    .then(data => {
      console.log(data);
      var setup = data.setup;
      var delivery = data.delivery;
      var fullJoke = data.setup + "..." + data.delivery
    
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
  //QuotePic.innerHTML = "";
 // no longer needed: QuotePic.innerHTML = "";
  const canvas = document.getElementById("quoteCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
 
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

      })
