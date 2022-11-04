const sinon = require('sinon')

const mockRequest = function (body) {
    return { body }
}

const mockResponse = function () {
    const res = {}
    res.status = sinon.stub().returns(res)
    res.send = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
    return res
}

function sleep(ms) {
    if (ms == undefined)
        ms = 50;
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = {
    mockRequest,
    mockResponse,
    sleep
}