const pool = require('../config/database.js')
const UserModel = require("../models/UserModel.js")

const getusers = (req,res) => {
    pool.query(UserModel.getUsers, (err, results) =>{
        if (err) throw err;
        res.status(200).json(results.rows);

    })
};

module.exports = {
    getusers,
};