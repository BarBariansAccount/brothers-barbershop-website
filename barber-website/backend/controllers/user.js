require('dotenv').config();
const pool = require('../config/database.js')
const UserModel = require("../models/UserModel.js")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken");


const getusers = async (req, res) => {

    try {
        let results = await pool.query(UserModel.getUsers)

        res.status(200).json(results.rows);

    } catch (err) {
        res.status(400).send(err)
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
        let result = await pool.query(UserModel.checkUserExists_telephone, [Telephone])
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
        res.status(400).send(error)
    }
}

const validateLogin = async (req, res) => {
    const {
        Telephone,
        Password
    } = req.body;

    try {
        
        let Results = await pool.query(UserModel.checkUserExists_telephone, [Telephone])
        if (Results.rows.length == 0) {
            res.status(400).send(`There is no user with ${Telephone}.`);
        } else if (Results.rows.length == 1) {
            let getpassword= await pool.query(UserModel.getpassword_telephone, [Telephone])

            if (!bcrypt.compareSync(Password, getpassword.rows[0].password)) {
                res.status(400).send('Password is incorrect.');
            }
            if (bcrypt.compareSync(Password, getpassword.rows[0].password)) {

                const accessToken= JWT.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: Results.rows[0].userid
                  }, process.env.ACCESS_TOKEN_SECRET);

                res.status(200).json({Token: accessToken,UserRole: Results.rows[0].userrole});
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

const updateUser = async (req, res) => {
    const {
        UserID,
        Email,
        FirstName,
        LastName,
    } = req.body;
    try {
        let results = await pool.query(UserModel.checkUserExists, [UserID]);
        if (results.rows.length == 0) {
            return res.status(400).send(`User not exists.`);
        }
    //const hash = bcrypt.hashSync(Password, 12);
        results = await pool.query(UserModel.updateUser, [Email, FirstName, LastName, UserID]);
       
        let getuser= await pool.query(UserModel.checkUserExists, [UserID]);

        res.status(200).send(getuser.rows);
    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteUser = async (req, res) => {
    const {
        UserID
    } = req.body;
    try {
        let results = await pool.query(UserModel.checkUserExists, [UserID])

        if (results.rows.length == 0) {
            return res.status(400).send(`There is no user with this user ID: ${UserID}.`);
        }

        results = await pool.query(UserModel.deleteUser, [UserID]);

        res.status(200).send(`User has been sucessfully deleted with User ID: ${UserID}.`)

    } catch (error) {
        res.status(400).send(error)
    }
}

const getUser = async (req, res) => {
    const {
        UserID
    } = req.body;
    try {
        let results = await pool.query(UserModel.checkUserExists, [UserID])

        if (results.rows.length == 0) {
            return res.status(400).send(`There is no user with this user ID: ${UserID}.`);
        } else {
            res.status(200).send(results.rows)
        }

    } catch (error) {
        res.status(400).send(error)
    }
}

const updatePassword= async(req,res)=>{
    const {
        UserID,
        OldPassword,
        NewPassword
    } = req.body;

    try {
        let results = await pool.query(UserModel.checkUserExists, [UserID])

        if (results.rows.length == 0) {
            return res.status(400).send(`There is no user with this user ID: ${UserID}.`);
        } else {

            let getpassword= await pool.query(UserModel.getpassword, [UserID]);
            if (!bcrypt.compareSync(OldPassword, getpassword.rows[0].password)) {
                res.status(400).send('Old Password is incorrect.');
            }
            
            else{
                const hash = bcrypt.hashSync(NewPassword, 12);
                results = await pool.query(UserModel.updatePassword, [UserID,hash]);
                res.status(200).send("Password is changed sucessfully.");
            }
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
    getUser,
    updatePassword
};