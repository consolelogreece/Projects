const express = require('express');
const app = express();
const RHP = require("./Request Header Parser/RHP.js");
const helmet = require("helmet"); // probably not necessary for a small backend microservice on a third party tool, however installed anyway for good security practices.

app.set("trust proxy", true); // this lets express know there is a proxy, so it can acquire the correct ip address instead of something like 127.0.0.1

app.use(helmet());  // use helemt security npm package.

app.get("*", (request, response) => {
  response.send(RHP(request));  // Parser logic. this is gets and sends the parsed information in json format.
})

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`) 
})
