const {
    addAvaliblilty,
    getBarberAvailablity_barberView,
    deleteBarberSchedule
} = require("../controllers/BarberSchedule")
const {
    createBarber,
    deleteAccount
} = require("./userModelTest")

const { assert } = require('chai')
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods');



const bookingData = {
    Available_Date: "2050-01-01",
    hoursPerday: [false, false, true, true, true]
};
const scheduleHour = [12, 13, 14];



const addSchedule = async function (localBarberId) {
    let barberViewReq = mockRequest({ Date: bookingData.Available_Date });
    barberViewReq.Logged_userId = { data: localBarberId };
    let res = mockResponse();

    //check empty slot first
    await getBarberAvailablity_barberView(barberViewReq, res);
    assert.equal(res.status.calledWith(200), true);
    assert.equal(res.send.calledWith("There is no Availablity recorded for this date. Kindly, record the availablity on update availablity page."), true);

    // add schedule
    let req = mockRequest(bookingData);
    req.Logged_userId = { data: localBarberId };
    res = mockResponse();
    await addAvaliblilty(req, res);
    assert.equal(res.status.calledWith(200), true);
    assert.equal(res.send.calledWith('Hours Saved.'), true);


    // check all schedules
    res = mockResponse();
    await getBarberAvailablity_barberView(barberViewReq, res);
    assert.equal(res.status.calledWith(200), true);

    let scheduleArr = res.send.getCall(0).args[0];
    assert.equal(scheduleArr.length, 3);
    const aptIds = [];
    scheduleArr.forEach((schedule) => {
        assert.equal(scheduleHour.includes(parseInt(schedule.hour)), true);
        aptIds.push(schedule.appointment_id);
    })
    return aptIds;

}

const deleteSchedules = async function (localBarberId, aptIds) {

    let req = mockRequest({ aptIdsTodelete: aptIds });
    let res = mockResponse();
    await deleteBarberSchedule(req, res);
    assert.equal(res.status.calledWith(200), true);

    // verify result after delete
    let barberViewReq = mockRequest({ Date: bookingData.Available_Date });
    barberViewReq.Logged_userId = { data: localBarberId };
    res = mockResponse();
    await getBarberAvailablity_barberView(barberViewReq, res);
    assert.equal(res.status.calledWith(200), true);
    assert.equal(res.send.calledWith("There is no Availablity recorded for this date. Kindly, record the availablity on update availablity page."), true);
}

describe("BarberSchedule Related Tests", function () {
    let aptIds;
    let barberId;

    it("setup barber account and test add availability", async function () {
        barberId = await createBarber();
        aptIds = await addSchedule(barberId);

    })

    it("test delete availability and clean up", async function () {
        await deleteSchedules(barberId, aptIds);
        await deleteAccount(barberId);
    })
})

module.exports = {
    addSchedule,
    deleteSchedules
}
