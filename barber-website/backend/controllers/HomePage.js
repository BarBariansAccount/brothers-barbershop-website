require("dotenv").config();
const pool = require("../config/database.js");
const UserModel = require("../models/UserModel.js");
const HomePageModel = require("../models/HomePageModel.js");


const updateAbout=async (req,res)=>{
    const {About} = req.body;
    const logged_userId = req.Logged_userId.data;

    try {
      let loggedUserRole = await pool.query(UserModel.checkUserExists, [
        logged_userId,
      ]);
      if (loggedUserRole.rows[0].userrole != "Admin") {
        return res
          .status(403)
          .send("Malacious user. Only admin can alter this infomation.");
      }
      else{
        await pool.query(HomePageModel.updateAbout,[About]);
        res.status(200).send("Updated About.")
      }

  
    } catch (err) {
      res.status(400).send(err);
    }

}

const getAbout=async (req,res)=>{
    try{
        let results= await pool.query(HomePageModel.getAbout)

        res.status(200).json({About: results.rows[0].title})

    }catch(err){
        res.status(400).send(err);
    }
}

const getPricing=async (req,res)=>{
  try{
    let results=await pool.query(HomePageModel.getPricing)
    res.status(200).send(results.rows);
  }catch(err){
    res.status(400).send(err);
}
}


const updatePricing=async (req,res)=>{
  const {service,price,duration} = req.body;
  const logged_userId = req.Logged_userId.data;

  try {
    let loggedUserRole = await pool.query(UserModel.checkUserExists, [
      logged_userId,
    ]);
    if (loggedUserRole.rows[0].userrole != "Admin") {
      return res
        .status(403)
        .send("Malacious user. Only admin can alter this infomation.");
    }
    else{
      await pool.query(HomePageModel.updatePricing,[service,price,duration]);
      res.status(200).send("Updated Pricing and Duration.")
    }


  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }

}



module.exports = {
    updateAbout,
    getAbout,
    getPricing,
    updatePricing
}