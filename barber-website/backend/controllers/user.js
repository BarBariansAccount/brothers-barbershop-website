const pool = require('../config/database.js')
const UserModel = require("../models/UserModel.js")
const bcrypt = require("bcryptjs")

const getusers = (req,res) => {
    pool.query(UserModel.getUsers, (err, results) =>{
        if (err) throw err;
        res.status(200).json(results.rows);

    })
};

const createUser = (req,res) => {
    const {UserRole, Email, FirstName, LastName, Telephone, Password} = req.body;

    //checking if email already exists
    pool.query(UserModel.checkUserExists, [Telephone], (error,result) =>{
        if(result.rows.length){
            res.send('Email already exists.');
        }
        if (error) throw error;
        //adding a new user
        pool.query(UserModel.addUser, [UserRole, Email, FirstName, LastName, Telephone, Password], (error,results) => {
            if (error) throw error;
            res.status(201).send(`New user: ${Telephone} sucessfully created.`) 
        })
    }) 
}
const validateLogin=(req,res) =>{
    const {Telephone, Password} = req.body;
    pool.query(UserModel.checkUserExists, [Telephone], (error,results) =>{
        if(results.rows.length==0){
            res.send(`There is no user with ${Telephone}.`);
        }
        if (error) throw error;
    }) 
    
     pool.query(UserModel.checkPassword, [Telephone,Password], (err,result) =>{

         if(result.rows.length==0){
            res.send('Password is incorrect');
        }
        if (result.rows.length!=0){
            res.status(200).json(result.rows);
        }

        if (err) {
            
            throw err;
            }
    })   
}

const updateUser = (req, res) =>{
    const {Email, FirstName, LastName, Telephone, Password} = req.body;

    // Check if logged in
    // ...

    // Retrieve old password
    pool.query(UserModel.checkUserExists , [Telephone], (error, results) => {
        if(results.rows.length == 0){
            res.send(`There is no user with the number: ${Telephone}.`);
        }
        if (error) throw error;

	// Check if old password matches
	// if(bcrypt.compareSync(Password, results.row[0].password)) {
	if(Password === results.rows[0].password) {

	    // Replace old password with new
	    const hash = bcrypt.hashSync(Password, 12);
	    pool.query(UserModel.updateUser, [Email, FirstName, LastName, Telephone, hash], (error, results) => {
		if (error) throw error;
		res.status(200)
	    }) 
	} else {
	    res.send(`Error`);
	}
    }) 
}

module.exports = {
    getusers,
    createUser,
    validateLogin,
    updateUser,
};
