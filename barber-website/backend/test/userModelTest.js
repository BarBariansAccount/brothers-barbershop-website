const {

    createUser,
    validateLogin,
    updateUser,
    deleteUser,
    getUser
} = require("../controllers/user")
const { assert } = require('chai')
const sinon = require('sinon')
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods')


describe("UserController related Test", function () {
    it("test user related test", async function () {
        const userData = {
            UserRole: 'Customer',
            Email: 'unitTesing@gmail.com',
            FirstName: 'UnitFirst',
            LastName: 'UnitLast',
            Telephone: 5555555555,
            Password: 'testPassword'
        }
        const updateData = {
            Email: 'unitTesing@gmail.com',
            FirstName: 'UnitFirst',
            LastName: 'UnitLast',
            Telephone: 5555555555,
            Password: 'testPassword'
        }

        req = mockRequest(userData)
        res = mockResponse()
        //console.log(req.body)
        createUser(req, res)
        //validateLogin(req, res)
        updateUser(mockRequest(updateData), res)
        deleteUser(req, res)
        //await sleep()
        //console.log(res.status.getCall())
        //assert.equal(res.status.calledWith(200), true);
        //assert.equal(true, res.send.calledWith("Information has been updated."))
    })
})