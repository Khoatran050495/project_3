import axios from "axios";
export class UserAPI {
  static register(param) {
    const url = "http://localhost:8080/api/v1/user/register";
    return axios.post(url, param);
  }
  static login(param) {
    const url = "http://localhost:8080/api/v1/user/login";
    return axios.post(url, param);
  }
  //   static getAllUsers() {
  //     const url = "/users";
  //     return axiosClient.get(url);
  //   }
  //   static updateUser(param) {
  //     const url = `/users/${param.id}`;
  //     return axiosClient.patch(url, param);
  //   }
  //   static deleteUser(param) {
  //     const url = `/users/${param}`;
  //     return axiosClient.delete(url);
  //   }
}