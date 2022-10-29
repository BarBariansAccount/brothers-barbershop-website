require('dotenv').config();
const express = require("express");
const router = express.Router();
const User = require("../controllers/user.js");
const BusyStatus = require("../controllers/BusyStatus.js");
const JWT = require("jsonwebtoken");


function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token= authHeader && authHeader.split(' ')[1]
    if (token== null) {
        return res.status(401).send('Send Token Please!')
    }
    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,Logged_userId)=>{
        if (err){
           return res.status(403).send("Please Login again.");
        }
        req.userId=Logged_userId
        next()
    })
}

router.get('/',(req,res) =>{
        res.send({
            message: "hello"
        })
    })

/* 
To get all the users in users table Mainly for testing.
*/
router.get('/users',authenticateToken,User.getusers);

/*
Takes --> {UserRole, Email, FirstName, LastName, Telephone, Password} As json 
returns --> res.status(200).send(`New user: ${FirstName} sucessfully created.`) 
|| res.status(400).send('User already exists. Enter different phone number.');
 || res.status(400).send('User Role can only be "Customer" OR "Admin" OR "Barber"');
*/
router.post('/createUser',authenticateToken, User.createUser); //FOR ADMINS TO CREATE BARBERS ACCOUNTS
router.post('/createUser_customers',User.createUser);//FOR CUSTOMERS

/*
Takes --> {Telephone, Password} As json 
returns --> 
    res.status(200).json(Results.rows); -->{userid, userrole, email, firstname, lastname} As json;
    ||res.status(400).send(`There is no user with ${Telephone}.`);
    || res.status(400).send('Password is incorrect'); 

*/
router.post('/Login', User.validateLogin)

/*
Assumptions --> please dont send telephone numbers, instead send user id
Takes --> {UserID, Email, FirstName, LastName} As json 
returns --> res.send(User not exists.);
            || res.status(200).send(getuser.rows)--> {userid, userrole, email, firstname, lastname} As json;
            || res.status(400).send(error)
*/
router.post('/updateUser' ,authenticateToken, User.updateUser);

/*
Takes --> {UserID} As json 
returns --> res.status(200).send(`User has been sucessfully deleted with User ID: ${UserID}.`) 
            || res.status(400).send(`There is no user with this user ID: ${UserID}.`);
            ||res.status(400).send(error)
*/
router.post('/deleteUser',authenticateToken, User.deleteUser);


/*
Takes --> {UserID} As json 
returns -->  res.status(400).send(`There is no user with this user ID: ${UserID}.`);
             || res.status(200).json(results.rows) -->{userid, userrole, email, firstname, lastname} As json;
             || res.status(400).send(error)
*/
router.get('/getUser',authenticateToken, User.getUser);


/*
Takes --> {UserID, OldPassword,NewPassword} As json 
returns -->  res.status(400).send(`There is no user with this user ID: ${UserID}.`);
             ||  res.status(400).send('Old Password is incorrect.');
             || res.status(200).send("Password is changed sucessfully.");
             || res.status(400).send(error);
*/

router.post('/updatePassword',authenticateToken,User.updatePassword);

/*
*****
Busy Status
*****
*/

/*
Default--> Empty
returns --> res.status(200).send("Busy");
            || res.status(200).send("Not Busy");
            || res.status(200).send("Empty");

*/
router.get('/getStatus',authenticateToken,BusyStatus.getStatus);

/*
takes --> {"Status": "Busy"}
        ||{"Status": "Not Busy"}
        ||{"Status": "Empty"}

 Returns -->  res.status(200).send("Status is set to: Busy");
            ||res.status(200).send("Status is set to: Not Busy");
            ||res.status(200).send("Status is set to: Empty");
*/
router.post('/updateStatus',authenticateToken, BusyStatus.updateStatus);


module.exports = router;
