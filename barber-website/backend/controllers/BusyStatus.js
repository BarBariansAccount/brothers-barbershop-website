const pool = require('../config/database.js')
const UserModel = require("../models/UserModel.js")

let busy = false;
let notBusy = false;
let empty = true;

const getStatus = (req, res) => {

    if (busy) {
        res.status(200).send("Busy");
    }
    else if (notBusy) {
        res.status(200).send("Not Busy");
    }
    else if (empty) {
        res.status(200).send("Empty");
    }
}

const updateStatus = async (req, res) => {
    let Status = req.body.Status;

    const logged_userId = req.Logged_userId.data;

    try {
        let loggedUserRole = await pool.query(UserModel.checkUserExists, [logged_userId]);
        if (loggedUserRole.rows[0].userrole != "Admin") {
            return res.status(403).send("Malacious user. Only admin can change status.");
        }
        if (Status == "Busy") {
            busy = true;
            notBusy = false;
            empty = false;
            return res.status(200).send("Status is set to: Busy");
        }
        else if (Status == "Not Busy") {
            notBusy = true;
            busy = false;
            empty = false;
            return res.status(200).send("Status is set to: Not Busy");
        }
        else if (Status == "Empty") {
            empty = true;
            busy = false;
            notBusy = false;
            return res.status(200).send("Status is set to: Empty");
        }
        else {
            return res.status(400).send("Send a valid response");
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }


}

module.exports = {
    updateStatus,
    getStatus
}
