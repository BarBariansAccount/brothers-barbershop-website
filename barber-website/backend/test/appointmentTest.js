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
const MODIFIED_FIRST = "modifiedFirst";




describe("Appointment related tests", function () {
    let aptIds;
    let barberId;
    let customerId;
    let accessToken = Array(3);
    let accessTokenModified;

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
        await addAAppointment(0);
        await addAAppointment(1);

        //verify actual result here
        // req = mockRequest({ BarberID: barberId, Available_Date: bookingData.Available_Date });
        // res = mockResponse();
        // await getBarberAvailablity_Hours(req, res);
        // assert.equal(res.status.calledWith(200), true);
        // assert.equal(res.json.getCall(0).args[0].length, 1);
        // assert.equal(res.json.getCall(0).args[0][0].hour, scheduleHour[2]);

        //check detail of first appointment
        let req = mockRequest();
        let res = mockResponse();
        req.params = { token: accessToken[0] };

        await customerAppointmentDetails(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.json.getCall(0).args[0][0].hour, scheduleHour[0]);
        assert.equal(res.json.getCall(0).args[0][0].customer_first_name, userData.FirstName);



    })

    it("test add appointments error case", async function () {
        let req = mockRequest({
            appointment_id: aptIds[0],
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
        assert.equal(res.status.calledWith(400), true);
        assert.equal(res.send.getCall(0).args[0], "booked already");
    })

    it("test update and get all appointments", async function () {
        let req = mockRequest({
            accessToken: accessToken[0],
            appointment_id: aptIds[0],
            Customer_First_name: MODIFIED_FIRST,
            Customer_Last_name: userData.LastName,
            Customer_email: userData.Email,
            Customer_telephone: userData.Telephone,
            service: 'Haircut',
            Customer_appointment_notes: 'unit notes 1',
            doesnt_send_email: true
        });
        let res = mockResponse();
        await updateAppointment(req, res);
        assert.equal(res.status.calledWith(200), true);
        accessTokenModified = res.send.getCall(0).args[0].accessToken;

        //verify
        req = mockRequest();
        res = mockResponse();
        req.params = { token: accessTokenModified };
        await customerAppointmentDetails(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.json.getCall(0).args[0][0].hour, scheduleHour[0]);
        assert.equal(res.json.getCall(0).args[0][0].customer_first_name, MODIFIED_FIRST);

        //check all 
        req = mockRequest({ UserID: customerId });
        res = mockResponse();
        await getAllBookedAppointment(req, res);
        assert.equal(res.status.calledWith(200), true);
        //get today's appointment so should be 0 for now
        assert.equal(res.send.getCall(0).args[0].length, 0);

    })


    it("test cancel appointment", async function () {
        //cancel first
        let req = mockRequest({ accessToken: accessTokenModified, doesnt_send_email: true });
        let res = mockResponse();
        await cancelAppointment(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.send.getCall(0).args[0].msg, 'success');

        //cancel second
        req = mockRequest({ accessToken: accessToken[1], doesnt_send_email: true });
        res = mockResponse();
        await cancelAppointment(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.send.getCall(0).args[0].msg, 'success');

        //verify
        req = mockRequest({ BarberID: barberId, Available_Date: bookingData.Available_Date });
        res = mockResponse();
        await getBarberAvailablity_Hours(req, res);
        assert.equal(res.status.calledWith(200), true);
        assert.equal(res.json.getCall(0).args[0][0].booked, false);


    })


    it("clean up appointments", async function () {
        await deleteSchedules(barberId, aptIds);
        await deleteAccount(barberId);
        await deleteAccount(customerId);
    })
})