require('dotenv').config();
const pool = require('../config/database.js')
const AppointmentModel = require("../models/AppointmentModel.js")

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

module.exports={
    BarberAvailablityDates,
    getBarberAvailablity_Hours
}