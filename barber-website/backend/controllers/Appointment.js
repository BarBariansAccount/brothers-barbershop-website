require('dotenv').config();
const pool = require('../config/database.js')
const AppointmentModel = require("../models/AppointmentModel.js");
const JWT = require("jsonwebtoken");
const sendgrid = require("@sendgrid/mail");

const BarberAvailablityDates = async (req, res) => {
    const {
        BarberID,
    } = req.body;
    var today = new Date();
    var dd = today.getDate().toString();
    var mm = ((today.getMonth()) + 1).toString();
    var yyyy = today.getFullYear().toString();
    today = yyyy + '-' + mm + '-' + dd

    try {
        let availableDates = await pool.query(AppointmentModel.getBarberAvailablityDates, [BarberID, today])
        res.status(200).send(availableDates.rows)

    } catch (error) {
        res.status(400).send(error)
    }

}

const getBarberAvailablity_Hours = async (req, res) => {
    const {
        BarberID,
        Available_Date
    } = req.body;

    try {
        let availableHours = await pool.query(AppointmentModel.getBarberAvailablity_Hours, [BarberID, Available_Date])
        res.status(200).json(availableHours.rows)
    } catch (error) {
        res.status(400).send(error)
    }
}
//ME changed
const addAppointment = async (req, res) => {
    const {
        appointment_id,
        Customer_First_name,
        Customer_Last_name,
        Customer_email,
        Customer_telephone,
        service,
        Customer_appointment_notes
    } = req.body;
    try {
        await pool.query(AppointmentModel.addAppointment, [appointment_id, Customer_First_name, Customer_Last_name, Customer_email, Customer_telephone, service, Customer_appointment_notes])
        const accessToken = await JWT.sign(
            {

                data: appointment_id,
            },
            process.env.ACCESS_TOKEN_SECRET
        );
        const URL = process.env.Backend_URL + "Appointment/AppointmentDetails/" + accessToken;

        //sending email
        await sendgrid.setApiKey(process.env.SG_API_KEY)

        sendgrid.send({
            to: {
                email: Customer_email,
                name: Customer_First_name
            },
            from: {
                email: process.env.Barbershop_Email,
                name: 'Brothers Barber Shop Queen Marry'
            },
            templateId: 'd-c60813a5b72e451bad371d9a475e618d',
            dynamicTemplateData: {
                link: URL,
                name: Customer_First_name
            },

        }).then(() =>
            //change accordingly
            res.status(200).send({ accessToken })
        )

    } catch (error) {
        res.status(400).send(error)
    }
}
const getAllBarbers = async (req, res) => {
    try {
        let AllBarbers = await pool.query(AppointmentModel.getAllBarbers)

        res.status(200).json(AllBarbers.rows)
    } catch (error) {
        res.status(400).send(error)
    }

}
//ME changed
const customerAppointmentDetails = async (req, res) => {
    const accessToken = req.params.token;

    try {
        let appointment_id = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        appointment_id = appointment_id.data;

        let appointmentDetails = await pool.query(AppointmentModel.customerAppointmentDetails, [appointment_id])
        res.status(200).json(appointmentDetails.rows)
    } catch (error) {
        res.status(400).send(error)
    }
}
//changed
const updateAppointment = async (req, res) => {
    const {
        accessToken,
        Customer_First_name,
        Customer_Last_name,
        Customer_email,
        Customer_telephone,
        service,
        Customer_appointment_notes
    } = req.body;

    try {
        let appointment_id = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        appointment_id = appointment_id.data;

        await pool.query(AppointmentModel.addAppointment, [appointment_id, Customer_First_name, Customer_Last_name, Customer_email, Customer_telephone, service, Customer_appointment_notes])
        // accessToken2 = await JWT.sign(
        //     {

        //         data: appointment_id,
        //     },
        //     process.env.ACCESS_TOKEN_SECRET
        // );
        const URL = process.env.Backend_URL + "Appointment/AppointmentDetails/" + accessToken;

        //sending email
        await sendgrid.setApiKey(process.env.SG_API_KEY)

        sendgrid.send({
            to: {
                email: Customer_email,
                name: Customer_First_name
            },
            from: {
                email: process.env.Barbershop_Email,
                name: 'Brothers Barber Shop Queen Marry'
            },
            templateId: 'd-c60813a5b72e451bad371d9a475e618d',
            dynamicTemplateData: {
                link: URL,
                name: Customer_First_name
            },

        }).then(() =>
            //change accordingly
            res.send({ accessToken })
        )

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

const cancelAppointment = async (req, res) => {
    const {
        accessToken
    } = req.body;

    try {
        let appointment_id = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        appointment_id = appointment_id.data;

        await pool.query(AppointmentModel.cancelAppointment, [appointment_id])

        res.send({ msg: 'success' })


    } catch (error) {

        console.log(error)
        res.status(400).send(error)
    }
}

module.exports = {
    BarberAvailablityDates,
    getBarberAvailablity_Hours,
    addAppointment,
    getAllBarbers,
    customerAppointmentDetails,
    updateAppointment,
    cancelAppointment
}