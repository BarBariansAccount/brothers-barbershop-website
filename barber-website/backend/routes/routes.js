const express = require("express");
const router = express.Router();
const User = require("../controllers/user.js");
const BusyStatus = require("../controllers/BusyStatus.js");

router.get("/", (req, res) => {
  res.send({
    message: "hello",
  });
});

/* 
To get all the users in users table Mainly for testing.
*/
router.get("/users", User.getusers);

/*
Takes --> {UserRole, Email, FirstName, LastName, Telephone, Password} As json 
returns --> res.status(200).send(`New user: ${FirstName} sucessfully created.`) 
|| res.status(400).send('User already exists. Enter different phone number.');
 || res.status(400).send('User Role can only be "Customer" OR "Admin" OR "Barber"');
*/
router.post("/createUser", User.createUser);

/*
Takes --> {Telephone, Password} As json 
returns --> 
    res.status(200).json(Results.rows); -->{userid, userrole, email, firstname, lastname} As json;
    ||res.status(400).send(`There is no user with ${Telephone}.`);
    || res.status(400).send('Password is incorrect'); 

*/
router.post("/Login", User.validateLogin);

/*
Assumptions --> please dont send telephone numbers, instead send user id
Takes --> {UserID, Email, FirstName, LastName} As json 
returns --> res.send(User not exists.);
            || res.status(200).send(getuser.rows)--> {userid, userrole, email, firstname, lastname} As json;
            || res.status(400).send(error)
*/
router.post("/updateUser", User.updateUser);

/*
Takes --> {UserID} As json 
returns --> res.status(200).send(`User has been sucessfully deleted with User ID: ${UserID}.`) 
            || res.status(400).send(`There is no user with this user ID: ${UserID}.`);
            ||res.status(400).send(error)
*/
router.post("/deleteUser", User.deleteUser);

/*
Takes --> {UserID} As json 
returns -->  res.status(400).send(`There is no user with this user ID: ${UserID}.`);
             || res.status(200).json(results.rows) -->{userid, userrole, email, firstname, lastname} As json;
             || res.status(400).send(error)
*/
router.post("/getUser", User.getUser);



/*
Takes --> {UserID, OldPassword,NewPassword} As json 
returns -->  res.status(400).send(`There is no user with this user ID: ${UserID}.`);
             ||  res.status(400).send('Old Password is incorrect.');
             || res.status(200).send("Password is changed sucessfully.");
             || res.status(400).send(error);
*/

router.post('/updatePassword',User.updatePassword);

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
router.get("/getStatus", BusyStatus.getStatus);

/*
takes --> {"Status": "Busy"}
        ||{"Status": "Not Busy"}
        ||{"Status": "Empty"}

 Returns -->  res.status(200).send("Status is set to: Busy");
            ||res.status(200).send("Status is set to: Not Busy");
            ||res.status(200).send("Status is set to: Empty");
*/
router.post('/updateStatus', BusyStatus.updateStatus);


module.exports = router;
