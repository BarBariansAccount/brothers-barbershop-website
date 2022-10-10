const express = require("express");
const router = express.Router();
const User = require("../controllers/user.js");


router.get('/',(req,res) =>{
        res.send({
            message: "hello"
        })
    })

/* 
To get all the users in users table Mainly for testing.
*/
router.get('/users',User.getusers);

/*
Takes --> {UserRole, Email, FirstName, LastName, Telephone, Password} As json 
returns --> res.send('User already exists.') || res.status(201).send(`New user: ${Telephone} sucessfully created.`) || throws error
*/
router.post('/createUser', User.createUser); 

/*
Takes --> {Telephone, Password} As json 
returns --> res.send(`There is no user with ${Telephone}.`) || res.send('Password is incorrect'); || JWT token if the authorization is sucessfull || throws error
*/
router.get('/Login', User.validateLogin)

/*

*/
router.post('/updateUser', User.updateUser);

/*
Takes --> {Telephone} As json 
returns --> res.send(`User has been sucessfully deleted with: ${Telephone}`) || throws error
*/
router.post('/deleteUser', User.deleteUser);



module.exports = router;
