require('dotenv').config();
const express = require("express");
const router = express.Router();
const ResetPassword = require("../controllers/ResetPassword.js");


/*
Takes --> telephone number of user as json--> {
    "Telephone": "" 
}

returns --> res.status(400).send(`There is no user with ${Telephone}.`);
        ||  res.status(200).send(`Verification code is sent to the email.`))
The code will expire in 1 day
Note: need to install --> npm install --save @sendgrid/mail && npm i date-fns
Also need to add reset password table from the schema file
route: http://localhost:5001/resetPassword/SendEmail
*/
router.post('/SendEmail', ResetPassword.SendEmail)

/*
Takes --> telephone number & reset code of the user as json --> {
        'Telephone':'',
        'Reset_Code':''
    } 

returns --> res.status(400).send(`There is no user with ${Telephone}.`);
        ||  res.status(400).send("Please try again sending the verification code to your email.");
        || res.status(400).send("Verification Code is incorrect.");
        || res.status(400).send("Veification Code haas been expired.");
        ||  res.status(200).json({Token: accessToken,User: Results.rows[0]}); \\ login token jwt

The code will expire in 1 day
route: http://localhost:5001/resetPassword/Verification
*/

router.get('/Verification',ResetPassword.Verification)

module.exports = router;