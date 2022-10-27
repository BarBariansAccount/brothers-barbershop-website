const {

    createUser,
    validateLogin,
    updateUser,
    updatePassword,
    deleteUser,
    getUser
} = require("../controllers/user")
const { assert } = require('chai')
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods')


describe("UserController related Test", function () {
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
        Password: 'testPassword'
    }
    it("test user related test", async function () {



        let req = mockRequest(userData);
        let res = mockResponse();

        await createUser(req, res);
        assert.equal(res.status.calledWith(200), true);

        res = mockResponse();
        await validateLogin(req, res);

        assert.equal(res.status.calledWith(200), true);

        let UserID = res.json.getCall(0).args[0][0].userid;
        userData.UserID = UserID;
        updateData.UserID = UserID;

        const updatePasswordData = {
            OldPassword: userData.Password,
            NewPassword: 'modifiedPass',
            UserID
        }
        const modifiedPasswordData = {
            Telephone: updateData.Telephone,
            Password: updatePasswordData.NewPassword
        }

        res = mockResponse();
        await updateUser(mockRequest(updateData), res);
        assert.equal(res.status.calledWith(200), true);

        res = mockResponse();
        await getUser(req, res);
        assert.equal(res.send.getCall(0).args[0][0].firstname, updateData.FirstName);

        res = mockResponse();
        await updatePassword(mockRequest(updatePasswordData), res);
        assert.equal(res.status.calledWith(200), true);

        res = mockResponse();
        await validateLogin(mockRequest(modifiedPasswordData), res);
        assert.equal(res.status.calledWith(200), true);


        res = mockResponse();
        await deleteUser(req, res);
        assert.equal(res.status.calledWith(200), true);


    })
})