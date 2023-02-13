import api from "./http";

export default new (class AdminService {
  getAllAppointments = (UserID) => {
    return api.post(`/Appointment/getAllBookedAppointment`, { UserID });
  }
})();
