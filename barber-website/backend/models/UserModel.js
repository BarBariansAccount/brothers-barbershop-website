const { beforeDefine } = require('../config/database.js')
const db= require('../config/database.js')


// Insert User to Database
const insertUser =(email,password, result)=>{
    db.query(`INSERT INTO users VALUES (${email},${password})`, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
module.exports.insertUser=insertUser;