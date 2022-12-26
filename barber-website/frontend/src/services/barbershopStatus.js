import api from "./http";

export default new (class BarberShopStatus {
  deleteAcc = () => {
    return api.post("/deleteUser");
  };
  updateStatus = (payload) => {
    return api.post("/updateStatus", payload);
  };
  getStatus = () => {
    return api.get("/getStatus");
  };
  createBarberAccount = (payload) => {
    return api.post("/createUser", payload)
  }
  addAvailability = (payload) => {
    return api.put("/BarberSchedule/updateSchedule", payload)
  }
  //by date
  getAvailabilities = (payload) => {
    return api.post("/BarberSchedule/getBarberSchedule_barberView", payload)
  }
  getAvailabilities = (payload) => {
    // return api.get("/BarberSchedule/getBarberSchedule_barberView", { params: payload })
    return api.post("/BarberSchedule/getBarberSchedule_barberView",  payload )
  }
  delAvailabilities = (array) => {
    return api.delete("/BarberSchedule/deleteBarberSchedule", { data: { aptIdsTodelete: array } })
  }

})();
