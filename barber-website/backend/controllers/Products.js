require("dotenv").config();
const pool = require("../config/database.js");
const ProductsModel = require("../models/ProductsModel.js");
const UserModel = require("../models/UserModel.js");
const fs = require("fs");

const getProducts = async (req, res) => {
  try {
    let results = await pool.query(ProductsModel.getProducts);
    if (results.rows.length == 0) {
      return res.status(400).send(`There are no Products to be shown.`);
    }
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const addProducts = async (req, res) => {
  const { title, description } = req.body;
  const logged_userId = req.Logged_userId.data;

  try {
    let loggedUserRole = await pool.query(UserModel.checkUserExists, [
      logged_userId,
    ]);
    if (loggedUserRole.rows[0].userrole != "Admin") {
      return res
          .status(403)
          .send("Malicious user. Only admin can add Products.");
    }

    //hardcoded
    const picturepath = process.env.Backend_URL + "uploads/" + req.file.filename;
    await pool.query(ProductsModel.addProducts, [
      title,
      description,
      picturepath,
    ]);

    res
        .status(200)
        .send(
            `The Product has been successfully added with this title: ${title}.`
        );
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateProducts = async (req, res) => {
  const { productsid, title, description } = req.body;
  const logged_userId = req.Logged_userId.data;
  try {
    let loggedUserRole = await pool.query(UserModel.checkUserExists, [
      logged_userId,
    ]);
    if (loggedUserRole.rows[0].userrole != "Admin") {
      return res
        .status(403)
        .send("Malicious user. Only admin can update Products.");
    }
    let results = await pool.query(ProductsModel.checkProductsExists, [
      productsid,
    ]);

    if (results.rows.length == 0) {
      return res.status(400).send(`The Product ID does not exist.`);
    }
    //hardcoded
    const picturepath =
      process.env.Backend_URL + "uploads/" + req.file.filename;

    await pool.query(ProductsModel.updateProducts, [
      productsid,
      title,
      description,
      picturepath,
    ]);
    res.status(200).send(`The Products  has been successfully updated.`);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteProducts = async (req, res) => {
  const { productsid } = req.body;
  const logged_userId = req.Logged_userId.data;
  try {
    let loggedUserRole = await pool.query(UserModel.checkUserExists, [logged_userId]);
    if (loggedUserRole.rows[0].userrole != "Admin") {
      return res.status(403).send("Malicious user. Only admin can delete Products.");
    }
    let results = await pool.query(ProductsModel.checkProductsExists, [productsid])
    if (results.rows.length == 0) {
      return res.status(400).send(`The Products ID does not exist.`);
    }
    let picturePath = await pool.query(ProductsModel.getPicture, [productsid]);

    picturePath = picturePath.rows[0].picturelink;

    picturePath = picturePath.substring(36, picturePath.length);

    picturePath = "./uploads/" + picturePath;

    fs.unlinkSync(picturePath);

    await pool.query(ProductsModel.deleteProducts, [productsid]);
    res.status(200).send(`The Products  has been successfully deleted.`)


  } catch (error) {
    res.status(400).send(error)
  }
};

module.exports = {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
};
