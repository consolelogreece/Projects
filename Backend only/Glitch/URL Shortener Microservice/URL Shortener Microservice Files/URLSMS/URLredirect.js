module.exports = function(request, response, mongoURL) {
  
  const mongo = require("mongodb").MongoClient

  mongo.connect(mongoURL, function(err, database) {
      const db = database.db("urls");  // get database
      const collection = db.collection("urlhash"); // get collection
      const url = "https://consolelogreece-urlsms.glitch.me" + request.url  // assign full url to url variable
      const x = collection.find({"shortURL" : url}).toArray(function(err, data) { // search to find if exists
        if (err) throw err;
        if (data.length == 0) {  // if it doesnt, tell the client the url doesn't exist.
          database.close();
          response.send("Url doesn't exist")
        }else {
          database.close(); // if the url does exist, redirect the client to the relevent url.
          console.log(data[0].url)
          response.redirect(data[0].url)        
        }
      });    
  });    
}