import api from "./http";

export default new (class UserService {
  getUser = () => {
    return api.get("/User/getUser");
  };
  getAllUsers = () => {
    return api.get("/User/users");
  };
  update = (data) => {
    return api.put("/User/updateUser", data);
  };
  deleteAccount = (data) => {
    return api.post("/User/deleteUser", data);
  };
  updatePassword = (data) => {
    return api.put("/User/updatePassword", data);
  };
  login = (data) => {
    return api.post("/User/Login", data);
  };
  CreateBarberOrAdmin = (data) => {
    return api.post("/User/createUser", data);
  };
  createCustomerAccount = (data) => {
    return api.post("/User/createUser_customers", data);
  };
  updatePic = (data) => {
    return api.put("/User/updatePicture", data);
  };
  deletePic = () => {
    return api.post("/User/deletePicture");
  };
  getAllFaqs = () => {
    return api.get("/FAQ/getFAQ");
  };
  createFaq = (data) => {
    return api.post("/FAQ/addFAQ", data);
  };
  deleteFaq = (data) => {
    return api.post("/FAQ/deleteFAQ", data);
  };
})();
