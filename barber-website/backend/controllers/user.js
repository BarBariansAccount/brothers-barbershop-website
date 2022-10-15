const pool = require('../config/database.js')
const UserModel = require("../models/UserModel.js")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken");


// to get all users in the database
const getusers = (req, res) => {
    try {
        pool.query(UserModel.getUsers, (err, results) => {
            if (err) {
                res.send(err)
            }
            res.status(200).json(results.rows);

        })
    } catch (err) {
        console.log(err)
    }
}

const createUser = (req, res) => {
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
        pool.query(UserModel.checkUserExists, [Telephone], (error, result) => {
            if (!(UserRole == "Customer" || UserRole == "Admin" || UserRole == "Barber")) {
                res.status(400).send('User Role can only be "Customer" OR "Admin" OR "Barber"');
            } else if (result.rows.length) {
                res.status(400).send('User already exists. Enter different phone number.');
            } else if (error) {
                throw error;
            } else {
                //adding a new user
                try {
                    pool.query(UserModel.addUser, [UserRole, Email, FirstName, LastName, Telephone, hash], (err, results) => {
                        if (err) {
                            throw error;
                        }
                        res.status(200).send(`New user: ${FirstName} sucessfully created.`)
                    })
                } catch (err) {
                    res.status(400).send(err);
                }
            }
        })
    } catch (error) {
        console.log(error)
    }

}

const validateLogin = (req, res) => {
    const {
        Telephone,
        Password
    } = req.body;

    try {
        pool.query(UserModel.checkUserExists, [Telephone], (error, Results) => {
            if (Results.rows.length == 0) {
                res.status(400).send(`There is no user with ${Telephone}.`);
            } else if (error) {
                throw error;
            } else if (Results.rows.length == 1) {

                if (!bcrypt.compareSync(Password, Results.rows[0].password)) {
                    res.status(400).send('Password is incorrect.');
                }
                if (bcrypt.compareSync(Password, Results.rows[0].password)) {

                    res.status(200).json(Results.rows);
                }
            }
        })
    } catch (error) {
        console.log(error)
    }

}

const updateUser = (req, res) => {
    const {
        Email,
        FirstName,
        LastName,
        Telephone,
        Password
    } = req.body;
    try {
        pool.query(UserModel.checkUserExists, [Telephone], (error, results) => {
            if (results.rows.length == 0) {
                res.status(400).send(`This phone number is not associated with any account: ${Telephone}. Please try providing another phone number.`);
            } else if (error) {
                throw error;
            } else {
                const hash = bcrypt.hashSync(Password, 12);
                try {
                    pool.query(UserModel.updateUser, [Email, FirstName, LastName, Telephone, hash], (err, results) => {
                        
                        if (err) {
                            throw err;
                        }
                        
                        res.status(200).send("Information has been updated.")
                    })
                } catch (err) {
                    res.status(400).send(err);
                }

            }
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteUser = (req, res) => {
    const {
        Telephone
    } = req.body;
    try {
        pool.query(UserModel.checkUserExists, [Telephone], (error, results) => {
            if (results.rows.length == 0) {
                res.status(400).send(`There is no user with the number: ${Telephone}.`);
            } else if (error) {
                throw error;
            } else {
                try {
                    pool.query(UserModel.deleteUser, [Telephone], (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            res.status(200).send(`User has been sucessfully deleted with: ${Telephone}.`)
                        }
                    })
                } catch (err) {
                    res.status(400).send(err);
                }
            }
        })

    } catch (error) {
        res.status(400).send(error)
    }
}

const getUser = (req, res) => {
    const {
        Telephone
    } = req.body;
    try {
        pool.query(UserModel.checkUserExists, [Telephone], (error, results) => {
            if (results.rows.length == 0) {
                res.status(400).send(`There is no user with the number: ${Telephone}.`);
            } else if (error) {
                throw error;
            } else {
                res.status(200).json(results.rows)
            }
        })
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