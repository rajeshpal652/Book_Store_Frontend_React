import React from 'react';
import DisplayBook from '../../components/displaybook/DisplayBook';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import CartService from '../../services/CartService';


function Dashboard() {

  const [quantity,setQuantity]=React.useState(0)
  const [wishquantity,setWishquantity]=React.useState(0)
  const [cart ,setCart]=React.useState([])
  const [wishlist,setWishlist] = React.useState([])
  const [searchText,setSearchText]=React.useState("")
  
  const getCart =()=>{
    CartService.getcart().then((result)=>{
  
      setQuantity(result.data.data.length)
      setCart(result.data.data)
  }).catch(()=>{

  })
}
const getwishlist =()=>{

}

const search=(value)=>{
  setSearchText(value)
}

  return <div>
    <div className='dashboard'>
      <Header quantity={quantity} wishquantity={wishquantity} search={search}/>
      <DisplayBook cart={cart} wishlist={wishlist} getCart={getCart} getwishlist={getwishlist} searchText={searchText}/>
      <Footer/>
    </div>
  </div>;
}

export default Dashboard;