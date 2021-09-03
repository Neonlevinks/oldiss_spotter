const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) {
      return callback(error, null); //if there is an error, the function will pass the error to the callback, and state that the ip is null
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching the IP address of ${body}`), null);//if there is a status code that is not 200, it will pass the error message with the current status code, and that the body is not valid. It will also say the IP is null.
      return;
    }

    let ip = JSON.parse(body).ip;
    callback(null, ip); //if there are no errors, it will pass null to the error parameter and the ip address to the ip parameter.
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request('https://freegeoip.app/json/', (error, response, body) => {
    if (error) {
      return callback(error, null); //return the error, and null as the data
    }

    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} shows when fetching coordinates for IP. Response ${body}`;
      callback(Error(message), null); //return an error message, with the statues code, and pass null to data
      return;
    }



    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
