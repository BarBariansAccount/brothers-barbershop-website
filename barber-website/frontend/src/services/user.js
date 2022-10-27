import api from "./http";

export default new (class UserService {
  getUser = (Telephone) => {
    return api.post("/getUser", { Telephone });
  };
  update = (data) => {
    return api.post("/updateUser", data);
  };
  login = (data) => {
    return api.post("/Login", data);
  };
  signUp = (data) => {
    return api.post("/createUser", data);
  };
})();
