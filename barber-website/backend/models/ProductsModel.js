
const getProducts = "SELECT products.productsid, products.title, products.description, products.picturelink FROM products";

const addProducts = "INSERT INTO products (title, description, picturelink ) VALUES ($1, $2, $3)";

const updateProducts  = "UPDATE products SET title = $2, description = $3, picturelink=$4 WHERE productsid=$1";

const deleteProducts = "DELETE FROM products WHERE productsid=$1";

const checkProductsExists = "SELECT products.productsid, products.title, products.description FROM products WHERE products.productsid=$1";
const getPicture = "SELECT products.picturelink FROM products WHERE products.productsid=$1";
module.exports = {
    getProducts,
    addProducts,
    updateProducts,
    deleteProducts,
    checkProductsExists,
    getPicture,
}