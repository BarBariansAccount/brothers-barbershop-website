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
        req.Logged_userId=Logged_userId;
        
        next()
    })
}

router.get('/',(req,res) =>{
        res.send({
            message: "hello"
        })
    })


router.get("/", (req, res) => {
  res.send({
    message: "hello",
  });
});

/* 
Takes --> authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only see all acccounts.

returns -->res.status(403).send("Malacious user. Only admin can see this infomation.");
        || res.status(200).json(results.rows);
To get all the users in users table Mainly for testing.
*/

router.get('/users',authenticateToken,User.getusers);


/*

Takes --> {UserRole, Email, FirstName, LastName, Telephone, Password} As json &&
    Takes authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only create acccounts.
returns --> res.status(403).send("Malacious user. Only admin can create accounts.");
         ||  res.status(200).send(`New user: ${FirstName} sucessfully created.`) 
         || res.status(400).send('User already exists. Enter different phone number.');
         || res.status(400).send('User Role can only be "Customer" OR "Admin" OR "Barber"');
         || res.status(400).send(error)
*/

router.post('/createUser',authenticateToken, User.createUser); //FOR ADMINS TO CREATE [BARBERS || ADMIN] ACCOUNTS

/*
Assumptions--> user role will always be 'Customer' inside the controller so no need to pass along
Takes --> {Email, FirstName, LastName, Telephone, Password} As json 

returns --> res.status(200).json({Token: accessToken ,User: Results.rows[0]}); {Token, User: {userid, userrole, email, firstname, lastname}} As json;
        || res.status(400).send('User already exists. Enter different phone number.');
        ||res.status(400).send(error)
*/
router.post('/createUser_customers',User.createUser_customers);//FOR CUSTOMERS


/*
Takes --> {Telephone, Password} As json 
returns --> 
     res.status(200).json({Token: accessToken,User: Results.rows[0]})--> {Token, User: {userid, userrole, email, firstname, lastname}} As json;
    ||res.status(400).send(`There is no user with ${Telephone}.`);
    || res.status(400).send('Password is incorrect'); 

*/
router.post("/Login", User.validateLogin);

/*

Takes --> {Email, FirstName, LastName} As json && 
        Takes authentication token in headers in the format {'authorization': Bearer token} --> user login token

returns --> || res.status(200).send(getuser.rows)--> {userid, userrole, email, firstname, lastname} As json;
            || res.status(400).send(error)
*/

router.post('/updateUser' ,authenticateToken, User.updateUser);

/*
Takes --> {UserID} As json &&  
Takes authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only delete acccounts.

returns --> return res.status(403).send("Malacious user. Only admin can delete accounts.");
            ||res.status(200).send(`User has been sucessfully deleted with User ID: ${UserID}.`) 
            || res.status(400).send(`There is no user with this user ID: ${UserID}.`);
            ||res.status(400).send(error)
*/

router.post('/deleteUser',authenticateToken, User.deleteUser);

/*
Takes --> Takes authentication token in headers in the format {'authorization': Bearer token} --> user login token
returns -->   res.status(200).json(results.rows) -->{userid, userrole, email, firstname, lastname} As json;
             || res.status(400).send(error)
*/
router.get('/getUser',authenticateToken, User.getUser);

/*
Takes --> {OldPassword,NewPassword} As json && 
Also takes authentication token in headers in the format {'authorization': Bearer token}--> user login token who wants to change their password

returns -->   res.status(400).send('Old Password is incorrect.');
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

router.get('/getStatus',BusyStatus.getStatus);


/*
takes --> {"Status": "Busy"}
        ||{"Status": "Not Busy"}
        ||{"Status": "Empty"} && Also takes authentication token in headers in the format {'authorization': Bearer token}--> admin login token

 Returns -->  res.status(200).send("Status is set to: Busy");
            ||res.status(200).send("Status is set to: Not Busy");
            ||res.status(200).send("Status is set to: Empty");
    ||res.status(403).send("Malacious user. Only admin can change status.");--> if status is changed by any other account catagory other then admin
*/
router.get('/updateStatus', BusyStatus.updateStatus);


module.exports = router;
