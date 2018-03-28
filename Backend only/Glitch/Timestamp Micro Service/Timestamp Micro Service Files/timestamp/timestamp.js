require("datejs");

function unix_to_natural(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(); // ideally use ES6 template literals, however not currently supported in node and unsure how to install babel on glitch.
}

function natural_to_unix(date) {
    return (Date.parse(date)).getTime() / 1000; // parse date and return unix time.
}

module.exports = function(raw_date) {
    let unixTime = null,
        naturalTime = null;
    let date = raw_date.replace(/\//g, "");

    if (!isNaN(date)) {
        unixTime = date
        naturalTime = unix_to_natural(new Date(date * 1000)); // get the natural date using unix time code.
    } else {
        try {
            date = date.replace(/%20/g, " "); // use regex to replace "%20" with real spaces.
            unixTime = natural_to_unix(date);
            naturalTime = date;
          
        } catch (err) { // if neither of the above functions work, return null for unixTime and naturalTime.

        }
    }

    return {
        "unix": unixTime,
        "natural": naturalTime
    };

}
