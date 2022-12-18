require('dotenv').config();
const express = require("express");
const router = express.Router();
const ResetPassword = require("../controllers/ResetPassword.js");



router.post('/SendEmail', ResetPassword.SendEmail)

router.get('/Verification',ResetPassword.Verification)

module.exports = router;