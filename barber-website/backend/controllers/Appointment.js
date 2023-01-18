require('dotenv').config();
const pool = require('../config/database.js')
const AppointmentModel = require("../models/AppointmentModel.js");
const JWT = require("jsonwebtoken");
const sendgrid = require("@sendgrid/mail");

const BarberAvailablityDates= async (req,res) =>{
    const {
        BarberID,
    } = req.body;
    var today = new Date();
    var dd=today.getDate().toString();
    var mm=((today.getMonth())+1).toString();
    var yyyy=today.getFullYear().toString();
    today=yyyy+'-'+mm+'-'+dd
    
    try{
        let availableDates= await pool.query(AppointmentModel.getBarberAvailablityDates,[BarberID,today])
        res.status(200).send(availableDates.rows)

    }catch(error) {
        res.status(400).send(error)
    }

}

const getBarberAvailablity_Hours= async (req,res)=>{
    const {
        BarberID,
        Available_Date
    } = req.body;

    try{
        let availableHours= await pool.query(AppointmentModel.getBarberAvailablity_Hours,[BarberID,Available_Date])
        res.status(200).json(availableHours.rows)
    }catch (error) {
        res.status(400).send(error)
    }
}
const addAppointment = async (req,res)=>{
    const {
        appointment_id,
        Customer_First_name,
        Customer_Last_name,
        Customer_email,
        Customer_telephone,
        service,
        Customer_appointment_notes
    } = req.body;
    try{
        await pool.query(AppointmentModel.addAppointment,[appointment_id,Customer_First_name, Customer_Last_name, Customer_email, Customer_telephone, service, Customer_appointment_notes])
        const accessToken =await JWT.sign(
            {
              
              data: appointment_id,
            },
            process.env.ACCESS_TOKEN_SECRET
          );
        const URL = process.env.Backend_URL + "Appointment/AppointmentDetails/"+accessToken;
        
        //sending email
       await sendgrid.setApiKey(process.env.SG_API_KEY)

        sendgrid.send({
            to:{
                email: Customer_email,
                name: Customer_First_name
            },
            from:{
                email: process.env.Barbershop_Email,
                name: 'Brothers Barber Shop Queen Marry'
            },
            templateId: 'd-c60813a5b72e451bad371d9a475e618d',
            dynamicTemplateData:{
                link: URL,
                name: Customer_First_name
            },

        }).then(()=>
        res.redirect(process.env.Frontend_URL+"appointment?appointment_id="+appointment_id))
        
    }catch (error) {
        res.status(400).send(error)
    }
}

module.exports={
    BarberAvailablityDates,
    getBarberAvailablity_Hours,
    addAppointment
    
}