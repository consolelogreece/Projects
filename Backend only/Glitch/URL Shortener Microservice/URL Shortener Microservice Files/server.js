
const express = require('express');
const app = express();
const mongoURL = "DATABASE URL" // insert database url (mongo) here/
const shorten = require("./URLSMS/URLshort.js");
const redirect = require("./URLSMS/URLredirect.js");


app.use(express.static('public'))
app.set("view engine", "pug")

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})


app.all("/new/*", (request, response) => {
  shorten(request, response, mongoURL);
})

app.all("*", (request, response) => {
  redirect(request, response, mongoURL);
})


// listen for requests 
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
