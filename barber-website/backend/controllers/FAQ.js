require('dotenv').config();
const pool = require('../config/database.js')
const faqModel = require("../models/faqModel.js")
const UserModel = require("../models/UserModel.js")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")


const getFAQ = async (req, res) => {

    try {
        let results = await pool.query(faqModel.getFAQ)
        if (results.rows.length == 0) {
            res.status(400).send(`There are no FAQ to be shown.`);
        }
        res.status(200).json(results.rows);
    }
    catch (err) {
        res.status(400).send(err)
    }
}


const updateFAQ = async (req, res) => {
    const { faqid, question, answer } = req.body;
    const logged_userId = req.Logged_userId.data;
    try {
        let loggedUserRole = await pool.query(UserModel.checkUserExists, [logged_userId]);
        if (!(loggedUserRole.rows[0].userrole == "Admin")) {
            return res.status(403).send("Malacious user. Only admin can update FAQ's.");
        }
        let results = await pool.query(faqModel.checkFAQExists, [faqid]);//error
        if (results.rows.length == 0) {
            return res.status(400).send(`The FAQ ID does not exist.`);
        }
        results = await pool.query(faqModel.updateFAQ, [faqid, question, answer])//error
        res.status(200).send(`The FAQ  has been sucessfully updated.`)
    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteFAQ = async (req, res) => {
    const { faqid } = req.body;
    const logged_userId = req.Logged_userId.data;
    try {
        let loggedUserRole = await pool.query(UserModel.checkUserExists, [logged_userId]);
        if (!(loggedUserRole.rows[0].userrole == "Admin")) {
            return res.status(403).send("Malacious user. Only admin can delete FAQ's.");
        }
        let results = await pool.query(faqModel.checkFAQExists, [faqid])//error
        if (results.rows.length == 0) {
            return res.status(400).send(`The FAQ ID does not exist.`);
        }
        results = await pool.query(faqModel.deleteFAQ, [faqid]);
        res.status(200).send(`The FAQ  has been sucessfully deleted.`)


    } catch (error) {
        res.status(400).send(error)
    }
}
const addFAQ = async (req, res) => {
    const { question, answer } = req.body;
    const logged_userId = req.Logged_userId.data;
    try {
        let loggedUserRole = await pool.query(UserModel.checkUserExists, [logged_userId]);
        if (!(loggedUserRole.rows[0].userrole == "Admin")) {
            return res.status(403).send("Malacious user. Only admin can add FAQ's.");
        }
        let results = await pool.query(faqModel.addFAQ, [question, answer])
        res.status(200).send(`The FAQ  has been sucessfully added.`)
    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = {
    getFAQ,
    updateFAQ,
    deleteFAQ,
    addFAQ
};
