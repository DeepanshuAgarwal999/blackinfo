const express = require("express");
const  VerifyToken  = require("../middleware/verifyToken");
const {SiteInvestigationSubmit,accidentSubmit,getLocations} = require('../controllers/formSubmit');
const router = express.Router();
router.post("/accident/:token", accidentSubmit)
router.post("/siteInvestigation/:token", SiteInvestigationSubmit)
router.get("/getlocations/:token",getLocations)
module.exports = router;