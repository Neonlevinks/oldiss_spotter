const request = require('request-promise-native');
const { nextISSTimesForMyLocation } = require('./iss_promised');
const { displayFlyOvers } = require('./index')

nextISSTimesForMyLocation()
  .then((flyOvers) => {
    displayFlyOvers(flyOvers);
  })
  .catch((error) => {
    console.log("It didn't work ", error.message)
  })