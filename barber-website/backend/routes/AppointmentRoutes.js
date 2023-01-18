require('dotenv').config();
const express = require("express");
const router = express.Router();
const Appointment = require("../controllers/Appointment.js");
const JWT = require("jsonwebtoken");



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

THIS METHOD WILL RETURN HOURS AND APPOINTMENT_id
{
        "hour": "11",
        "appointment_id": 41
    }

route: http://localhost:5001/Appointment/getBarberAvailablity_Hours

*/

router.get('/getBarberAvailablity_Hours',Appointment.getBarberAvailablity_Hours)

/*
Takes -->  as json following info
{
        "appointment_id":50,
        "Customer_First_name":"ALi",
        "Customer_Last_name":"Ali",
        "Customer_email":"...@gmail.com",
        "Customer_telephone":"0000",
        "service":"Haircut",
        "Customer_appointment_notes":"sa"
}

returns --> res.redirect(process.env.Frontend_URL+"appointment?appointment_id="+appointment_id))
        || res.status(400).send(error)

Notes and assumptions: This route will send the email to the customers provided email (Check the spam folder as well).
                        That email contains the link that will show all the appointment related information. 
                        Through that link they will also be able to cancel or update existing appointments.
                        Right now I am routing to the frontend appointment page. please change it accordingly. 
                        In the link which redirects the user, I have attached the jwt token, which encodes the appointment ID.

route: http://localhost:5001/Appointment/addAppointment

*/

router.put('/addAppointment',Appointment.addAppointment)

//When the customer clicks the link in the email they will get routed to this page//
router.get('/AppointmentDetails/:token', async (req,res)=>{
        try{
                let appointment_id = JWT.verify(req.params.token,process.env.ACCESS_TOKEN_SECRET)
                appointment_id=appointment_id.data;
                console.log(appointment_id)

                //change accordingly 
                res.redirect(process.env.Frontend_URL+"appointment?appointment_id="+appointment_id)
        }catch (error) {
                console.log(error)
                res.status(400).send(error)
        }
})

module.exports = router;