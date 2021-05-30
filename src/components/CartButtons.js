import React from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'

// const CartButtons = () => {
//   const { closeSidebar } = useProductsContext()
//   const { total_items, clearCart } = useCartContext()
//   const { loginWithRedirect, myUser, logout } = useUserContext()
//   return (
//     <Wrapper className='cart-btn-wrapper'>
//       <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
//         Cart
//         <span className='cart-container'>
//           <FaShoppingCart />
//           <span className='cart-value'>{total_items}</span>
//         </span>
//       </Link>
//       {myUser ? (
//         <button
//           type='button'
//           className='auth-btn'
//           onClick={() => {
//             clearCart()
//             localStorage.removeItem('user')
//             logout({ returnTo: window.location.origin })
//           }}
//         >
//           Logout <FaUserMinus />
//         </button>
//       ) : (
//         <button type='button' className='auth-btn' onClick={loginWithRedirect}>
//           Login <FaUserPlus />
//         </button>
//       )}
//     </Wrapper>
//   )
// }

// const Wrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   align-items: center;
//   width: 225px;

//   .cart-btn {
//     color: var(--clr-grey-1);
//     font-size: 1.5rem;
//     letter-spacing: var(--spacing);
//     color: var(--clr-grey-1);
//     display: flex;

//     align-items: center;
//   }
//   .cart-container {
//     display: flex;
//     align-items: center;
//     position: relative;
//     svg {
//       height: 1.6rem;
//       margin-left: 5px;
//     }
//   }
//   .cart-value {
//     position: absolute;
//     top: -10px;
//     right: -16px;
//     background: var(--clr-primary-5);
//     width: 16px;
//     height: 16px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: 50%;
//     font-size: 0.75rem;
//     color: var(--clr-white);
//     padding: 12px;
//   }
//   .auth-btn {
//     display: flex;
//     align-items: center;
//     background: transparent;
//     border-color: transparent;
//     font-size: 1.5rem;
//     cursor: pointer;
//     color: var(--clr-grey-1);
//     letter-spacing: var(--spacing);
//     svg {
//       margin-left: 5px;
//     }
//   }
// `
const CartButtons = () => {
  const {totalQty}=useCartContext();
  const {loginWithRedirect, logout, myUser,isAuthenticated,user}=useUserContext();
  return(
    <Wrapper>
   <div className='cart-links'>
     <div className='cart'>
      <span style={{margin:"0px 1px"}}> <Link to="/cart">
         Cart 
                 <span style={{position:"relative"}}><FaShoppingCart/><span style={{position:"absolute",top:"-45%",left:"50%",background:"red",borderRadius:"50%",width:"25px",height:"25px",textAlign:"center"}}>{totalQty}</span></span>
       </Link>
  
     <div style={{display:"inline-block",margin:"0px 2px",padding:"0px 15px"}}>
      {user?<button onClick={()=>logout({returnTo:window.location.origin})}>Logout <FaUserMinus/></button>:<button onClick={loginWithRedirect}>Login <FaUserPlus/></button>} 
       
       {/* <Link>{LoggedIn?"LogIn":"LogOut"}</Link>{LoggedIn?<FaUserMinus/>:<FaUserPlus/>} */}
     </div>
     </span>
     </div>
   </div>
   </Wrapper>
  );
}
const Wrapper=styled.div`
   display:flex;
   justify-content:center;
   width:20%;
   font-size:1.25rem;
   padding:0 auto;

`
export default CartButtons
