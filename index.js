// will require and run our main fetch functions

const { nextISSTimesForMyLocation } = require('./iss');

const displayFlyOvers = (flyOvers) => {
  for (const flyOver of flyOvers) {
    const dayTime = new Date(0);
    dayTime.setUTCSeconds(flyOver.risetime);
    const duration = flyOver.duration;
    console.log(`The ISS will fly over you at ${dayTime} for ${duration} seconds`);
  }
};

nextISSTimesForMyLocation((error, flyOvers) => {
  if (error) {
    console.log("It didnt work", error);
    return;
  }

  displayFlyOvers(flyOvers);
});
