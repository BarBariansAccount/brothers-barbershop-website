const UserModel = require("../models/userModel.js");

// Create New User
const createUser=(req, res) =>{
    const data = req.body;
    const email= data.email
    const password= data.password
    UserModel.insertUser(email,password, (err, results) => {
        console.log("ll")
        if (err){
            console.log(err)
            res.send(err);
            
        }else{
            console.log
            res.json(results);
        }
    });
}
module.exports.createUser=createUser;