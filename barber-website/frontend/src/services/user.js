import api from "./http";

export default new (class UserService {
  getUser = () => {
    return api.get("/getUser");
  };
  getAllUsers = () => {
    return api.get("/users");
  };
  update = (data) => {
    return api.put("/updateUser", data);
  };
  deleteAccount = (data) => {
    return api.post("/deleteUser", data);
  };
  updatePassword = (data) => {
    return api.put("/updatePassword", data);
  };
  login = (data) => {
    return api.post("/Login", data);
  };
  CreateBarberOrAdmin = (data) => {
    return api.post("/createUser", data);
  };
  createCustomerAccount = (data) => {
    return api.post("/createUser_customers", data);
  };
  updatePic = (data) => {
    return api.put("/updatePicture", data);
  };
  deletePic = () => {
    return api.delete("/deletePicture");
  };
  getAllFaqs = () => {
    return api.get("/getFAQ");
  };
  createFaq= (data) => {
    return api.post("/addFAQ",data);
  };
  deleteFaq= (data) => {
    return api.post("/deleteFAQ",data);
  };
})();



