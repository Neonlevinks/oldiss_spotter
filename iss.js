const request = require('request');


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

const fetchISSFlyOverTimes = function(coords, callback) {
  const apiURL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(apiURL, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} shows when fetching fly over Times for coordinates.`;
      callback(Error(message), null);
    }

    const flyOver = JSON.parse(body).response;
    callback(null, flyOver);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, latLong) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(latLong, (error, flyOver) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyOver);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };
