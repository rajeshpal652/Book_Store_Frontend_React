import React from "react";

import "./DisplayBook.scss";
import bookimage from "../../logo/book.png";
import BookService from "../../services/BookService";
import CartService from "../../services/CartService";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
function DisplayBook(props) {
  const [books, setBooks] = React.useState([]);
  const [msg, setMsg] = React.useState();

  React.useEffect(() => {
    props.getCart();
    getBooks();
    props.getwishlist();
  }, [props.searchText]);

  // const getBooks = () => {
  //     BookService.getAllBooks().then((result) => {
  //         setBooks(result.data)
  //     }).catch((error) => {
  //         console.log("error occured : " + error);
  //     })
  // }

  const getBooks = () => {
    BookService.getAllBooks()
      .then((result) => {
        if (props.searchText) {
          console.log(result.data);
          let filterData = result.data.data.filter((book) =>
            book.bookName.toLowerCase().includes(props.searchText.toLowerCase())
          );
          console.log(filterData);
          setBooks(filterData);
        } else {
          console.log(result.data.data);
          setBooks(result.data.data);
        }
      })
      .catch((error) => {
        console.log("error occured : " + error);
      });
  };

  const handleSort = (event) => {
    if (event.target.value === "relevance") {
      getBooks();
    }
    if (event.target.value === "ascending") {
      BookService.getAllBooksByAscendingPrice()
        .then((result) => {
          setBooks(result.data.data);
        })
        .catch((error) => {
          console.log("error occured in ascending sorting" + error);
        });
    }
    if (event.target.value === "descending") {
      BookService.getAllBooksByDescendingPrice()
        .then((result) => {
          setBooks(result.data.data);
        })
        .catch((error) => {
          console.log("error occured in decending sorting" + error);
        });
    }
  };

  const addCart = (book) => {
    let data = {
      quantity: 1,
    };
    let bookid = book.bookId;
    CartService.addtocart(bookid, data)
      .then((result) => {
        getBooks();
        props.getCart();
        setMsg(true);
      })
      .catch(() => {});
  };
  const wishlist = (book) => {};

  const buttons = (book) => {
    let butn = "";
    const obj = props.cart.find((data) => data.bookName === book.bookName);
    const wishl = props.wishlist.find(
      (data) => data.bookName === book.bookName
    );

    if (obj) {
      butn = <button className="already-cart">Added to cart</button>;
    } else if (wishl) {
      butn = <button className="already-wishlist">Added to wishlist</button>;
    } else {
      butn = (
        <div className="buttn-grp">
          <div
            onClick={() => {
              addCart(book);
            }}
          >
            <>
              <Button
                className="cart-btn"
                sx={{ fontSize: "10px" }}
                onClick={handleClick({
                  vertical: "bottom",
                  horizontal: "right",
                })}
              >
                Add to Cart
              </Button>
            </>
            {/* </div> */}
          </div>

          <div
            onClick={() => {
              wishlist(book);
            }}
          >
            <>
              <Button
                className="wishlist"
                sx={{ fontSize: "10px" }}
                onClick={handleClick({
                  vertical: "bottom",
                  horizontal: "right",
                })}
              >
                WISHLIST
              </Button>
            </>
          </div>
        </div>
      );
    }
    return butn;
  };

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      <div className="book-containers">
        <p className="books">Books </p>
        {books ? <p className="item"> ({books.length})</p> : ""}

        <select
          name="sort by relevance"
          className="price"
          onChange={(event) => handleSort(event)}
        >
          <option value="relevance">Sort by relevance</option>
          <option value="ascending">Price:Low to high</option>
          <option value="descending">Price:High to low</option>
        </select>
      </div>

      <div className="map-containers">
        {books
          ? books.map((book, index) => {
              if (book.bookQuantity === 0) {
                return (
                  <div className="out-books-display">
                    <div className="out-image-display">
                      <div>
                        <img className="out-image" src={bookimage}></img>
                      </div>
                    </div>
                    <div className="out-content">
                      <span className="out-book-name">{book.bookName}</span>
                      <br></br>
                      <span className="out-author">By {book.bookAuthor}</span>
                      <div className="out-rate">
                        <span className="out-rating">4.5* </span>
                        <span className="out-text"> (20)</span>
                      </div>
                      <div className="out-pricebook">
                        <span className="">Rs:- {book.bookPrice}</span>
                      </div>

                      <Button className="out-button" variant="outlined" color="error">Out Of Stock</Button>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="books-display">
                    <div className="image-display">
                      <div>
                        <img className="image" src={bookimage}></img>
                      </div>
                    </div>
                    <div className="content">
                      <span className="book-name">{book.bookName}</span>
                      <br></br>
                      <span className="author">By {book.bookAuthor}</span>
                      <div className="rate">
                        <span className="rating">4.5* </span>
                        <span className="text"> (20)</span>
                      </div>
                      <div className="pricebook">
                        <span className="">Rs:- {book.bookPrice}</span>
                      </div>

                      {buttons(book)}
                    </div>
                  </div>
                );
              }
            })
          : ""}
        <div></div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={msg ? "Added to Cart" : "Added to Wishlist"}
          key={vertical + horizontal}
        />
      </div>
      <div className="paginationg">
        <Stack spacing={2}>
          <Pagination count={10} />
        </Stack>
      </div>
    </>
  );
}

export default DisplayBook;
