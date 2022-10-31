const { assert } = require('chai')
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods')

const {
    getFAQ,
    updateFAQ,
    deleteFAQ,
    addFAQ
} = require("../controllers/FAQ")

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

    it("test create FAQ", async function () {
        req = testFAQ;
        res = mockResponse();
        await addFAQ(req, res);
        assert.equal(res.status.calledWith(200), true);
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
        req.body.faqid = faqid;
        console.log(req)
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
        assert.equal(res.status.calledWith(200), true);
        const FAQs = res.json.getCall(0).args[0];
        assert.equal(FAQs.length, 0);
    })
})