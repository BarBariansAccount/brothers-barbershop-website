const {
    createBarber,
    createCustomer,
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
const userData = {
    UserRole: 'Customer',
    Email: 'unitTesing@gmail.com',
    FirstName: 'UnitFirst',
    LastName: 'UnitLast',
    Telephone: 5555555555,
    Password: 'testPassword'
}




describe("Appointment related tests", function () {
    let aptIds;
    let barberId;
    let customerId;
    let accessToken = Array(3);

    const addAAppointment = async function (index) {
        let req = mockRequest({
            appointment_id: aptIds[index],
            Customer_First_name: userData.FirstName,
            Customer_Last_name: userData.LastName,
            Customer_email: userData.Email,
            Customer_telephone: userData.Telephone,
            service: 'Haircut',
            Customer_appointment_notes: 'unit notes 1',
            doesnt_send_email: true
        });
        let res = mockResponse();
        await addAppointment(req, res);
        assert.equal(res.status.calledWith(200), true);
        accessToken[index] = res.send.getCall(0).args[0].accessToken;
    }

    it("setup appointment and do different checks", async function () {
        // set up by creating schedule
        barberId = await createBarber();
        aptIds = await addSchedule(barberId);
        customerId = await createCustomer();

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

    it("test add appointment", async function () {
        addAAppointment(0);
        addAAppointment(1);

        //verify actual result here
        req = mockRequest({ BarberID: barberId, Available_Date: bookingData.Available_Date });
        res = mockResponse();
        await getBarberAvailablity_Hours(req, res);
        assert.equal(res.status.calledWith(200), true);
        // assert.equal(res.json.getCall(0).args[0].length, 1);
        // assert.equal(res.json.getCall(0).args[0][0].hour, scheduleHour[2]);



    })

    it("clean up appointments", async function () {
        await deleteSchedules(barberId, aptIds);
        await deleteAccount(barberId);
        await deleteAccount(customerId);
    })
})