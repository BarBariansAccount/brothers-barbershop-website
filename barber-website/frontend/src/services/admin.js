import api from "./http";

export default new (class AdminService {
  getAllAppointments = (UserID) => {
    return api.post(`/Appointment/getAllBookedAppointment`, { UserID });
  }
  getAbout = () => {
    return api.get(`/HomePage/getAbout`);
  }
  updateAbout = (About) => {
    return api.post(`/HomePage/updateAbout`, { About });
  }
  getPrices = () => {
    return api.get(`/HomePage/getPricing`);
  }
  updatePrices = (p) => {
    return api.post(`/HomePage/updatePricing`, p);
  }
  getWorkingHours = () => {
    return api.get(`/HomePage/getWorkingHours`);
  }
  updateWorkingHours = (p) => {
    return api.post(`/HomePage/updateWorkingHours`, p);
  }
})();
