import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "../utils/constants";
import CartButtons from "./CartButtons";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";
import { useCartContext } from "../context/cart_context";
// const Nav = () => {
//   const { openSidebar } = useProductsContext()
//   const { myUser } = useUserContext()
//   return (
//     <NavContainer>
//       <div className='nav-center'>
//         <div className='nav-header'>
//           <Link to='/'>
//             <img src={logo} alt='comfy sloth' />
//           </Link>
//           <button type='button' className='nav-toggle' onClick={openSidebar}>
//             <FaBars />
//           </button>
//         </div>
//         <ul className='nav-links'>
//           {links.map((link) => {
//             const { id, text, url } = link
//             return (
//               <li key={id}>
//                 <Link to={url}>{text}</Link>
//               </li>
//             )
//           })}
//           {myUser && (
//             <li>
//               <Link to='/checkout'>checkout</Link>
//             </li>
//           )}
//         </ul>
//         <CartButtons />
//       </div>
//     </NavContainer>
//   )
// }

// const NavContainer = styled.nav`
//   height: 5rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   .nav-center {
//     width: 90vw;
//     margin: 0 auto;
//     max-width: var(--max-width);
//   }
//   .nav-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     img {
//       width: 175px;
//       margin-left: -15px;
//     }
//   }
//   .nav-toggle {
//     background: transparent;
//     border: transparent;
//     color: var(--clr-primary-5);
//     cursor: pointer;
//     svg {
//       font-size: 2rem;
//     }
//   }
//   .nav-links {
//     display: none;
//   }
//   .cart-btn-wrapper {
//     display: none;
//   }
//   @media (min-width: 992px) {
//     .nav-toggle {
//       display: none;
//     }
//     .nav-center {
//       display: grid;
//       grid-template-columns: auto 1fr auto;
//       align-items: center;
//     }
//     .nav-links {
//       display: flex;
//       justify-content: center;
//       li {
//         margin: 0 0.5rem;
//       }
//       a {
//         color: var(--clr-grey-3);
//         font-size: 1rem;
//         text-transform: capitalize;
//         letter-spacing: var(--spacing);
//         padding: 0.5rem;
//         &:hover {
//           border-bottom: 2px solid var(--clr-primary-7);
//         }
//       }
//     }
//     .cart-btn-wrapper {
//       display: grid;
//     }
//   }
// `
const Nav = () => {
  const { totalQty } = useCartContext();
  const { user } = useUserContext();
  return (
    <>
      <Wrapper>
        <div className="nav-items">
          <img src={logo} alt="logo"></img>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
            {user ? <Link to="/checkout">Checkout</Link> : null}
          </div>
          <CartButtons />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-color: rgb(200, 180, 150);
  .nav-items {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .nav-links {
    width: 24%;
    display: flex;
    justify-content: space-around;
  }
`;
export default Nav;
