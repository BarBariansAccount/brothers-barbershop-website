require('dotenv').config();
const pool = require('../config/database.js')
const UserModel = require("../models/UserModel.js")
const ResetPasswordModel = require("../models/ResetPasswordModel.js")
const datefns = require('date-fns');
const JWT = require("jsonwebtoken");


const SendEmail = async (req, res) => {
    const {
        Telephone
    } = req.body;
    
    
    try {
        let Results = await pool.query(UserModel.checkUserExists_telephone, [Telephone])
        
        if (Results.rows.length == 0) {
            res.status(400).send(`There is no user with ${Telephone}.`);
        } 
        else if (Results.rows.length == 1) {
            
            let random=Math.floor(Math.random()*process.env.SECRET_VERIFICATION_CODE);
            
            await pool.query(ResetPasswordModel.deleteResetCode,[Telephone]);

            const date= new Date();

            const tomorrow = datefns.addDays(date,1);
            
            await pool.query(ResetPasswordModel.addResetPassword,[Telephone,random,tomorrow]);
            
            res.status(200).send(`verification code is ${random}.`)
        }
    } catch (error) {
           
        res.status(400).send(error)
   
    }
}

const Verification= async (req, res) => {

    const {
        Telephone,
        Reset_Code
    } = req.body;

    try {
        let Results = await pool.query(UserModel.checkUserExists_telephone, [Telephone])
        let resetCode = await pool.query(ResetPasswordModel.getResetCode,[Telephone])
        
        if (Results.rows.length == 0) {
            res.status(400).send(`There is no user with ${Telephone}.`);
        }
        else if(resetCode.rows.length==0){
            res.status(400).send("Please try again sending teh verification code to your email.");
        }
        else {
            const date= new Date();
            if(resetCode.rows[0].resetcode!=Reset_Code){
                res.status(400).send("Verification Code is incorrect.");
            }

            if(datefns.isAfter(date,resetCode.rows[0].expiretime)){
                res.status(400).send("Veification Code haas been expired.");
            }
            else{
                const accessToken= JWT.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: Results.rows[0].userid
                  }, process.env.ACCESS_TOKEN_SECRET);

                res.status(200).json({Token: accessToken,User: Results.rows[0]});
            }  
        }
    } catch (error) {

        res.status(400)
   
    }



}


module.exports={
    SendEmail,
    Verification
}