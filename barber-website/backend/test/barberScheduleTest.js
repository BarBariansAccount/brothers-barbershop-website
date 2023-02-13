const {
    addAvaliblilty,
    getBarberAvailablity_barberView,
    deleteBarberSchedule
} = require("../controllers/BarberSchedule")
const {
    checkAndGetAdminId,
    createCustomer,
    createBarber,
    deleteAccount
} = require("./userModelTest")

const { assert } = require('chai')
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods');


let barberId;
const bookingData = {
    Available_Date: "2050-01-01",
    hoursPerday: [12, 13, 14]
};


const addSchedule = async function (localBarberId) {
    let barberViewReq = mockRequest({ Date: bookingData.Available_Date });
    barberViewReq.Logged_userId = { data: localBarberId };
    let res = mockResponse();

    //check empty slot first
    await getBarberAvailablity_barberView(barberViewReq, res);
    assert.equal(res.send.calledWith("There is no Availablity recorded for this date. Kindly, record the availablity on update availablity page."), true);

    let req = mockRequest(bookingData);
    req.Logged_userId = { data: localBarberId };
    res = mockResponse();
    await addAvaliblilty(req, res);
    assert.equal(res.status.calledWith(200), true);
    assert.equal(res.send.calledWith('Hours Saved.'), true);

    res = mockResponse();
    await getBarberAvailablity_barberView(barberViewReq, res);
    assert.equal(res.status.calledWith(200), true);

    let scheduleArr = res.send.getCall(0).args[0];
    assert.equal(scheduleArr.length, 3);
    scheduleArr.forEach((schedule) => {
        console.log(parseInt(schedule.hour))
        assert.equal(bookingData.hoursPerday.includes(parseInt(schedule.hour)), true);
    })




}

describe("BarberSchedule Related Tests", function () {


    it("setup barber account and add availability", async function () {
        barberId = await createBarber();
        await addSchedule(barberId);

    })
})
