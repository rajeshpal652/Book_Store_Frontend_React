import axios from "axios";

class CartService {
  baseUrl = "http://localhost:8080/cartservice/";

  header = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  addtocart(bookid, data) {
    console.log(this.header);
    return axios.post(`${this.baseUrl}addtocart/${bookid}`, data, this.header);
  }

  getcart() {
    return axios.get(`${this.baseUrl}get`, this.header);
  }

  getcartprice() {
    return axios.get(`${this.baseUrl}getcartprice`, this.header);
  }

  deletecart(cartId) {
    return axios.delete(`${this.baseUrl}delete/${cartId}`, this.header);
  }

  // updatecart(cartId, quantity) {
  //     console.log(this.header);
  //     return axios.put(`${this.baseUrl}update/${cartId}/${quantity}`, this.header)
  // }

  updatecart(cartId, quantity) {
    fetch(`${this.baseUrl}update/${cartId}/${quantity}`, {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }

  deleteallcart() {
    return axios.delete(`${this.baseUrl}deleteall`, this.header);
  }
}
export default new CartService();
