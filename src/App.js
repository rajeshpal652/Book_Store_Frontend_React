import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/displaybooks/Dashboard";
import Mainpage from "./pages/loginsignup/Loginsignup";
import Cart from "./pages/cart/Cart";
import CartService
 from "./services/CartService";
 import Checkout from "./pages/checkout/checkout";

const wishlistContext = React.createContext();
const cartContext = React.createContext();
const stateContext = React.createContext();

function App() {
  const [quantity, setQuantity] = React.useState(0);
  const [wishquantity, setWishquantity] = React.useState(0);
  const [cart, setCart] = React.useState([]);
  const [wishlist, setWishlist] = React.useState([]);

  const getCart = () => {
    CartService.getcart()
      .then((result) => {
        setQuantity(result.data.data.length);
        setCart(result.data.data);
      })
      .catch(() => {});
  };

  const getwishlist = () => {
    
  };

  return (
    <wishlistContext.Provider value={getwishlist}>
      <cartContext.Provider value={getCart}>
        <stateContext.Provider
          value={{
            quantity: [quantity, setQuantity],
            wishquantity: [wishquantity, setWishquantity],
            cart: [cart, setCart],
            wishlist: [wishlist, setWishlist],
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Mainpage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout/>} />
            </Routes>
          </BrowserRouter>
        </stateContext.Provider>
      </cartContext.Provider>
    </wishlistContext.Provider>
  );
}

export default App;
