require("dotenv").config();
const express = require("express");
const Usersrouter = express.Router();
const User = require("../controllers/user.js");
const JWT = require("jsonwebtoken");
const multer = require("multer");


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
Takes --> authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only see all acccounts.

returns -->res.status(403).send("Malacious user. Only admin can see this infomation.");
        || res.status(200).json(results.rows);
To get all the users in users table Mainly for testing.
*/

Usersrouter.get("/users", authenticateToken, User.getusers);

/*

Takes --> {UserRole, Email, FirstName, LastName, Telephone, Password} As json &&
    Takes authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only create acccounts.
returns --> res.status(403).send("Malacious user. Only admin can create accounts.");
         ||  res.status(200).send(`New user: ${FirstName} sucessfully created.`) 
         || res.status(400).send('User already exists. Enter different phone number.');
         || res.status(400).send('User Role can only be "Customer" OR "Admin" OR "Barber"');
         || res.status(400).send(error)
*/

Usersrouter.post("/createUser", authenticateToken, User.createUser); //FOR ADMINS TO CREATE [BARBERS || ADMIN] ACCOUNTS

/*
Assumptions--> user role will always be 'Customer' inside the controller so no need to pass along
Takes --> {Email, FirstName, LastName, Telephone, Password} As json 

returns --> res.status(200).json({Token: accessToken ,User: Results.rows[0]}); {Token, User: {userid, userrole, email, firstname, lastname}} As json;
        || res.status(400).send('User already exists. Enter different phone number.');
        ||res.status(400).send(error)
*/
Usersrouter.post("/createUser_customers", User.createUser_customers); //FOR CUSTOMERS

/*
Takes --> {Telephone, Password} As json 
returns --> 
     res.status(200).json({Token: accessToken,User: Results.rows[0]})--> {Token, User: {userid, userrole, email, firstname, lastname, picturelink}} As json;
    ||res.status(400).send(`There is no user with ${Telephone}.`);
    || res.status(400).send('Password is incorrect'); 

*/
Usersrouter.post("/Login", User.validateLogin);

/*

Takes --> {Email, FirstName, LastName} As json && 
        Takes authentication token in headers in the format {'authorization': Bearer token} --> user login token

returns --> || res.status(200).send(getuser.rows)--> {userid, userrole, email, firstname, lastname, picturelink} As json;
            || res.status(400).send(error)
*/

Usersrouter.put("/updateUser", authenticateToken, User.updateUser);

/*
Takes --> {UserID} As json &&  
Takes authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only delete acccounts.

returns --> return res.status(403).send("Malacious user. Only admin can delete accounts.");
            ||res.status(200).send(`User has been sucessfully deleted with User ID: ${UserID}.`) 
            || res.status(400).send(`There is no user with this user ID: ${UserID}.`);
            ||res.status(400).send(error)
*/

Usersrouter.put("/deleteUser", authenticateToken, User.deleteUser);

/*
Takes --> Takes authentication token in headers in the format {'authorization': Bearer token} --> user login token
returns -->   res.status(200).json(results.rows) -->{userid, userrole, email, firstname, lastname} As json;
             || res.status(400).send(error)
*/
Usersrouter.get("/getUser", authenticateToken, User.getUser);

/*
Takes --> {OldPassword,NewPassword} As json && 
Also takes authentication token in headers in the format {'authorization': Bearer token}--> user login token who wants to change their password

returns -->   res.status(400).send('Old Password is incorrect.');
             || res.status(200).send("Password is changed sucessfully.");
             || res.status(400).send(error);
*/

Usersrouter.put("/updatePassword", authenticateToken, User.updatePassword);

/*
*****
User Pictures
*****
*/

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, "./uploads");
  },
  filename: function (req, file, next) {
    const date = new Date().toISOString().replace(/:/g, "-");
    const filename = date + file.originalname;

    next(null, filename);
  },
});

const filefilter = (req, res, cb) => {
  if (
    res.mimetype === "image/jpeg" ||
    res.mimetype === "image/jpg" ||
    res.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    req.error = "Error: file should be of type jpg, jpeg or png.";
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    filesize: 1024 * 1024 * 5,
  },
  fileFilter: filefilter,
});

/*
Takes --> Takes authentication token in headers in the format {'authorization': Bearer token} --> user login token
        && {UserImage: Image file}
returns -->   res.status(200).send(picturepath);
             || res.status(400).send(error) --> Common error --> Error: file should be of type jpg, jpeg or png.
*/

Usersrouter.put(
  "/updatePicture",
  authenticateToken,
  upload.single("UserImage"),
  User.updatePicture
);

/*
Takes --> Takes authentication token in headers in the format {'authorization': Bearer token} --> user login token
        
returns -->   res.status(200).send("Picture has been removed.");
             || res.status(400).send(error)
*/

Usersrouter.delete(
  "/deletePicture",
  authenticateToken,
  upload.single("UserImage"),
  User.deletePicture
);

module.exports = Usersrouter;
