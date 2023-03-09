const {
    createBarber,
    deleteAccount
} = require("./userModelTest")
const {
    addSchedule,
    deleteSchedules
} = require("./barberScheduleTest")

const {
    BarberAvailablityDates,
    getBarberAvailablity_Hours,
    addAppointment,
    getAllBarbers,
    customerAppointmentDetails,
    updateAppointment,
    cancelAppointment,
    getAllBookedAppointment
} = require("../controllers/Appointment")


const { assert } = require('chai')
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods');


const bookingData = {
    Available_Date: "2050-01-01",
    hoursPerday: [false, false, true, true, true]
};
const scheduleHour = [12, 13, 14];


describe("Appointment related tests", function () {
    let aptIds;
    let barberId;

    it("setup appointment and do different checks", async function () {
        // set up by creating schedule
        barberId = await createBarber();
        aptIds = await addSchedule(barberId);

        //check barber
        let req = mockRequest();
        let res = mockResponse();
        await getAllBarbers(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.json.getCall(0).args[0][0].userid, barberId);

        //check date
        req = mockRequest({ BarberID: barberId });
        res = mockResponse();
        await BarberAvailablityDates(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.send.getCall(0).args[0][0].available_date.toISOString().slice(0, 10), bookingData.Available_Date);

        //check hour
        req = mockRequest({ BarberID: barberId, Available_Date: bookingData.Available_Date });
        res = mockResponse();
        await getBarberAvailablity_Hours(req, res);
        assert.equal(res.status.calledWith(200), true);
        for (let i = 0; i < scheduleHour.length; i++) {
            assert.equal(res.json.getCall(0).args[0][i].hour, scheduleHour[i]);
        }







    })

    it("clean up appointments", async function () {
        await deleteSchedules(barberId, aptIds);
        await deleteAccount(barberId);
    })
})