const express = require("express");
const Productsrouter = express.Router();
const Products = require("../controllers/Products.js");
const JWT = require("jsonwebtoken");
const multer = require("multer");

/*
JWT authentication
*/
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).send("Send Token Please!");
  }
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, Logged_userId) => {
    if (err) {
      return res.status(403).send("Please Login again.");
    }
    req.Logged_userId = Logged_userId;

    next();
  });
}
const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, "./uploads");
  },
  filename: function (req, file, next) {
    const date = new Date().toISOString().replace(/:/g, "-");
    const filename = date + file.originalname;

    next(null, filename);
  },
});

const filefilter = (req, res, cb) => {
  if (
    res.mimetype === "image/jpeg" ||
    res.mimetype === "image/jpg" ||
    res.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    req.error = "Error: file should be of type jpg, jpeg or png.";
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    filesize: 1024 * 1024 * 5,
  },
  fileFilter: filefilter,
});

/*
*****
Products
*****
*/

/* To get all the Products in Products  table .*/

Productsrouter.get("/getProducts", Products.getProducts);

/*
Takes --> { title, description } As json && {ProductsImage: Image file} &&
Takes authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only add Products.

returns --> return res.status(403).send("Malicious user. Only admin can add products.");
            ||res.status(200).send(`The Products  has been successfully added.`)
            || res.status(400).send(`The products ID does not exist.`);
            ||res.status(400).send(error)
*/

Productsrouter.post(
  "/addProducts",
  authenticateToken,
  upload.single("ProductsImage"),
  Products.addProducts
);

/*
Takes --> { productsid, title, description } As json && {ProductsImage: Image file} &&
Takes authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only update products.

returns --> return res.status(403).send("Malacious user. Only admin can update FAQs.");
            ||res.status(200).send(`The products has been sucessfully updated.`)
            || res.status(400).send(`The products ID does not exist.`);
            ||res.status(400).send(error)
*/
Productsrouter.put(
  "/updateProducts",
  authenticateToken,
  upload.single("ProductsImage"),
  Products.updateProducts
);

/*
Takes --> {faqid} As json &&
Takes authentication token in headers in the format {'authorization': Bearer token} --> admin login token as admins can only delete products.

returns --> return res.status(403).send("Malicious user. Only admin can delete FAQs.");
            ||res.status(200).send(`The products  has been successfully deleted.`)
            || res.status(400).send(`The products ID does not exist.`);
            ||res.status(400).send(error)
*/

Productsrouter.put(
  "/deleteProducts",
  authenticateToken,
  upload.single("ProductsImage"),
  Products.deleteProducts
);

module.exports = Productsrouter;
