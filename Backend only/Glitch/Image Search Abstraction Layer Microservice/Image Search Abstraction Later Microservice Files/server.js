              
const express = require('express')
const app = express()
const service = require("./ISALMS/ISALMS.js")                                          // import ISALMS.js file.
const getSearchHistory = require("./ISALMS/getSearchHistory.js")                       // import getSearchHistory.js file.
const mongoURL = "<MONGODB-DATABASE-URL>"                                              // MONGODB DATABASE URL

app.use(express.static('public'))


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/api/history", (request, response) => {                                       // call getSearchHistory function when /api/history is visited.
  getSearchHistory(mongoURL, response);
})

app.get("/api/imagesearch/*", (request, response) => {                                 // call service function when /api/imagesearch/<SEARCH-REQUEST> is visited.
  service(mongoURL, request, response);
})

// listen for requests 
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
