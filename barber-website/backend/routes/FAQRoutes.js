require('dotenv').config();
const express = require("express");
const FAQrouter = express.Router();
const FAQ = require("../controllers/FAQ.js");
const JWT = require("jsonwebtoken");
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
FAQ
*****
*/

/* To get all the FAQ in FAQ  table .*/

FAQrouter.get('/getFAQ', FAQ.getFAQ);

/*
Takes --> {question, answer} As json &&   
Takes authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only update FAQs.

returns --> return res.status(403).send("Malacious user. Only admin can add FAQs.");
            ||res.status(200).send(`The FAQ  has been sucessfully updated.`) 
            || res.status(400).send(`The FAQ ID does not exist.`);
            ||res.status(400).send(error)
*/

FAQrouter.post('/addFAQ', authenticateToken, FAQ.addFAQ);

/*
Takes --> {faqid, question, answer} As json &&  
Takes authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only update FAQs.

returns --> return res.status(403).send("Malacious user. Only admin can update FAQs.");
            ||res.status(200).send(`The FAQ  has been sucessfully updated.`) 
            || res.status(400).send(`The FAQ ID does not exist.`);
            ||res.status(400).send(error)
*/
FAQrouter.put('/updateFAQ', authenticateToken, FAQ.updateFAQ);

/*
Takes --> {faqid} As json &&  
Takes authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only delete FAQs.

returns --> return res.status(403).send("Malacious user. Only admin can delete FAQs.");
            ||res.status(200).send(`The FAQ  has been sucessfully deleted.`) 
            || res.status(400).send(`The FAQ ID does not exist.`);
            ||res.status(400).send(error)
*/
FAQrouter.delete('/deleteFAQ', authenticateToken, FAQ.deleteFAQ);

module.exports = FAQrouter;
