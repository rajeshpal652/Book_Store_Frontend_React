import React from "react";
import background from "../../logo/background.png";
import background2 from "../../logo/background2.png";
import { useNavigate } from "react-router-dom";
import './checkoutorder.scss';

function Checkoutorder() {
  const navigate = useNavigate();
  const navDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="checkout-container">
        <div className="image">
          <img src={background} alt="Add image" />
        </div>
        <div className="order-msg">Order placed successfully</div>
        <div className="image2">
          <img src={background2} alt="Add image" />
        </div>
        <div className="message">
          hurray!!! your order is confirmed the order id is #123456 save the
          order id for further communication..
        </div>

        <table className="information">
          <tr className="headi">
            <td className="email">Email us</td>
            <td className="contact">Contact us</td>
            <td className="add">Address</td>
          </tr>
          <tr className="data">
            <td className="email">admin@bookstore.com</td>
            <td className="contact">7003321213</td>
            <td className="add">
              42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near
              Kumarakom restaurant, HSR Layout, Bangalore 560034
            </td>
          </tr>
        </table>
        <div className="bn">
          <button className="shopping-button" onClick={() => navDashboard()}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkoutorder;
