const {
    getProducts,
    addProducts,
    updateProducts,
    deleteProducts,
} = require("../controllers/Products.js")
const {
    checkAndGetAdminId,
    createBarber,
    deleteAccount
} = require("./userModelTest")
const { assert } = require('chai');
const fs = require("fs");
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods');

const checkEmptyProduct = async function () {
    let req = mockRequest();
    let res = mockResponse();
    await getProducts(req, res);
    assert.equal(res.status.calledWith(400), true);
    assert.equal(res.send.getCall(0).args[0], `There are no Products to be shown.`);
}

const checkByAllProducts = async function (productDetails) {


    req = mockRequest();
    res = mockResponse();
    await getProducts(req, res);
    assert.equal(res.status.calledWith(200), true);
    productInfo = res.json.getCall(0).args[0][0];
    assert.equal(productInfo.title + productInfo.description, productDetails.title + productDetails.description);
    return productInfo;
}



describe("Product Related Tests", function () {
    const productDetails = {
        title: "unit Product Tittle",
        description: "A test product for unit testing only"
    }

    let fileName = "non-exist-filename.png";

    const modifiedInfo = {
        title: "unit modified Product Tittle",
        description: "A modified test product for unit testing only"
    }

    let adminId;
    let productInfo;
    const addMockFile = async function (file) {
        const dirPath = "./uploads/";
        const filePath = dirPath + file;
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.closeSync(fs.openSync(filePath, 'w'));
    }




    it("test add and get products", async function () {
        await checkEmptyProduct();
        adminId = await checkAndGetAdminId();

        // data format:
        // {
        //     productsid: 7,
        //     title: 'unit Product Tittle',
        //     description: 'A test product for unit testing only',
        //     picturelink: 'http://104.225.142.153:5001/non-exist-filename'
        //   }

        //add mock picture 
        addMockFile(fileName);

        let req = mockRequest(productDetails);
        let res = mockResponse();
        req.Logged_userId = { data: adminId };
        req.file = { filename: fileName };
        await addProducts(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.send.getCall(0).args[0], `The Product has been successfully added with this title: ${productDetails.title}.`);

        //double check by get all products
        const productInfo = await checkByAllProducts(productDetails);

        //get id for further testing 
        productDetails.productsid = productInfo.productsid;
        modifiedInfo.productsid = productInfo.productsid;


    })


    it("test update products", async function () {
        let req = mockRequest(modifiedInfo);
        let res = mockResponse();
        req.Logged_userId = { data: adminId };
        req.file = { filename: fileName };
        //add mock picture 
        addMockFile(fileName);

        await updateProducts(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.send.getCall(0).args[0], `The Products  has been successfully updated.`);

        //verify
        await checkByAllProducts(modifiedInfo);

    })


    it("test delete products", async function () {
        let req = mockRequest(modifiedInfo);
        let res = mockResponse();
        req.Logged_userId = { data: adminId };
        await deleteProducts(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.send.getCall(0).args[0], `The Products  has been successfully deleted.`);


        await checkEmptyProduct();
    })
})