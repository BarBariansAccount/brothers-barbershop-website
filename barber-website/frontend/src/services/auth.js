import api from "./http";

export default new (class AuthService {
  getUser = (Telephone) => {
    return api.post("/User/getUser", { Telephone });
  };
  login = (data) => {
    return api.post("/User/Login", data);
  };
  signUp = (data) => {
    return api.post("/User/createUser", data);
  };
})();
