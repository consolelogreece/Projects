module.exports = function(data, response, mongoURL) {
  
  var object = {"error":"URLs in format http://www.URLHERE.DOMAIN, E.G: https://www.google.com or http://www.youtube.com"};
  var urlNotShortened = data.url.slice(5, data.url.length) // get the url entered. the first 5 chars are "/new/", so remove those.
  
  if (!urlNotShortened.match(/^(http:\/\/|https:\/\/)[w]{3}([.][a-z0-9]+).[a-z]*.[a-z]/g)) {    // regex to verify entry is a legitimate url
      
      response.send(object);
      return
      
  }
  
  
  var mongo = require("mongodb").MongoClient
  
  mongo.connect(mongoURL, function(err, database) {  // connect to mongodb


      if (err) throw err;
      var db = database.db("urls")  // get db
      var collection = db.collection("urlhash") // get collection

      data = collection.find({url:urlNotShortened}).toArray(function(err, data) {  
          if (err) throw err;
         
          if (data.length >= 1) {  // check if url already has been shortened, if it has, return the already stored redirection information, otherwise, continue.
            
              object = {
                  "url": data[0].url,
                  "shortURL": data[0].shortURL
              };
          database.close(); // close db
          response.send(object);  // send information to client           
            
          } else {
            
              var count = collection.count({}, function(err, count) {
                
                  object = {
                      "url": urlNotShortened, // set url that got shortened
                      "shortURL": "https://consolelogreece-urlsms.glitch.me/" + (count + 1) // set shortened url
                  };
                
                  response.send(object); // send information to client
                
                  collection.insert(object, function(err) { // insert information into databse.
                      if (err) throw err;
                    
                      database.close();   // close database once done.             
                      
                  });
            });
          }
      });   
  });
  

  }