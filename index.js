// will require and run our main fetch function

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP: ', ip);
});

fetchCoordsByIP('142.182.178.59', (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Your coordinates are ", data);
});

const latLong = { latitude: 43.648, longitude: -79.4141 };

fetchISSFlyOverTimes(latLong, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! The next flyover times are", data);
});
