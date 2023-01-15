require('dotenv').config();
const express = require("express");
const router = express.Router();
const Appointment = require("../controllers/Appointment.js");

/*
Takes --> Barbers Id as json
    {
    "BarberID": 43
    }


returns --> res.status(200).send(availableDates.rows)
        || res.status(400).send(error)

Notes and assumptions: This route will provide a list of available dates which is greater then and equal to the current date and sorted from low to high.
route: http://localhost:5001/Appointment/getBarberAvailablityDates

*/

router.get('/getBarberAvailablityDates',Appointment.BarberAvailablityDates)

router.get('/getBarberAvailablity_Hours',Appointment.getBarberAvailablity_Hours)

module.exports = router;