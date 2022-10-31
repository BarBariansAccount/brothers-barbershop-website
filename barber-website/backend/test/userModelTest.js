const {

    createUser,
    validateLogin,
    updateUser,
    updatePassword,
    deleteUser,
    getUser,
    createUser_customers
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
        LastName: 'UnitLast'
    }
    it("test user related test", async function () {



        let req = { body: userData };
        let res = mockResponse();

        await createUser_customers(req, res);
        assert.equal(res.status.calledWith(200), true);




        let token = res.json.getCall(0).args[0].Token;
        let userId = res.json.getCall(0).args[0].User.userid
        req.Logged_userId = { data: userId };




        res = mockResponse();
        req = mockRequest(updateData);
        req.Logged_userId = { data: userId };
        await updateUser(req, res);
        assert.equal(res.status.calledWith(200), true);

        res = mockResponse();
        await getUser(req, res);

        //assert.equal(res.send.getCall(0).args[0].firstname, updateData.FirstName);


        const updatePasswordData = {
            body: {
                OldPassword: userData.Password,
                NewPassword: 'modifiedPass'
            },
            Logged_userId: { data: userId }
        }
        const modifiedPasswordData = {
            body: {
                Telephone: userData.Telephone,
                Password: updatePasswordData.body.NewPassword
            },
            Logged_userId: { data: userId }
        }
        console.log(updatePasswordData, modifiedPasswordData)
        res = mockResponse();
        await updatePassword(updatePasswordData, res);
        assert.equal(res.status.calledWith(200), true);

        res = mockResponse();
        await validateLogin(modifiedPasswordData, res);
        assert.equal(res.status.calledWith(200), true);


        res = mockResponse();
        await deleteUser(req, res);
        // normal user should not able to delete account
        assert.equal(res.status.calledWith(403), true);

        // a test admin account should be already in the database with: phone 1111111111
        // password: modifiedPass
    })
})