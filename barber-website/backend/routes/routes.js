const express = require("express");
const router = express.Router();
const User = require("../controllers/user.js");

router.get('/',(req,res) =>{
        res.send({
            message: "hello"
        })
    })

router.post('/users', function(req, res){
    User.createUser
});

module.exports = router;