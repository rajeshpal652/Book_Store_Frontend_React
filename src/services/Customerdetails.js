import axios from "axios";

class Customerdetails {
  baseUrl = "http://localhost:8080/userregistration/";

  addcustomerdetails(data) {
    return axios.post(`${this.baseUrl}customerdetails`, data);
  }
}

export default new Customerdetails();
