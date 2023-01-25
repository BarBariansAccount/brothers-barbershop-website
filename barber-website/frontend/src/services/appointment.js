import api from "./http";

export default new (class UserService {
  getBarbers = () => {
    return api.get("/Appointment/getAllBarbers");
  }
  getBarberAvailDates = (BarberID) => {
    return api.post("/Appointment/getBarberAvailablityDates", { BarberID });
  }
  getBarberAvailHours = (BarberID, Available_Date) => {
    return api.post("/Appointment/getBarberAvailablity_Hours", { BarberID, Available_Date });
  }
  //   {
  //     "appointment_id":50,
  //     "Customer_First_name":"ALi",
  //     "Customer_Last_name":"Ali",
  //     "Customer_email":"...@gmail.com",
  //     "Customer_telephone":"0000",
  //     "service":"Haircut",
  //     "Customer_appointment_notes":"sa"
  // }
  addAppointment = (params) => {
    return api.put("/Appointment/addAppointment", params);
  }
  //   {
  //     "appointment_id":50,
  //     "Customer_First_name":"ALi",
  //     "Customer_Last_name":"Ali",
  //     "Customer_email":"...@gmail.com",
  //     "Customer_telephone":"0000",
  //     "service":"Haircut",
  //     "Customer_appointment_notes":"sa"
  // }
  updateAppointment = (params) => {
    return api.put("/Appointment/updateAppointment", params);
  }
  appointmentDetail = (token) => {
    return api.get(`/Appointment/AppointmentDetails/${token}`);
  }
  customerAppointmentDetail = (appointment_id) => {
    return api.get(`/Appointment/customerAppointmentDetails`, { appointment_id });
  }
  // cancel
  cancelAppointment = (accessToken) => {
    return api.put(`/Appointment/cancelAppointment`, { accessToken });
  }
})();
