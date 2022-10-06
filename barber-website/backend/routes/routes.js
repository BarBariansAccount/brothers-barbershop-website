const express = require("express");
const router = express.Router();
const User = require("../controllers/user.js");


router.get('/',(req,res) =>{
        res.send({
            message: "hello"
        })
    })

router.get('/users',User.getusers);// To get all the users in users table Mainly for testing.
router.post('/createUser', User.createUser); 
router.get('/Login', User.validateLogin)
router.post('/updateUser', User.updateUser); 


module.exports = router;
