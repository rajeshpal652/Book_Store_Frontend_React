import React from 'react'
import Displaycart from '../../components/displaycart/Displaycart'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import CartService from '../../services/CartService'


function Cart() {
  
    const [quantity,setQuantity]=React.useState(0)
    const [wishquantity,setWishquantity]=React.useState(0)
    const [cart, setCart] = React.useState([])
    const[wishlist,setWishlist]= React.useState([])

    React.useEffect(()=>{
        getCart()
        getwishlist()
    },[])

    const getCart =()=>{ 
      CartService.getcart().then((result)=>{
        console.log(result);
        setQuantity(result.data.data.length)
        setCart(result.data.data)
      }).catch(()=>{
      })
  }
  const getwishlist =()=>{
    
}
  
  return (
    <div>
        <Header wishquantity={wishquantity} quantity={quantity}/>
        <Displaycart cart={cart} quantity={quantity} getCart={getCart}/>
        <Footer/>
    </div>
  )
}

export default Cart