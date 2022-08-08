import axios from "axios";

class OrderService {
  baseUrl = "http://localhost:8080/orderservice/";

  placeorder(data) {
    return axios.post(`${this.baseUrl}create`, data);
  }

}

export default new OrderService();