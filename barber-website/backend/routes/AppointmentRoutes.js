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

/*
Takes --> Barbers Id and Available date as json
{
        "BarberID": "43",
        "Available_Date": "2023-01-17"
}

returns --> res.status(200).send(availableHours.rows)
        || res.status(400).send(error)

Notes and assumptions: This route will provide a list of available hours & corresponding appointment ID's when a specific date and barber is selected.
route: http://localhost:5001/Appointment/getBarberAvailablity_Hours

*/

router.get('/getBarberAvailablity_Hours',Appointment.getBarberAvailablity_Hours)

module.exports = router;