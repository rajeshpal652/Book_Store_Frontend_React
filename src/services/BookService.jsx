import axios from "axios";

class BookService {
  baseUrl = "http://localhost:8080/bookservice/";
  getAllBooks() {
    return axios.get(`${this.baseUrl}getbooks`);
  }

  getAllBooksByAscendingPrice() {
    return axios.get(`${this.baseUrl}sortpricelowtohigh`);
  }

  getAllBooksByDescendingPrice() {
    return axios.get(`${this.baseUrl}sortpricehightolow`);
  }
}

export default new BookService();
