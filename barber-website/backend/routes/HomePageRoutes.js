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


module.exports = router;