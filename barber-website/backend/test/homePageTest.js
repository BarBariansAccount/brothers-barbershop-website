
const {
    checkAndGetAdminId,
} = require("./userModelTest")

const {
    updateAbout,
    getAbout,
    getPricing,
    updatePricing,
    getWorkingHours,
    updateWorkingHours
} = require("../controllers/HomePage")

const { assert } = require('chai')
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods')

describe("HomePage Related Tests", function () {
    const TEST_ABOUT = "A pieces of unit test about section para";
    const TEST_ABOUT2 = "Another pieces of unit test about section para";
    const PRICE_DATA = {
        service: "Haircut",
        price: "1 billion CAD",
        duration: "1 year"
    }
    const SERVICE_NUMBER = 5;
    let adminId;

    const testAbout = async function (about) {
        //update
        let req = mockRequest({ About: about });
        let res = mockResponse();
        req.Logged_userId = { data: adminId };
        await updateAbout(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.send.calledWith("Updated About."), true);


        //actual check
        req = mockRequest();
        res = mockResponse();
        await getAbout(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.json.getCall(0).args[0].About, about);
    }

    it("setup test", async function () {
        adminId = await checkAndGetAdminId();
    })

    it("test update and get about", async function () {
        await testAbout(TEST_ABOUT);
        await testAbout(TEST_ABOUT2);

    })

    it("test update and get price", async function () {
        //update
        let req = mockRequest(PRICE_DATA);
        let res = mockResponse();
        req.Logged_userId = { data: adminId };
        await updatePricing(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.send.calledWith("Updated Pricing and Duration."), true);


        //actual check
        req = mockRequest();
        res = mockResponse();
        await getPricing(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.send.getCall(0).args[0].length, SERVICE_NUMBER);
        let serviceFound = false;
        for (let i = 0; i < SERVICE_NUMBER; i++) {
            let serviceAPrice = res.send.getCall(0).args[0][i];
            if (serviceAPrice.service == PRICE_DATA.service) {

                assert.equal(serviceAPrice.price, PRICE_DATA.price);
                assert.equal(serviceAPrice.duration, PRICE_DATA.duration);
                serviceFound = true;
                break;
            }
        }
        assert.isTrue(serviceFound);

    })


})