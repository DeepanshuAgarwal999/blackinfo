const express = require("express");
const  VerifyToken  = require("../middleware/verifyToken");
const { Login,Register,Profile } = require("../controllers/user");4

const router = express.Router();
router.get("/profile/:token", Profile)
router.post("/login", Login);
router.post('/register', Register)
module.exports = router;