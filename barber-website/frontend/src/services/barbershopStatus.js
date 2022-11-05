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
    return  api.post("/createUser",payload)
  }


})();
