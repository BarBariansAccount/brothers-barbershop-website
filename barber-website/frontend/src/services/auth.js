import api from "./http";

export default new (class AuthService {
  getUser = (Telephone) => {
    return api.post("/getUser", { Telephone });
  };
  login = (data) => {
    return api.post("/Login", data);
  };
  signUp = (data) => {
    return api.post("/createUser", data);
  };
})();
