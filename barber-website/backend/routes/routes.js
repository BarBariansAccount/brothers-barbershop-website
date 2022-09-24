const express = require("express");
const router = express.Router();
const User = require("../controllers/user.js");

router.get('/',(req,res) =>{
        res.send({
            message: "hello"
        })
    })

router.get('/users',User.getusers);

module.exports = router;