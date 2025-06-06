const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const response = await fetch("https://zenquotes.io/api/random");
  const data = await response.text();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: data
  };
};
