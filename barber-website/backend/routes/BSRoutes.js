require('dotenv').config();
const express = require("express");
const BSRouter = express.Router();
const BusyStatus = require("../controllers/BusyStatus.js");
const JWT = require("jsonwebtoken");
const path = require('path')

/*
JWT authentication
*/
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).send('Send Token Please!')
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, Logged_userId) => {
        if (err) {
            return res.status(403).send("Please Login again.");
        }
        req.Logged_userId = Logged_userId;

        next()
    })
}
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

BSRouter.get('/getStatus', BusyStatus.getStatus);


/*
takes --> {"Status": "Busy"}
        ||{"Status": "Not Busy"}
        ||{"Status": "Empty"} && Also takes authentication token in headers in the format {'authorization': Bearer token}--> admin login token

 Returns -->  res.status(200).send("Status is set to: Busy");
            ||res.status(200).send("Status is set to: Not Busy");
            ||res.status(200).send("Status is set to: Empty");
    ||res.status(403).send("Malacious user. Only admin can change status.");--> if status is changed by any other account catagory other then admin
*/

BSRouter.put('/updateStatus', authenticateToken, BusyStatus.updateStatus);

module.exports = BSRouter;