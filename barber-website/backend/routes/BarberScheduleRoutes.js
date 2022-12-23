require('dotenv').config();
const express = require("express");
const router = express.Router();
const BarberSchedule = require("../controllers/BarberSchedule.js");
const JWT = require("jsonwebtoken");

/*
JWT authentication
*/
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).send('Send Token Please!')
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, Logged_userId) => {
        if (err) {
            return res.status(403).send("Please Login again.");
        }
        req.Logged_userId = Logged_userId;

        next()
    })
}


/*
Takes --> date and hours of the barber (hours as an array of boolean length 11 like [true,true,true,true,false,false,false,true,false,false,false] )as JSON) --> {
    {
        "Available_Date":"2022-11-22",
        "hoursPerday":[true,true,true,true,false,false,false,true,false,false,false]

    } & JWT token
}

returns --> res.status(200).send("Hours Saved.")
        || res.status(400).send(error)

Notes and assumptions: Shop opening hours are '10','11','12','13','14','15','16','17','18','19','20' and that is why it accepts the array of length 11
from the schema.sql file copy the tables and enums for hours(from 10 to 20), services(All the services barbersjhop offers and its taken from the barbers current website) and barber_schedule 

route: http://localhost:5001/BarberSchedule/updateSchedule

*/

router.put('/updateSchedule', authenticateToken, BarberSchedule.addAvaliblilty)

/*
Takes --> it takes the date selected by the barber {
    "Date":""
} And the jwt token

returns --> res.status(200).send(getAvailablity.rows) --> It will return the array of JSON for the availablities of the selected date and berber can see all the attributes 
            || res.send("There is no Availablity recorded for this date. Kindly, record the availablity on update availablity page.")
            || res.status(400).send(error)

Notes: the return availabilities are order by hour

route: http://localhost:5001/BarberSchedule/getBarberSchedule_barberView

*/
router.get('/getBarberSchedule_barberView',authenticateToken,BarberSchedule.getBarberAvailablity_barberView)

/*
Takes --> the array of appointment ID (size of the array doesnt matters) {
    "aptIdsTodelete": [2,3,4,5,8......]
} And the jwt token

returns -->  res.status(200).send("Hours Deleted.")
            || res.status(400).send(error)

Notes: just the appointment IDs are needed to delete the availablity

route: http://localhost:5001/BarberSchedule/deleteBarberSchedule

*/
router.delete('/deleteBarberSchedule',authenticateToken,BarberSchedule.deleteBarberSchedule);


module.exports = router;