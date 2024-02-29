const mongoose = require('mongoose');
const blackspotSchema = new mongoose.Schema({
    siteReference:String,
    state: String,
    roadNo: String,
    locationDescription: String,
    policeStation: String,
    landmarks: String,
    blackspotId: String,
    gpsCoordinate: {
        latitude: Number,
        longitude: Number
    },
    blackspotType: String,
    district: String,
    chainage_from: Number,
    chainage_to: Number,
});
module.exports = mongoose.model('SiteInvestigation', blackspotSchema);