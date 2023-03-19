import api from "./http";

export default new (class ProductService {
  getAllProducts = () => {
    return api.get("Products/getProducts");
  };
  addProduct = (data) => {
    return api.post("Products/addProducts", data);
  };
  updateProduct = (data) => {
    return api.put("Products/updateProducts", data);
  };
  deleteProduct = (data) => {
    return api.delete("Products/deleteProducts", data);
  };
})();
