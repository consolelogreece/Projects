let mongo = require("mongodb").MongoClient

function getHistory(mongoURL, response) {
  
  mongo.connect(mongoURL, (err, database) => {                                     // connects to database.
    if (err) throw err;                                                            // throws any errors.
    const db = database.db("searchhistory");                                       // assigns specified database to variable.
    const collection = db.collection("searches");                                  // assigns specified collection of the database to variable.                   
    
    collection.find({}).project({_id:0}).toArray((err, data) => {                  // finds all the entries in the database, removes the _id field from the results using projection, and returns the result in array format.
      if (err) throw err;                                                          // throws any errors.
      response.end(JSON.stringify(data, null, 2));                                 // sends 'beautified' data back to user who made request.
    });
  
    database.close();                                                              // closes database connection
    return;
  });
}

module.exports = getHistory