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
returns --> res.status(200).send(`New user: ${FirstName} sucessfully created.`) 
|| res.status(400).send('User already exists. Enter different phone number.');
 || res.status(400).send('User Role can only be "Customer" OR "Admin" OR "Barber"');
*/
router.post('/createUser', User.createUser); 

/*
Takes --> {Telephone, Password} As json 
returns --> res.status(400).send(`There is no user with ${Telephone}.`); || res.status(400).send('Password is incorrect'); || JWT token if the authorization is sucessfull
*/
router.post('/Login', User.validateLogin)

/*
Assumptions --> Telephone number cannot be changed or updated.
Takes --> {Email, FirstName, LastName, Telephone, Password} As json 
returns --> res.send(`This phone number is already associated with another account: ${Telephone}. Please try providing another phone number.`);
            || res.send(`This email is already associated with another account: ${Email}. Please try providing another Email.`);
            || res.send("Information has been updated")
            || throws error
*/
router.post('/updateUser', User.updateUser);

/*
Takes --> {Telephone} As json 
returns --> res.status(200).send(`User has been sucessfully deleted with: ${Telephone}.`) 
            || res.status(400).send(`There is no user with the number: ${Telephone}.`);
            ||res.status(400).send(error)
*/
router.post('/deleteUser', User.deleteUser);


/*
Takes --> {Telephone} As json 
returns --> res.status(200).json(results.rows); || throws error
*/
router.get('/getUser', User.getUser);



module.exports = router;
