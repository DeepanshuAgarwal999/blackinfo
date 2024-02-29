const mongoose = require('mongoose');
const { calculateSeverity } = require('../utils/severity');

const accidentSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  state: String,
  firNo: String,
  accidentCity: String,
  district: String,
  policeStation: String,
  roadNumber: String,
  noOfLanes: String,
  dateOfAccident: String,
  timeOfAccident: String,
  typeOfCollision: String,
  typeOfArea: String,
  hitAndRun: String,
  accidentType: String,
  noOfVehiclesInvolved: Number,
  noOfFatalities: Number,
  noOfInjuredNeedingHospitalisation: Number,
  noOfInjuredNotNeedingHospitalisation: Number,
  typeOfWeather: String,
  ongoingRoadWorks: String,
  roadName: String,
  roadType: String,
  physicalDividerPresent: String,
  roadChainage: String,
  typeOfRoadSurface: String,
  accidentSpot: String,
  severity:Number,
  gpsLocation: {
    latitude: String,
    longitude: String,
  },
  typeOfPropertyDamage: String,
  vehicles: [
    {
      vehicletype: String,
      registrationPlate: String,
      dispositionLoadAfterAccident: String,
      condition: String,
      trafficViolation: String,
      mechanicalViolation: String,
    },
  ],
});
accidentSchema.pre("save",async function(next){
  const accident = this;
  try {
    const severity = calculateSeverity(
      accident.typeOfCollision,
      accident.noOfVehiclesInvolved,
      accident.noOfFatalities,
    );
    accident.severity = severity;
    console.log(severity);
    next();
  } catch (error) {
    next(error);
  }
})
module.exports = mongoose.model('Accident', accidentSchema);