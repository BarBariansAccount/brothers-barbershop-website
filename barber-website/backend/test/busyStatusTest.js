const { assert } = require('chai')
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods');

const {
    checkAndGetAdminId
} = require("./userModelTest");

const {
    updateStatus,
    getStatus } = require('../controllers/BusyStatus');

describe('BusyStatus related tests', function () {
    let req = mockRequest({ Status: 'Busy' });
    let res = mockResponse();

    it('get admin id first', async function () {
        const adminId = await checkAndGetAdminId();
        req.Logged_userId = { data: adminId };
    })
    it('test get busy status', async function () {
        getStatus(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.send.calledWith('Empty'), true);
    })

    it('test updateStatus', async function () {
        const checkWithStatus = async function (currentStatus) {
            res = mockResponse();
            req.body.Status = currentStatus;
            await updateStatus(req, res);
            assert.equal(res.status.calledWith(200), true);
            getStatus(req, res);
            assert.equal(res.send.calledWith(currentStatus), true);
        }


        await checkWithStatus('Busy');
        await checkWithStatus("Not Busy");
        await checkWithStatus("Empty");

    })
})