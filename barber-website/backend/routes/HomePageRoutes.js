require("dotenv").config();
const express = require("express");
const router = express.Router();
const HomePage = require("../controllers/HomePage.js");
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

//************** About Table************/

/*
Takes --> it takes the JSON in the following format {
    "About":""
} And the jwt token in the form of Bearer Token

returns --> res.status(403).send("Malacious user. Only admin can alter this infomation.");--> if the user changing the info is not admin
            || res.status(200).send("Updated About.")
            || res.status(400).send(err);

Notes: before using this route make sure you have created the about table from the .sql file and inserted a sample row also present in the.sql file

route: http://localhost:5001/HomePage/updateAbout

*/
router.post('/updateAbout',authenticateToken,HomePage.updateAbout);

/*
Takes --> Nothing

returns --> res.status(200).json({About: results.rows[0].title})
            || res.status(400).send(err);

Notes: it returns in the following form,

{
     "About": "the content of the about"
}
route: http://localhost:5001/HomePage/getAbout

*/

router.get('/getAbout',HomePage.getAbout);

//******************Pricing Table************************ */

/*
Takes --> Nothing

returns --> res.status(200).send(results.rows)
            || res.status(400).send(err);

Notes: it returns in the following form,

{
        "service": "Haircut",
        "price": "$35",
        "duration": "45 Minutes"
    },
    {
        "service": "Haircut + Beard",
        "price": "$40",
        "duration": "1 Hour"
    },
    {
        "service": "Line up",
        "price": "$15",
        "duration": "30 Minutes"
    },
    {
        "service": "Beard only",
        "price": "$15",
        "duration": "30 Minutes"
    },
    {
        "service": "Line up + Beard",
        "price": "$20",
        "duration": "30 Minutes"
    }
route: http://localhost:5001/HomePage/getPricing

*/

router.get('/getPricing',HomePage.getPricing);

/*
Takes --> it takes the JSON in the following format {
    "service":"Haircut",--> user shouldnt change it user should only be able to change price and duration
    "price":"$49",
    "duration":"2 Hours"
} And the jwt token in the form of Bearer Token

returns --> res.status(403).send("Malacious user. Only admin can alter this infomation.");--> if the user changing the info is not admin
            || res.status(200).send("Updated Pricing and Duration.")
            || res.status(400).send(err);

Notes: before using this route make sure you have created the about table from the .sql file and inserted a sample rows also present in the.sql file
Table name is Pricing and insert all the rows in .sql file after pricing

route: http://localhost:5001/HomePage/updatePricing

*/

router.post('/updatePricing',authenticateToken,HomePage.updatePricing)


//******************WORKING HOURS************************ */

/*
Takes --> Nothing

returns --> res.status(200).send(results.rows)
            || res.status(400).send(err);

Notes: it returns in the following form,

{
        "day": "SUNDAY",
        "description": "CLOSED"
    },
    {
        "day": "TUESDAY",
        "description": "10 AM - 8 PM"
    },
    {
        "day": "WEDNESDAY",
        "description": "10 AM - 8 PM"
    },
    {
        "day": "THURSDAY",
        "description": "10 AM - 8 PM"
    },
    {
        "day": "FRIDAY",
        "description": "10 AM - 8 PM"
    },
    {
        "day": "SATURDAY",
        "description": "CLOSED"
    },
    {
        "day": "MONDAY",
        "description": "10 AM - 8 PM"
    }


route: http://localhost:5001/HomePage/getWorkingHours

*/


router.get('/getWorkingHours',HomePage.getWorkingHours);


/*
Takes --> it takes the JSON in the following format 
{
    "day":"MONDAY",
    "description":"ygfyfjyfj....."
}
And the jwt token in the form of Bearer Token

returns --> res.status(403).send("Malacious user. Only admin can alter this infomation.");--> if the user changing the info is not admin
            || res.status(200).send("Updated working hours.")
            || res.status(400).send(err);

Notes: before using this route make sure you have created the about table from the .sql file and inserted a sample rows also present in the.sql file
Table name is Workinhhours and insert all the rows in .sql file after pricing

route: http://localhost:5001/HomePage/updateWorkingHours

*/

router.post('/updateWorkingHours',authenticateToken,HomePage.updateWorkingHours)




module.exports = router;