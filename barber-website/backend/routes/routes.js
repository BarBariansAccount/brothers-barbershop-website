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
returns --> res.send('User already exists.') || res.status(201).send(`New user: ${FirstName} sucessfully created.`) || throws error
*/
router.post('/createUser', User.createUser); 

/*
Takes --> {Telephone, Password} As json 
returns --> res.send(`There is no user with ${Telephone}.`) || res.send('Password is incorrect'); || JWT token if the authorization is sucessfull || throws error
*/
router.post('/Login', User.validateLogin)

/*
Takes --> {Email, FirstName, LastName, Telephone, Password} As json 
returns --> res.send(`This phone number is already associated with another account: ${Telephone}. Please try providing another phone number.`);
            || res.send(`This email is already associated with another account: ${Email}. Please try providing another Email.`);
            || res.send("Information has been updated")
            || throws error
*/
router.post('/updateUser', User.updateUser);

/*
Takes --> {Telephone} As json 
returns --> res.send(`User has been sucessfully deleted with: ${Telephone}`) || throws error
*/
router.post('/deleteUser', User.deleteUser);


/*
Takes --> {Telephone} As json 
returns --> res.status(200).json(results.rows); || throws error
*/
router.get('/getUser', User.getUser);



module.exports = router;
