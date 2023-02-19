require('dotenv').config();
const pool = require('../config/database.js')
const UserModel = require("../models/UserModel.js")
const ResetPasswordModel = require("../models/ResetPasswordModel.js")
const datefns = require('date-fns');
const JWT = require("jsonwebtoken");
const sendgrid = require("@sendgrid/mail");
 
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
            
            //sending email
            sendgrid.setApiKey(process.env.SG_API_KEY)

            sendgrid.send({
                to:{
                    email: Results.rows[0].email,
                    name: Results.rows[0].firstname
                },
                from:{
                    email: process.env.Barbershop_Email,
                    name: 'Brothers Barber Shop Queen Marry'
                },
                templateId: 'd-db3b5c5d9ab44156a0f193c2e43a8bc1',
                dynamicTemplateData:{
                    code: random
                },

            }).then(()=>
            res.status(200).send(`Verification code is sent to the email.`))

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
            res.status(400).send("Please try again sending the verification code to your email.");
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

const Change_Password= async (req, res) => {
    const {
        NewPassword
    } = req.body;
    const logged_userId = req.Logged_userId.data;

    try{
        const hash = bcrypt.hashSync(NewPassword, 12);
      await pool.query(UserModel.updatePassword, [logged_userId, hash]);
      res.status(200).send("Password is changed sucessfully.");


    }catch (error) {
        res.status(400)
   
    }

}



module.exports={
    SendEmail,
    Verification,
    Change_Password
}