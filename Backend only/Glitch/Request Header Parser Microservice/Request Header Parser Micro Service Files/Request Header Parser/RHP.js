const useragent = require("useragent")
module.exports =  function(req) {
  const ip = req.ip;                                                                        // get IP of get request 
  const parsedReq = useragent.parse(req.get("User-Agent"));                                 // parse User-Agent
  const browser = parsedReq.toAgent();                                                      // get information about browser from parsed UserAgent. .toAgent() converts into neat, useable string.
  const OS = parsedReq.os;                                                                  // get user computer OS
  const language = req.headers["accept-language"].slice(0, 5);                              // get first 5 characters of accept-language. this results in something like en-US etc...
  return {"ip-address" : ip, "language" : language, "software" : OS + ", " + browser}       // return relevent information in json format.
}

