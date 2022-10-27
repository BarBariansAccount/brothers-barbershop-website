import api from "./http";

export default new (class UserService {
  getUser = (UserID) => {
    return api.post("/getUser", { UserID });
  };
  update = (data) => {
    return api.post("/updateUser", data);
  };
  changePassword = (data) => {
    return api.post("/updatePassword", data);
  };
  login = (data) => {
    return api.post("/Login", data);
  };
  signUp = (data) => {
    return api.post("/createUser", data);
  };
})();
