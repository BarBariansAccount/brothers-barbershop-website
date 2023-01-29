require('dotenv').config();
const pool = require('../config/database.js')
const UserModel = require("../models/UserModel.js")
const BarberScheduleModel = require("../models/BarberScheduleModel.js")

const addAvaliblilty = async (req, res) => {
    const {
        Available_Date,
        hoursPerday
    } = req.body;
    const logged_userId = req.Logged_userId.data;
    try {
        let results = await pool.query(UserModel.checkUserExists, [logged_userId])
        let barber_name = results.rows[0].firstname + results.rows[0].lastname;

        for (let i = 0; i < hoursPerday.length; i++) {

            if (hoursPerday[i]) {
                let checkAvailablityExists = await pool.query(BarberScheduleModel.checkAvailablityExists, [barber_name, Available_Date, i + 10])
                
                if (checkAvailablityExists.rows.length == 0) {
                    await pool.query(BarberScheduleModel.addAvailablity, [logged_userId, barber_name, Available_Date, i + 10])
                }
            }
        }
        res.status(200).send("Hours Saved.")

    } catch (error) {
        res.status(400).send(error)
    }
}


const getBarberAvailablity_barberView=async (req,res)=>{
    const {
        Date
    } = req.body;
    const logged_userId = req.Logged_userId.data;
    try {
        let getAvailablity  = await pool.query(BarberScheduleModel.getBarberAvailablity_barberView,[logged_userId,Date])
        if(getAvailablity.rows.length!=0){
            res.status(200).send(getAvailablity.rows)
        }
        else{
            res.send("There is no Availablity recorded for this date. Kindly, record the availablity on update availablity page.")
        }
    }catch (error) {
        res.status(400).send(error)
    }

}

const deleteBarberSchedule= async (req,res)=>{
    const {
        aptIdsTodelete
    } = req.body;
    try {
        for (let aptId of aptIdsTodelete) {
            if (aptId != null) {
                await pool.query(BarberScheduleModel.deleteAvailablity, [aptId])
            }
        }
        res.status(200).send("Hours Deleted.")

    } catch (error) {
        res.status(400).send(error)
    }

}

module.exports = {
    addAvaliblilty,
    getBarberAvailablity_barberView,
    deleteBarberSchedule
}