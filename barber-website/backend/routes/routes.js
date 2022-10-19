const express = require("express");
const router = express.Router();
const User = require("../controllers/user.js");
const BusyStatus = require("../controllers/BusyStatus.js").default;


router.get('/',(req,res) =>{
        res.send({
            message: "hello"
        })
    })

/* 
To get all the users in users table Mainly for testing.
*/
router.get('/users',User.getusers);

/*
Takes --> {UserRole, Email, FirstName, LastName, Telephone, Password} As json 
returns --> res.status(200).send(`New user: ${FirstName} sucessfully created.`) 
|| res.status(400).send('User already exists. Enter different phone number.');
 || res.status(400).send('User Role can only be "Customer" OR "Admin" OR "Barber"');
*/
router.post('/createUser', User.createUser); 

/*
Takes --> {Telephone, Password} As json 
returns --> res.status(400).send(`There is no user with ${Telephone}.`); || res.status(400).send('Password is incorrect'); || JWT token if the authorization is sucessfull
*/
router.post('/Login', User.validateLogin)

/*
Assumptions --> Telephone number cannot be changed or updated.
Takes --> {Email, FirstName, LastName, Telephone, Password} As json 
returns --> res.send(`This phone number is already associated with another account: ${Telephone}. Please try providing another phone number.`);
            || res.send(`This email is already associated with another account: ${Email}. Please try providing another Email.`);
            || res.send("Information has been updated")
            || throws error
*/
router.post('/updateUser', User.updateUser);

/*
Takes --> {Telephone} As json 
returns --> res.status(200).send(`User has been sucessfully deleted with: ${Telephone}.`) 
            || res.status(400).send(`There is no user with the number: ${Telephone}.`);
            ||res.status(400).send(error)
*/
router.post('/deleteUser', User.deleteUser);


/*
Takes --> {Telephone} As json 
returns -->  res.status(400).send(`There is no user with the number: ${Telephone}.`);
             || res.status(200).json(results.rows)
             || res.status(400).send(error)
*/
router.post('/getUser', User.getUser);

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
        ||{"Status": "Empty"}

 Returns -->  res.status(200).send("Status is set to: Busy");
            ||res.status(200).send("Status is set to: Not Busy");
            ||res.status(200).send("Status is set to: Empty");
*/
router.post('/updateStatus', BusyStatus.updateStatus);







module.exports = router;
