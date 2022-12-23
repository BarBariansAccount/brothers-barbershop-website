import api from "./http";

export default new (class BarberShopStatus {
  updateStatus = (payload) => {
    return api.put("/BusyStatus/updateStatus", payload);
  };
  getStatus = () => {
    return api.get("/BusyStatus/getStatus");
  };
})();
