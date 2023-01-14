require('dotenv').config();
const express = require("express");
const router = express.Router();
const Appointment = require("../controllers/Appointment.js");

router.get('/getBarberAvailablityDates',Appointment.BarberAvailablityDates)

module.exports = router;