const {
    createUser,
    validateLogin,
    updateUser,
    updatePassword,
    deleteUser,
    getUser,
    createUser_customers,
    getusers,
    updatePicture,
    deletePicture,
    deleteUser_profile
} = require("../controllers/user")
const { assert } = require('chai')
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods')
const fs = require("fs");
require("dotenv").config();



const userData = {
    UserRole: 'Customer',
    Email: 'unitTesing@gmail.com',
    FirstName: 'UnitFirst',
    LastName: 'UnitLast',
    Telephone: 5555555555,
    Password: 'testPassword'
}
const userData2 = {
    UserRole: 'Barber',
    Email: 'unitTesing2@gmail.com',
    FirstName: 'UnitSecond',
    LastName: 'UnitSecond',
    Telephone: 5555555554,
    Password: 'testPassword'
}
const updateData = {
    Email: 'unitTesing@gmail.com',
    FirstName: 'UnitFirst1',
    LastName: 'UnitLast1'
}
const pictureRequest = {

    file: {
        filename: 'testPicture.png'
    }
}

const notAvailableNumber = 1234567890;

let userId2;
const adminData = {
    body: {
        Telephone: 1111111111,
        Password: "modifiedPass"
    }
}
let req;
let res;
let userId;
let adminId;

const checkAndGetAdminId = async function () {
    res = mockResponse();
    await validateLogin(adminData, res);
    adminId = res.json.getCall(0).args[0].User.userid;
    assert.equal(res.json.getCall(0).args[0].User.userrole, 'Admin');
    return adminId;

}

const createCustomer = async function () {
    req = mockRequest(userData);
    res = mockResponse();
    await createUser_customers(req, res);
    assert.equal(res.status.calledWith(200), true);
    //detailed info verified here
    assert.equal(res.json.getCall(0).args[0].User.firstname, userData.FirstName);


    return res.json.getCall(0).args[0].User.userid;
}
const createBarber = async function () {
    res = mockResponse();
    req = mockRequest(userData2);
    req.Logged_userId = { data: adminId };
    await createUser(req, res);
    assert.equal(res.status.calledWith(200), true);
    // verified detailed info by validateLogin bellow

    //verify login and get userid for barber
    res = mockResponse();
    req = mockRequest(userData2);
    await validateLogin(req, res);
    assert.equal(res.status.calledWith(200), true);
    //detailed info verified here
    assert.equal(res.json.getCall(0).args[0].User.firstname, userData2.FirstName);

    return res.json.getCall(0).args[0].User.userid;
}

const deleteAccount = async function (deleteId) {
    res = mockResponse();
    req = { body: { UserID: deleteId } };
    req.Logged_userId = { data: adminId };
    await deleteUser(req, res);
    assert.equal(res.status.calledWith(200), true);


}

describe("UserController related Tests", function () {

    it("test create user", async function () {

        userId = await createCustomer();

    })

    it("test create duplicate user error", async function () {
        res = mockResponse();
        req = mockRequest(userData);

        await createUser_customers(req, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.calledWith('User already exists. Enter different phone number.'), true);
        assert.equal(res.status.calledWith(200), false);

    })


    it("test getUsers error case", async function () {
        res = mockResponse();
        req = mockRequest(userData);
        req.Logged_userId = { data: userId };
        await getusers(req, res);

        assert.equal(res.status.calledWith(403), true);
        assert.equal(res.status.calledWith(200), false);

    })


    it("test validateLogin error", async function () {
        // verify unexciting phone error
        res = mockResponse();
        req = mockRequest(userData);
        req.body.Telephone = notAvailableNumber;
        await validateLogin(req, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.calledWith(`There is no user with ${notAvailableNumber}.`), true);
        assert.equal(res.send.getCall(0).args[0].firstname, null);
        assert.equal(res.status.calledWith(200), false);

        // verify with wrong password
        res = mockResponse();
        req = mockRequest(userData);
        req.body.Password = "randomError";
        await validateLogin(req, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.calledWith('Password is incorrect.'), true);
        assert.equal(res.send.getCall(0).args[0].firstname, null);
        assert.equal(res.status.calledWith(200), false);
    })

    it("test update user", async function () {
        res = mockResponse();
        req = mockRequest(updateData);
        req.Logged_userId = { data: userId };
        await updateUser(req, res);
        assert.equal(res.status.calledWith(200), true);
        // actual result checked by get user bellow

        res = mockResponse();
        await getUser(req, res);

        assert.equal(res.send.getCall(0).args[0][0].firstname, updateData.FirstName);

    })

    it("test update password with wrong password", async function () {
        const updatePasswordData = {
            body: {
                OldPassword: "wrongPass",
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
        res = mockResponse();
        await updatePassword(updatePasswordData, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.calledWith('Old Password is incorrect.'), true);
        assert.equal(res.status.calledWith(200), false);

        //double check with valid login bellow
        res = mockResponse();
        await validateLogin(modifiedPasswordData, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.calledWith('Password is incorrect.'), true);
        assert.equal(res.status.calledWith(200), false);
    })

    it("test update password and delete without permission", async function () {
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
        res = mockResponse();
        await updatePassword(updatePasswordData, res);
        assert.equal(res.status.calledWith(200), true);
        //validated by the validateLogin bellow

        res = mockResponse();
        await validateLogin(modifiedPasswordData, res);
        assert.equal(res.status.calledWith(200), true);
        //verifying here
        assert.equal(res.json.getCall(0).args[0].User.firstname, updateData.FirstName);

        res = mockResponse();
        await deleteUser(req, res);
        // normal user should not able to delete account
        assert.equal(res.status.calledWith(403), true);
        assert.equal(res.status.calledWith(200), false);


    })
    // a test admin account should be already in the database with: 
    // phone 1111111111
    // password: modifiedPass


    it('test create user by admin error cases', async function () {
        adminId = await checkAndGetAdminId();
        // test create barber with customer account 
        res = mockResponse();
        req = mockRequest(userData2);
        req.Logged_userId = { data: userId };
        await createUser(req, res);
        assert.equal(res.status.calledWith(403), true);
        assert.equal(res.status.calledWith(200), false);

        // test with a wrong user role
        res = mockResponse();
        req.Logged_userId = { data: adminId };
        req.body.UserRole = "randomError";
        await createUser(req, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.calledWith('User Role can only be "Customer" OR "Admin" OR "Barber"'), true);
        assert.equal(res.status.calledWith(200), false);

        // test with duplicate phone number
        res = mockResponse();
        req = mockRequest(userData2);
        req.Logged_userId = { data: adminId };
        req.body.Telephone = userData.Telephone;
        await createUser(req, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.calledWith('User already exists. Enter different phone number.'), true);
        assert.equal(res.status.calledWith(200), false);
    })

    it('test create user by admin and get users', async function () {

        userId2 = await createBarber();
    })

    it("test get all users", async function () {
        // data checked by get users bellow
        req = mockRequest(userData2);
        req.Logged_userId = { data: adminId };
        res = mockResponse();
        await getusers(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.json.getCall(0).args[0].length, 3);
        const allUsers = {};
        //reorganize because the order might not follow the order in the database
        res.json.getCall(0).args[0].forEach((user) => {
            allUsers[user.firstname] = user;
        })
        // more check here
        assert.equal(allUsers[updateData.FirstName].lastname, updateData.LastName);
        assert.equal(allUsers[userData2.FirstName].lastname, userData2.LastName);
    })

    it('test picture related feature', async function () {
        //mock image upload by create an empty test image
        const picturePath = process.env.Backend_URL + "uploads/" + pictureRequest.file.filename;
        const dirPath = "./uploads/";
        const filePath = dirPath + pictureRequest.file.filename;
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.closeSync(fs.openSync(filePath, 'w'));

        req = pictureRequest;
        req.Logged_userId = { data: userId2 };
        res = mockResponse();
        await updatePicture(req, res);
        assert.equal(res.status.calledWith(200), true);
        //data will be verify by get user bellow
        res = mockResponse();
        await getUser(req, res);
        assert.equal(res.send.getCall(0).args[0][0].picturelink, picturePath)

        res = mockResponse();
        await deletePicture(req, res);
        assert.equal(res.status.calledWith(200), true);
        // verify by get user bellow:
        await getUser(req, res);
        assert.equal(res.send.getCall(0).args[0][0].picturelink, null)

    })


    it('test delete user', async function () {
        req = mockRequest();
        res = mockResponse();
        req.Logged_userId = { data: userId };
        await deleteUser_profile(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.send.calledWith(`User has been sucessfully deleted with User ID: ${userId}.`), true);


        await deleteAccount(userId2);

        // verify delete result
        req = mockRequest(userData2);
        req.Logged_userId = { data: adminId };
        res = mockResponse();
        await getusers(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.json.getCall(0).args[0].length, 1);
        assert.equal(res.json.getCall(0).args[0][0].userrole, 'Admin');

    })

    it('test delete user error', async function () {
        // try to delete an account that not there(already deleted)
        res = mockResponse();
        req = { body: { UserID: userId } };
        req.Logged_userId = { data: adminId };
        await deleteUser(req, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.calledWith(`There is no user with this user ID: ${userId}.`), true);
        assert.equal(res.status.calledWith(200), false);

        // same but with delete user profile
        res = mockResponse();
        req = mockRequest();
        req.Logged_userId = { data: userId };
        await deleteUser_profile(req, res);
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.getCall(0).args[0], `There is no user with this user ID: ${userId}.`);
        assert.equal(res.status.calledWith(200), false);
    })

})

module.exports = {
    checkAndGetAdminId,
    createCustomer,
    createBarber,
    deleteAccount
}