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
    console.log("barberid-data", data);
    return api.put("/User/deleteUser", data);
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
    return api.delete("/User/deletePicture");
  };
  getAllFaqs = () => {
    return api.get("/FAQ/getFAQ");
  };
  createFaq = (data) => {
    return api.post("/FAQ/addFAQ", data);
  };
  deleteFaq = (data) => {
    return api.put("/FAQ/deleteFAQ", data);
  };
  updateFAQ = (data) => {
    return api.put("/FAQ/updateFAQ", data);
  };
  resetPassword = (data) => {
    return api.post('/ResetPassword/SendEmail', data);
  };
  getGeneratedPassword(data){
    return api.put('/ResetPassword/Verification',data)
  }
})();
