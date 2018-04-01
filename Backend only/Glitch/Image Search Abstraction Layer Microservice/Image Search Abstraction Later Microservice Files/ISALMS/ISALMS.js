const https = require("https");                                   // import nodejs native https library
const addToSearchHistory = require("./addToSearchHistory.js");    // import javascript file code for adding serach request to database

function service(mongoURL, request, response) {

  const search = request.params[0];                               // user's search text.
  const apikey = '<GOOGLE-CUSTOM-SEARCH-API-KEY>';                // google search api key.
  const searchengineID = '<GOOGLE-CUSTOM-SEARCH-ENGINE-ID>';      // google search engine ID.
  const offset = (request.query.offset);                          // assign value of parameter 'offset' to the offset variable.
  let url = createURL(search, apikey, searchengineID, offset);    // pass all above variables into createURL function to generate the appropriate URL.
    
  addToSearchHistory(mongoURL, search, new Date);                 // adds search query, along with search date, to the mongo database.

  performGET(url, response);                                      // performs the get request.
   
}




function performGET(url, response){
  
  var req = https.get(url, (res) => {                 //  perform get request.
    
    let responseData = "";
     
    res.on('data', (d) => {                           // append data to the string called 'responseData' when the data is received.
      responseData += d;              
    });    
    
    res.on("end", (d) => {                            // once all data is receieved, execute 'sendResponse' function.
      sendResponse(responseData, response);           // call the 'sendResponse' function to send response to the user.
    });    
    
  });
  
  req.end();                                          // ends request.
}




function sendResponse(responseData, response){        // calls the proessData function on the parsed responseData string, then stringifies the processed data and sends it to the user.
  response.end(JSON.stringify(                         
    processData(
      JSON.parse(
        responseData)
    ), null, 2));                                     // makes the returned string 'pretty'.
}




function createURL(search, apikey, searchengineID, offset){

  let url = 'https://www.googleapis.com/customsearch/v1?q=' + search + '&key=' + apikey + '&cx=' + searchengineID + '&searchType=image';      // url for get request.

  if (offset !== undefined) {                                                                                                                 // if an offset is provided, append '&start=<offset>' to the url string to alter the get request.
        url += ("&start=" + offset);    
   }
  
  return url;                                                                                                                                 // return final url.
}




function processData(data) {
  if (data.hasOwnProperty('error')) {
      return {"error":"too many requests have been made today... oops!"}
  }
  
  let imageArray = [];                                                                                                                         // declare empty image array.

  data.items.forEach((image) => {                                                                                                              // go through every object in the image array that is returned in the get request.
    imageArray.push({"url":image.link, "snippet":image.snippet, "thumbnail":image.image.thumbnailLink, "context":image.image.contextLink});    // add new objects to the declared imageArray array, containing only the desired data. 
  });
   
  return imageArray;                                                                                                                           // returns imageArray. 
}

module.exports = service;
