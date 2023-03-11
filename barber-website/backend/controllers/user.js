require("dotenv").config();
const pool = require("../config/database.js");
const UserModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const fs = require("fs");

const getusers = async (req, res) => {
  const logged_userId = req.Logged_userId.data;

  try {
    let loggedUserRole = await pool.query(UserModel.checkUserExists, [
      logged_userId,
    ]);
    if (loggedUserRole.rows[0].userrole != "Admin") {
      return res
        .status(403)
        .send("Malacious user. Only admin can see this infomation.");
    }
    let results = await pool.query(UserModel.getUsers);

    res.status(200).json(results.rows);
  } catch (err) {
    res.status(400).send(err);
  }
};
//Barbers || Admin
const createUser = async (req, res) => {
  const { UserRole, Email, FirstName, LastName, Telephone, Password } =
    req.body;
  const logged_userId = req.Logged_userId.data;

  const hash = bcrypt.hashSync(Password, 12);

  //checking if email already exists
  try {
    let loggedUserRole = await pool.query(UserModel.checkUserExists, [
      logged_userId,
    ]);
    if (loggedUserRole.rows[0].userrole != "Admin") {
      return res
        .status(403)
        .send("Malacious user. Only admin can create accounts.");
    }
    let result = await pool.query(UserModel.checkUserExists_telephone, [
      Telephone,
    ]);
    if (
      !(UserRole == "Customer" || UserRole == "Admin" || UserRole == "Barber")
    ) {
      res
        .status(400)
        .send('User Role can only be "Customer" OR "Admin" OR "Barber"');
    } else if (result.rows.length) {
      res
        .status(400)
        .send("User already exists. Enter different phone number.");
    } else {
      //adding a new user
      await pool.query(UserModel.addUser, [
        UserRole,
        Email,
        FirstName,
        LastName,
        Telephone,
        hash,
      ]);

      res.status(200).send(`New user: ${FirstName} sucessfully created.`);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const createUser_customers = async (req, res) => {
  const { Email, FirstName, LastName, Telephone, Password } = req.body;

  let UserRole = "Customer";

  const hash = bcrypt.hashSync(Password, 12);

  //checking if email already exists
  try {
    let result = await pool.query(UserModel.checkUserExists_telephone, [
      Telephone,
    ]);

    if (result.rows.length) {
      res
        .status(400)
        .send("User already exists. Enter different phone number.");
    } else {
      //adding a new user
      await pool.query(UserModel.addUser, [
        UserRole,
        Email,
        FirstName,
        LastName,
        Telephone,
        hash,
      ]);

      let Results = await pool.query(UserModel.checkUserExists_telephone, [
        Telephone,
      ]);
      const accessToken = JWT.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: Results.rows[0].userid,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.status(200).json({ Token: accessToken, User: Results.rows[0] });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
const validateLogin = async (req, res) => {
  const { Telephone, Password } = req.body;

  try {
    let Results = await pool.query(UserModel.checkUserExists_telephone, [
      Telephone,
    ]);
    if (Results.rows.length == 0) {
      res.status(400).send(`There is no user with ${Telephone}.`);
    } else if (Results.rows.length == 1) {
      let getpassword = await pool.query(UserModel.getpassword_telephone, [
        Telephone,
      ]);

      if (!bcrypt.compareSync(Password, getpassword.rows[0].password)) {
        res.status(400).send("Password is incorrect.");
      }
      if (bcrypt.compareSync(Password, getpassword.rows[0].password)) {
        const accessToken = JWT.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: Results.rows[0].userid,
          },
          process.env.ACCESS_TOKEN_SECRET
        );

        res.status(200).json({ Token: accessToken, User: Results.rows[0] });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const updateUser = async (req, res) => {
  const { Email, FirstName, LastName } = req.body;
  const logged_userId = req.Logged_userId.data;
  try {
    await pool.query(UserModel.updateUser, [
      Email,
      FirstName,
      LastName,
      logged_userId,
    ]);

    let getuser = await pool.query(UserModel.checkUserExists, [logged_userId]);

    res.status(200).send(getuser.rows);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { UserID } = req.body;
  const logged_userId = req.Logged_userId.data;
  try {
    let loggedUserRole = await pool.query(UserModel.checkUserExists, [
      logged_userId,
    ]);
    if (loggedUserRole.rows[0].userrole != "Admin") {
      return res
        .status(403)
        .send("Malacious user. Only admin can delete accounts.");
    }
    let results = await pool.query(UserModel.checkUserExists, [UserID]);

    if (results.rows.length == 0) {
      return res
        .status(400)
        .send(`There is no user with this user ID: ${UserID}.`);
    }

    await pool.query(UserModel.deleteUser, [UserID]);

    res
      .status(200)
      .send(`User has been sucessfully deleted with User ID: ${UserID}.`);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUser = async (req, res) => {
  const logged_userId = req.Logged_userId.data;
  try {
    let results = await pool.query(UserModel.checkUserExists, [logged_userId]);

    res.status(200).send(results.rows);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePassword = async (req, res) => {
  const OldPassword = req.body.OldPassword;
  const NewPassword = req.body.NewPassword;
  const logged_userId = req.Logged_userId.data;

  try {
    let getpassword = await pool.query(UserModel.getpassword, [logged_userId]);
    if (!bcrypt.compareSync(OldPassword, getpassword.rows[0].password)) {
      res.status(400).send("Old Password is incorrect.");
    } else {
      const hash = bcrypt.hashSync(NewPassword, 12);
      await pool.query(UserModel.updatePassword, [logged_userId, hash]);
      res.status(200).send("Password is changed sucessfully.");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePicture = async (req, res) => {
  const logged_userId = req.Logged_userId.data;

  if (req.error != null) {
    res.status(400).send(req.error);
  }

  try {
    //hardcoded
    const picturepath = "http://localhost:5001/uploads/" + req.file.filename;

    await pool.query(UserModel.updatePicture, [logged_userId, picturepath]);

    res.status(200).send(picturepath);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePicture = async (req, res) => {
  const logged_userId = req.Logged_userId.data;

  try {
    let picturePath = await pool.query(UserModel.getPicture, [logged_userId]);

    picturePath = picturePath.rows[0].picturelink;

    picturePath = picturePath.substring(30, picturePath.length);

    picturePath = "./uploads/" + picturePath;

    fs.unlinkSync(picturePath);

    await pool.query(UserModel.deletePicture, [logged_userId]);

    res.status(200).send("Picture has been removed.");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  getusers,
  createUser,
  validateLogin,
  updateUser,
  deleteUser,
  getUser,
  updatePassword,
  createUser_customers,
  updatePicture,
  deletePicture,
};
