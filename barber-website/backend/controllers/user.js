const pool = require('../config/database.js')
const UserModel = require("../models/UserModel.js")

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

module.exports = {
    getusers,
    createUser,
    validateLogin,
};