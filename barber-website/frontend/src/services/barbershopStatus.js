import api from "./http";

export default new (class barbershopStatusService {
  getStatus = () => {
    return api.get("/getStatus");
  };
  updateStatus = (payload) => {
    return api.post("/updateStatus", payload);
  };
})();
