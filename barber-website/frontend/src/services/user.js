import api from "./http";

export default new (class UserService {
  getUser = () => {
    return api.get("/getUser");
  };
  getAllUsers = () => {
    return api.get("/users");
  };
  update = (data) => {
    return api.post("/updateUser", data);
  };
  deleteAccount = (data) => {
    return api.post("/deleteUser",data);
  };
  updatePassword = (data) => {
    return api.post("/updatePassword", data);
  };
  login = (data) => {
    return api.post("/Login", data);
  };
  signUp = (data) => {
    return api.post("/createUser_customers", data);
  };
  createBarberAccount = (data) => {
    return api.post("/createUser", data);
  };
})();
