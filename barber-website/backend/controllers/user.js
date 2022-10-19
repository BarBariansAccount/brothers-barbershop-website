const pool = require('../config/database.js')
const UserModel = require("../models/UserModel.js")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken");


// to get all users in the database
const getusers = async (req, res) => {
    try {
        let results = await pool.query(UserModel.getUsers)

        res.status(200).json(results.rows);


    } catch (err) {
        console.log(err)
    }
}

const createUser = async (req, res) => {
    const {
        UserRole,
        Email,
        FirstName,
        LastName,
        Telephone,
        Password
    } = req.body;

    const hash = bcrypt.hashSync(Password, 12);

    //checking if email already exists
    try {
        let result = await pool.query(UserModel.checkUserExists, [Telephone])
        if (!(UserRole == "Customer" || UserRole == "Admin" || UserRole == "Barber")) {
            res.status(400).send('User Role can only be "Customer" OR "Admin" OR "Barber"');
        } else if (result.rows.length) {
            res.status(400).send('User already exists. Enter different phone number.');
        } else {
            //adding a new user

            result = await pool.query(UserModel.addUser, [UserRole, Email, FirstName, LastName, Telephone, hash])

            res.status(200).send(`New user: ${FirstName} sucessfully created.`)


        }

    } catch (error) {
        console.log(error)
    }

}

const validateLogin = async (req, res) => {
    const {
        Telephone,
        Password
    } = req.body;

    try {
        let Results = await pool.query(UserModel.checkUserExists, [Telephone])
        if (Results.rows.length == 0) {
            res.status(400).send(`There is no user with ${Telephone}.`);
        } else if (Results.rows.length == 1) {

            if (!bcrypt.compareSync(Password, Results.rows[0].password)) {
                res.status(400).send('Password is incorrect.');
            }
            if (bcrypt.compareSync(Password, Results.rows[0].password)) {

                res.status(200).json(Results.rows);
            }
        }

    } catch (error) {
        console.log(error)
    }

}

const updateUser = async (req, res) => {
    const {
        Email,
        FirstName,
        LastName,
        Telephone,
        Password
    } = req.body;
    try {
        let results = await pool.query(UserModel.checkUserExists, [Telephone]);
        if (results.rows.length == 0) {
            return res.status(400).send(`This phone number is not associated with any account: ${Telephone}. Please try providing another phone number.`);
        }
        const hash = bcrypt.hashSync(Password, 12);
        results = await pool.query(UserModel.updateUser, [Email, FirstName, LastName, Telephone, hash]);

        res.status(200).send("Information has been updated.");
    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteUser = async (req, res) => {
    const {
        Telephone
    } = req.body;
    try {
        let results = await pool.query(UserModel.checkUserExists, [Telephone])




        if (results.rows.length == 0) {
            return res.status(400).send(`There is no user with the number: ${Telephone}.`);
        }

        results = await pool.query(UserModel.deleteUser, [Telephone]);

        res.status(200).send(`User has been sucessfully deleted with: ${Telephone}.`)





    } catch (error) {
        res.status(400).send(error)
    }
}

const getUser = async (req, res) => {
    const {
        Telephone
    } = req.body;
    try {
        let results = await pool.query(UserModel.checkUserExists, [Telephone])

        if (results.rows.length == 0) {
            res.status(400).send(`There is no user with the number: ${Telephone}.`);
        } else {
            res.status(200).json(results.rows)
        }

    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    getusers,
    createUser,
    validateLogin,
    updateUser,
    deleteUser,
    getUser
};