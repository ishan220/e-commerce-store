import React, { useEffect, useContext, useReducer, useState } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

import { useFilterContext } from "./filter_context";

const CartContext = React.createContext();

const getLocalStorage = () => {
  let temp1 = localStorage.getItem("cart");
  if (temp1 != null && temp1 != 0) {
    return JSON.parse(temp1);
  } else return [];
};
const getLocalQty = () => {
  let temp = localStorage.getItem("qty");
  if (temp) {
    return JSON.parse(temp);
  } else return 0;
};

export const CartProvider = ({ children }) => {
  //   window.onbeforeunload = function() {
  //    localStorage.clear();
  // }
  const [Cart, setCart] = useState(getLocalStorage());
  const [totalQty, setTotalQty] = useState(getLocalQty());
  const { state, changeState } = useFilterContext();
  const [currentId, setCurrentId] = useState();
  const [currentQty, setCurrentQty] = useState();
  const [totalBill, setTotalBill] = useState(0);
  useEffect(() => {
    console.log();
    localStorage.setItem("cart", JSON.stringify(Cart));
    localStorage.setItem("qty", totalQty);
    let calc = 0;
    {
      Cart &&
        Cart.map((product) => {
          calc = calc + product.price * product.qty;
          return product;
        });
    }
    setTotalBill(calc);
  }, [Cart, totalQty]);

  useEffect(() => {
    setTotalQty(totalQty);
  }, [totalQty]);

  const deleteItem = (id) => {
    let tempprod = Cart.filter((item) => item.id != id);
    setCart(tempprod);
  };
  return (
    <CartContext.Provider
      value={{
        Cart,
        deleteItem,
        setCart,
        totalQty,
        setTotalQty,
        currentId,
        setCurrentId,
        setCurrentQty,
        totalBill,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// const getLocalStorage = () => {
//   let cart = localStorage.getItem('cart')
//   if (cart) {
//     return JSON.parse(localStorage.getItem('cart'))
//   } else {
//     return []
//   }
// }

// const initialState = {
//   cart: getLocalStorage(),
//   total_items: 0,
//   total_amount: 0,
//   shipping_fee: 534,
// }

// const CartContext = React.createContext()

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState)

//   // add to cart
//   const addToCart = (id, color, amount, product) => {
//     dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
//   }
//   // remove item
//   const removeItem = (id) => {
//     dispatch({ type: REMOVE_CART_ITEM, payload: id })
//   }
//   // toggle amount
//   const toggleAmount = (id, value) => {
//     console.log(id, value)
//     dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
//   }
//   // clear cart
//   const clearCart = () => {
//     dispatch({ type: CLEAR_CART })
//   }

//   useEffect(() => {
//     dispatch({ type: COUNT_CART_TOTALS })
//     localStorage.setItem('cart', JSON.stringify(state.cart))
//   }, [state.cart])

//   return (
//     <CartContext.Provider
//       value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }
// // make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
