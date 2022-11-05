import api from "./http";

export default new (class AdminService {
  deleteAcc = () => {
    return api.post("/deleteUser");
  };
  updateStatus = (payload) => {
    return api.post("/updateStatus", payload);
  };

  createBarberAccount = (payload) => {
    return  api.post("/createUser",payload)
  }

})();
