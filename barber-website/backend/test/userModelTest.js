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
            FirstName: 'UnitFirst1',
            LastName: 'UnitLast',
            Telephone: 5555555555,
            Password: 'testPassword1'
        }

        let req = mockRequest(userData);
        let res = mockResponse();

        await createUser(req, res);
        assert.equal(res.status.calledWith(200), true);
        await validateLogin(req, res);
        assert.equal(res.status.calledWith(200), true);
        await updateUser(mockRequest(updateData), res);
        assert.equal(res.status.calledWith(200), true);

        await getUser(req, res);
        assert.equal(res.json.calledWith(), true);
        await deleteUser(req, res);
        assert.equal(res.status.calledWith(200), true);

        //console.log(res.status.getCall())

        //assert.equal(true, res.send.calledWith("Information has been updated."))
    })
})