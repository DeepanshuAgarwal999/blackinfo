const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    casualties: {
        type: Number,
        default: 0,
    },
    carCrashes: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now
    },
    propertyDamage: {
        type: Number,
        default: 0,
    },
    severity: {
        type: Number,
    },
    accidentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accident'
    },
    roadType:String,
    accidentSpot:String,
    typeOfRoadSurface:String,
    physicalDividerPresent:Boolean,
    
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
