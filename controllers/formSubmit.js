
const Accident = require('../model/accident');
const User = require('../model/User');
const SiteInvestigation = require('../model/siteInvestigation');
const { severityCalculator } = require('../utils/severityCalculator');
const Loc = require('../model/location');


exports.accidentSubmit = async (req, res) => {
    try {
        const token = req.params.token;
        // console.log(token)
        if (!token) {
            return res.status(401).send('Access Denied');
        }
        const user = await User.findByToken(token)
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", status: 401 });
        }
        let form = req.body;
        form["userId"] = user._id;
        form["gpsLocation"] = {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
        // console.log(form);
        const accident = new Accident({
            userId: form.userId,
            firstName: form.firstName,
            lastName: form.lastName,
            state: form.state,
            firNo: form.firNo,
            accidentCity: form.accidentCity,
            district: form.district,
            policeStation: form.policeStation,
            roadNumber: form.roadNumber,
            noOfLanes: form.noOfLanes,
            dateOfAccident: form.dateOfAccident,
            timeOfAccident: form.timeOfAccident,
            typeOfCollision: form.typeOfCollision,
            typeOfArea: form.typeOfArea,
            hitAndRun: form.hitAndRun,
            accidentType: form.accidentType,
            noOfVehiclesInvolved: form.noOfVehiclesInvolved,
            noOfFatalities: form.noOfFatalities,
            noOfInjuredNeedingHospitalisation: form.noOfInjuredNeedingHospitalisation,
            noOfInjuredNotNeedingHospitalisation: form.noOfInjuredNotNeedingHospitalisation,
            typeOfWeather: form.typeOfWeather,
            ongoingRoadWorks: form.ongoingRoadWorks,
            roadName: form.roadName,
            roadType: form.roadType,
            physicalDividerPresent: form.physicalDividerPresent,
            roadChainage: form.roadChainage,
            typeOfRoadSurface: form.typeOfRoadSurface,
            accidentSpot: form.accidentSpot,
            gpsLocation: {
                latitude: req.body.latitude,
                longitude: req.body.longitude
            },
            typeOfPropertyDamage: form.typeOfPropertyDamage,
            vehicles: [
                {
                    vehicletype: form.vehicles[0].type,
                    registrationPlate: form.vehicles[0].registrationPlate,
                    dispositionLoadAfterAccident: form.vehicles[0].dispositionLoadAfterAccident,
                    condition: form.vehicles[0].condition,
                    trafficViolation: form.vehicles[0].trafficViolation,
                    mechanicalViolation: form.vehicles[0].mechanicalViolation
                }
            ]
        });
        const t = await accident.save();
        const sev = await severityCalculator({
            type: form.typeOfCollision,
            vehicals: form.noOfVehiclesInvolved,
            casualties: form.noOfInjuredNeedingHospitalisation,
            property_damage: form.typeOfPropertyDamage,
        })
        const accLoc = new Loc({
            location: {
                type: "Point",
                coordinates: [form.longitude, form.latitude]
            },
            casualties: form.noOfInjuredNeedingHospitalisation,
            dateTimeOccurred: form.dateOfAccident,
            carCrashes: form.noOfVehiclesInvolved,
            accidentId: t._id,
            propertyDamage: form.typeOfPropertyDamage,
            roadType: form.roadType,
            accidentSpot: form.accidentSpot,
            typeOfRoadSurface: form.typeOfRoadSurface,
            physicalDividerPresent: form.physicalDividerPresent,
            severity:sev
        })
        await accLoc.save();
        res.status(200).json({ message: "Form Submitted Successfully", status: 200 });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};



exports.SiteInvestigationSubmit = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token || token === 'undefined' || token === 'null' || token === '' || token == null) {
            return res.status(401).send('Access Denied');
        }
        const user = await User.findByToken(token)
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", status: 401 });
        }
        const siteInvestigation = new SiteInvestigation(req.body);
        await siteInvestigation.save();
        res.status(200).json({ message: "Form Submitted Successfully", status: 200 });
    } catch (err) {
        // console.error(err);
        res.status(500).json({ message: err.message });
    }
}



exports.getLocations = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token || token === 'undefined' || token === 'null' || token === '' || token == null) {
            return res.status(401).send('Access Denied');
        }
        const user = await User.findByToken(token)
        if (!user) {
            return res.status(402).json({ message: "Unauthorized", status: 401 });
        }
        const locations = await Loc.find();
        res.status(200).json({ message: locations, status: 200 });
    } catch (err) {
        // console.error(err);
        res.status(500).json({ message: err.message });
    }
}