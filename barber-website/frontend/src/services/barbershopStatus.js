import api from "./http";

export default new (class BarberShopStatus {
  updateStatus = (payload) => {
    return api.put("/BusyStatus/updateStatus", payload);
  };
  getStatus = () => {
    return api.get("/BusyStatus/getStatus");
  };
  addAvailability = (payload) => {
    return api.put("/BarberSchedule/updateSchedule", payload);
  };
  //by date
  getAvailabilities = (payload) => {
    return api.post("/BarberSchedule/getBarberSchedule_barberView", payload);
  };
  getAvailabilities = (payload) => {
    // return api.get("/BarberSchedule/getBarberSchedule_barberView", { params: payload })
    return api.post("/BarberSchedule/getBarberSchedule_barberView", payload);
  };
  delAvailabilities = (array) => {
    return api.delete("/BarberSchedule/deleteBarberSchedule", {
      data: { aptIdsTodelete: array },
    });
  };
})();
