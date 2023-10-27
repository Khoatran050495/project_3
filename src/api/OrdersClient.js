import axios from "axios";
export class PostOrdersAPI {
  static PostOrders(param) {
    const url = "http://localhost:8080/api/v1/orders/postorders";
    return axios.post(url, param);
  }
}
