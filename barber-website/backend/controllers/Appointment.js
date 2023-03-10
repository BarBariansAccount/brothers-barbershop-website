require('dotenv').config();
const pool = require('../config/database.js')
const AppointmentModel = require("../models/AppointmentModel.js");
const JWT = require("jsonwebtoken");
const sendgrid = require("@sendgrid/mail");

const BarberAvailablityDates = async (req, res) => {
    const {
        BarberID,
    } = req.body;
    let today = new Date();
    let dd = today.getDate().toString();
    let mm = ((today.getMonth()) + 1).toString();
    let yyyy = today.getFullYear().toString();
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
const addAppointment = async (req, res) => {
    let is_booked = false
    const {
        appointment_id,
        Customer_First_name,
        Customer_Last_name,
        Customer_email,
        Customer_telephone,
        service,
        Customer_appointment_notes,
        doesnt_send_email = false
    } = req.body;
    //Me changed 
    // for chacking the selected appointment was booked or not 
    try {
        const result = await pool.query(AppointmentModel.isBooked, [appointment_id])
        is_booked = result.rowCount > 0 ? true : false
        if (is_booked) {
            return res.status(400).send('booked already')
        }
    } catch (error) {
        res.status(405).send(error)
    }

    try {
        await pool.query(AppointmentModel.addAppointment, [appointment_id, Customer_First_name, Customer_Last_name, Customer_email, Customer_telephone, service, Customer_appointment_notes])
        const accessToken = await JWT.sign(
            {
                data: appointment_id,
            },
            process.env.ACCESS_TOKEN_SECRET
        );

        const URL = process.env.Frontend_URL + "appointment/" + accessToken;

        if (!doesnt_send_email) {
            //sending email
            sendgrid.setApiKey(process.env.SG_API_KEY)

            await sendgrid.send({
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

            })
        }
        res.status(200).send({ accessToken })
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
const updateAppointment = async (req, res) => {
    const {
        accessToken,
        Customer_First_name,
        Customer_Last_name,
        Customer_email,
        Customer_telephone,
        Customer_appointment_notes,
        doesnt_send_email = false
    } = req.body;

    try {
        let appointment_id = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        appointment_id = appointment_id.data;

        await pool.query(AppointmentModel.updateAppointment, [appointment_id, Customer_First_name, Customer_Last_name, Customer_email, Customer_telephone, Customer_appointment_notes])
        const accessToken2 = await JWT.sign(
            {

                data: appointment_id,
            },
            process.env.ACCESS_TOKEN_SECRET
        );
        const URL = process.env.Frontend_URL + "appointment/" + accessToken2;
        //sending email
        if (!doesnt_send_email) {
            sendgrid.setApiKey(process.env.SG_API_KEY)

            await sendgrid.send({
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

            })
        }
        res.status(200).send({ accessToken: accessToken2 })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

const cancelAppointment = async (req, res) => {
    const {
        accessToken,
        doesnt_send_email = false
    } = req.body;

    try {
        let appointment_id = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        appointment_id = appointment_id.data;

        let result = await pool.query(AppointmentModel.customerAppointmentDetails, [appointment_id])

        await pool.query(AppointmentModel.cancelAppointment, [appointment_id])


        if (!doesnt_send_email) {
            sendgrid.setApiKey(process.env.SG_API_KEY)

            await sendgrid.send({
                to: {
                    email: result.rows[0].customer_email,
                    name: result.rows[0].customer_first_name
                },
                from: {
                    email: process.env.Barbershop_Email,
                    name: 'Brothers Barber Shop Queen Marry'
                },
                templateId: 'd-071684c95f7a4b0d967f86a698b6a2cf',
                dynamicTemplateData: {
                    link: process.env.Frontend_URL,
                    name: result.rows[0].customer_first_name + result.rows[0].customer_last_name
                },

            })
        }
        res.status(200).send({ msg: 'success' })


    } catch (error) {
        res.status(400).send(error)
    }
}

const getAllBookedAppointment = async (req, res) => {
    const {
        UserID
    } = req.body;

    let today = new Date();
    let dd = today.getDate().toString();
    let mm = ((today.getMonth()) + 1).toString();
    let yyyy = today.getFullYear().toString();
    today = yyyy + '-' + mm + '-' + dd
    try {

        let results = await pool.query(AppointmentModel.getAllBookedAppointment, [UserID, today])

        res.status(200).send(results.rows)



    } catch (error) {
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
    cancelAppointment,
    getAllBookedAppointment
}