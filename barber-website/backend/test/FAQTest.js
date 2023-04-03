const { assert } = require('chai')
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods')

const {
    getFAQ,
    updateFAQ,
    deleteFAQ,
    addFAQ
} = require("../controllers/FAQ")



const {
    createCustomer,
    checkAndGetAdminId,
    deleteAccount
} = require("./userModelTest");


describe("FAQ related tests", function () {
    const testFAQ = mockRequest({
        question: "testQuestion",
        answer: "testAnswer"
    })
    const modifiedFAQ = mockRequest({
        question: "testQuestionModified",
        answer: "testAnswer"
    })


    let req, res;
    let faqid;
    let adminId;
    const testWithOutAdmin = async function (testFunction, testData, userId) {
        let req = mockRequest(testData);
        let res = mockResponse();
        req.Logged_userId = { data: userId };
        await testFunction(req, res);
        assert.equal(res.status.calledWith(403), true);
        assert.equal(res.send.calledWith("Malacious user. Only admin can alter this infomation."), true);
    }

    it("get admin id first", async function () {
        adminId = await checkAndGetAdminId();
    })

    it("test create FAQ", async function () {
        req = testFAQ;
        req.Logged_userId = { data: adminId };
        res = mockResponse();

        await addFAQ(req, res);
        assert.equal(res.status.calledWith(200), true);
        //more detailed verifying included in the getFAQ
    })

    it("test getFAQ", async function () {
        res = mockResponse();
        await getFAQ(req, res);
        assert.equal(res.status.calledWith(200), true);
        const FAQs = res.json.getCall(0).args[0];
        assert.equal(FAQs.length, 1);
        assert.equal(FAQs[0].question, testFAQ.body.question);
        faqid = FAQs[0].faqid;

    })

    it("test updateFAQ", async function () {
        res = mockResponse();
        req = modifiedFAQ;
        req.Logged_userId = { data: adminId };
        req.body.faqid = faqid;
        await updateFAQ(req, res);
        assert.equal(res.status.calledWith(200), true);

        res = mockResponse();
        await getFAQ(req, res);
        assert.equal(res.status.calledWith(200), true);

        const FAQs = res.json.getCall(0).args[0];
        assert.equal(FAQs[0].question, modifiedFAQ.body.question);
    })


    it("test deleteFAQ", async function () {
        res = mockResponse();
        await deleteFAQ(req, res);
        assert.equal(res.status.calledWith(200), true);

        res = mockResponse();
        await getFAQ(req, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.calledWith(`There are no FAQ to be shown.`), true)

    })
    it("test error cases", async function () {
        const customerId = await createCustomer();
        testWithOutAdmin(updateFAQ, modifiedFAQ, customerId);
        testWithOutAdmin(deleteFAQ, modifiedFAQ, customerId);
        testWithOutAdmin(addFAQ, modifiedFAQ, customerId);

        //test non exist faq
        res = mockResponse();
        req = modifiedFAQ;
        req.Logged_userId = { data: adminId };
        req.body.faqid = faqid;
        await updateFAQ(req, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.calledWith(`The FAQ ID does not exist.`), true);

        res = mockResponse();
        await deleteFAQ(req, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.calledWith(`The FAQ ID does not exist.`), true);


        deleteAccount(customerId);
    })
})