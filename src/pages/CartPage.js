import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'
import { FaTrash } from 'react-icons/fa'
const CartPage = () => {
  const {Cart,totalBill,setCart,setTotalQty,deleteItem}=useCartContext();
  return (<>
  <Wrapper>
    <div className="cart-items">
      <table>
        
          <tr style={{height:"5rem"}}>
         
            <th style={{width:"50%"}}>Item</th>
            <th style={{width:"20%"}}>Price</th>
            <th style={{width:"10%"}}>Quantity </th>
            <th style={{width:"30%"}}>Sub Total</th>
            <th></th>
          </tr>
         <tr><hr style={{width:"200%"}}/> </tr>
         <br/>
        
    {Cart&&Cart.map((item)=>{
      const {qty}=item;
      const sub=item.qty*item.price;
      if(qty>0)
     {  
        return(<><tr className="cart-item" style={{height:"5rem"}}>
      <td style={{width:"100%" ,display:"grid",gridTemplateColumns:"50% 50%",placeItems:"center"}}><img style={{display:"block",width:"100%",marginLeft:"0px"}} src={item.image}/>
      <div><p style={{width:"100%"}}>{item.name}</p>
      <p>Color: <div style={{display:"inline-block",backgroundColor:item.color,width:"10px",height:"15px",borderRadius:"30%"}}></div></p>
      </div>
      </td>
      <td>${item.price}</td>
      <td style={{width:"10%"}}><div className="cart-item-qty">{item.qty}</div></td>
      <td style={{width:"30%"}}><div className="cart-item-total">{sub}</div></td>
      <td><button onClick={()=>deleteItem(item.id)} className="Warning"><FaTrash/></button></td>
      </tr>
      </>
     )
    }
   
    else
    return(<div></div>)
      
})}
{/* <tr><td>Total</td></tr> */}
 </table>
</div>
<button onClick={()=>{setCart([]);setTotalQty(0);}}>Clear Cart</button>
<div>
  <p>Total Amount:{totalBill}</p>
</div>
</Wrapper>
</>);

}
const Wrapper=styled.div`
table{
  place-items:center;
  height:80%;
  width:80%;
  margin:20px auto;
}
}
td{
  text-align:center;
}
th{
  text-align:center;
}
// .cart-items{
//   position:relative;
//   margin:20px auto 50px auto;
//   display:flex;
//   flex-direction:column;
//   justify-content:space-between;
//   align-content:center;
//   flex-wrap:wrap;
//   height: calc(100%-100px);
//   width:80%;
// }
// .cart-item{
//   display:flex;
//    height:20%;
//   width:100%;
//   flex-direction:row;
//   justify-content:space-evenly;
//   align-content:center;
// }
// .cart-item-image{
//   width:40%;
//   height:100%;
// }
// img{
//   display:block;
//   width:100%;
//   height:100%;
// }
// .cart-color{
//   width:20%;
//   height:100%;
// }
// .cart-qty{
//   width:20%;
//   height:100%;
// }


`
  // const { cart } = useCartContext()
  // if (cart.length < 1) {
  //   return (
  //     <Wrapper className='page-100'>
  //       <div className='empty'>
  //         <h2>Your cart is empty</h2>
  //         <Link to='/products' className='btn'>
  //           fill it
  //         </Link>
  //       </div>
  //     </Wrapper>
  //   )
  // }
  // return (
  //   <main>
  //     <PageHero title='cart' />
  //     <Wrapper className='page'>
  //       <CartContent />
  //     </Wrapper>
  //   </main>
  // )


// const Wrapper = styled.main`
//   .empty {
//     text-align: center;
//     h2 {
//       margin-bottom: 1rem;
//       text-transform: none;
//     }
//   }
// `

export default CartPage
