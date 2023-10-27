import axios from "axios";
export class UserAPI {
  static login(param) {
    const url = "http://localhost:8080/api/v1/user/login";
    return axios.post(url, param);
  }
}
