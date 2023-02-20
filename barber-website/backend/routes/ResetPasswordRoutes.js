require('dotenv').config();
const express = require("express");
const router = express.Router();
const ResetPassword = require("../controllers/ResetPassword.js");
const JWT = require("jsonwebtoken");

/*
JWT authentication
*/
function authenticateToken(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) {
          return res.status(401).send("Send Token Please!");
        }
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, Logged_userId) => {
          if (err) {
            return res.status(403).send("Please Login again.");
          }
          req.Logged_userId = Logged_userId;
      
          next();
        });
      }


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

/*
Takes --> {
        "NewPassword": "xyzxyz"
} As json && 
Also takes authentication token in headers in the format {'authorization': Bearer token}--> user login token who wants to change their password

returns -->   res.status(200).send("Password is changed sucessfully.");
             || res.status(400).send(error);

Note: you just need to send the authenticate token which I am sending back after the verification and the new password user set

Route:  http://localhost:5001/resetPassword/Change_Password
*/

router.put('/Change_Password', authenticateToken, ResetPassword.Change_Password);

module.exports = router;