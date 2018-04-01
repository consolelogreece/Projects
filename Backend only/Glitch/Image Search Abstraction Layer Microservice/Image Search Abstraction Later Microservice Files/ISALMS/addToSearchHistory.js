let mongo = require("mongodb").MongoClient

function addToSearchHistory(mongoURL, search, time){
  
  mongo.connect(mongoURL, (err, database) => {              // connects to the database.
    if (err) throw err;                                     // throws any errors.
    const db = database.db("searchhistory");                // assigns specified database to variable.
    const collection = db.collection("searches");           // assigns specified collection of the database to variable.
    
    collection.insert({'search':search, 'time':time})       // inserts the relevent data to the database.
    database.close();                                       // closes database connection.
      
  });
  
}

module.exports = addToSearchHistory