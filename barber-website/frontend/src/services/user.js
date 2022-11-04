import api from "./http";

export default new (class UserService {
  getUser = () => {
    return api.get("/getUser");
  };
  update = (data) => {
    return api.post("/updateUser", data);
  };
  updatePassword = (data) => {
    return api.post("/updatePassword", data);
  };
  login = (data) => {
    return api.post("/Login", data);
  };
  signUp = (data) => {
    return api.post("/createUser", data);
  };
})();
