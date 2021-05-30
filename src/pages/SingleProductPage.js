import React, { useEffect,useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import { FaPlus, FaMinus } from 'react-icons/fa'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {useFilterContext} from '../context/filter_context'
import cart_reducer from '../reducers/cart_reducer'
import {useCartContext} from '../context/cart_context'
const getLocalStorage=()=>
{
  let temp=localStorage.getItem('stock');
  if(temp)
  return temp;
  else
  return ;
}
const SingleProductPage = () => {

  const [prodCount,setProdCount]=useState(0);
  const [stock,setStock]=useState();
  const [color,setColor]=useState();
  const [loading,setLoading]=useState(true);
 const [prod,setProd]=useState();
 const {allproducts}=useFilterContext();
 const [price,setPrice]=useState();
 const { id } = useParams();
 const product=[];
  const {Cart,setCart,totalQty,setTotalQty,currentId,setCurrentId,setCurrentQty}=useCartContext();
  
  const addProduct=(id,color,qty)=>
  { 
    
    // console.log("in add img",prod.images[0].url)
    if(Cart.length>0)
    {
     const check= Cart.find((item)=>item.id==id+color)
      if(!check)
     {setCart([...Cart,{id:id+color,color:color,image:prod.images[0].url,qty:qty,stock:stock,price:price,name:prod.name}]);
     setCurrentId(id);
     setCurrentQty(qty);
     setTotalQty((totalQty)=>totalQty+qty);
      }
     }

else
    {
      setCart([{id:id+color,color:color,image:prod.images[0].url,qty:qty,price:price,name:prod.name}]);
      console.log("price,cartandqty",price,qty)
      console.log(Cart);
       setCurrentId(id);
     setCurrentQty(qty);
     setTotalQty((totalQty)=>totalQty+qty);
    }
  }
const addItem=()=>{
  if(prodCount<stock+prodCount)
  {
    setProdCount(prodCount+1);
    setStock(stock-1);
  }
}
const subItem=()=>{
  if(prodCount>0)
  {
    setProdCount(prodCount-1);
    setStock(stock+1);
  }
}
const colorSelected=(value)=>
{
  setColor(value);
}

  

 const fetchSingleProduct=async()=>{
   try{
    const dta=await fetch(`${url}${id}`);
    const product=await dta.json();
    console.log(product);
     setProd(product);
     setStock(product.stock);
    //  console.log("priceinfetch",product.price);
     setPrice(product.price)
     if(product.colors&&product.colors.length>0)
     setColor(product.colors[0]);
     setLoading(false);
 
  }

  catch(error)
  {
    console.log(error);
  }
 }
 useEffect(()=>{
   fetchSingleProduct();
 },[id]);
 useEffect(()=>{
   localStorage.setItem('stock',JSON.stringify(stock));
 },[stock])
// console.log("items in cart",Cart.image);
// console.log("Cart",Cart);

   if(loading)
   return (<><div>Loading..</div></>)
  else
  {
    return (<>
         <Wrapper>
         <div className='product'> 
         <div className="prod-image">
           <img  className='main-img' src={`${prod.images[0].url}`}/>
          <div className="side-images">
          <img  className='side-img' src={prod.images[0].url}/>
          <img  className='side-img' src={prod.images[1].url}/>
          <img  className='side-img' src={prod.images[2].url}/>
          <img  className='side-img' src={prod.images[3].url}/>
          <img  className='side-img' src={prod.images[4].url}/> 
          </div>
           

        </div>
      
        <div className='prod-info'>
          <h3>{prod.name}</h3>
          {/* stars reviews to be made */}
           <p>${prod.price}</p>
          <p>{prod.description}</p>
          <p>Available:   In Stock</p>
          <p>SKU:    {id} </p>
          <p>Brand:  {prod.company}</p>
          <p>Qty In Stock: {stock}</p>
          {/* <p>Stock: {stock}</p>?"In Stock":"Out Of Stock"}</p> */}
          <div style={{height:"2px",borderBottom:"1px solid black"}}></div>
          <p>Colors: {prod.colors&&prod.colors.map((color)=>{return (<button onClick={()=>colorSelected(color)} style={{height:"10px",width:"10%",background:`${color}`}}></button>)})}</p>
          
          <AddToCart {...prod} addProduct={addProduct} stock={stock} color={color} subItem={subItem} price={price} addItem={addItem} prodCount={prodCount}></AddToCart>
        </div>

   </div>  
     </Wrapper>
   </>);  
  }
}
     
//   const history = useHistory()
//   const {
//     single_product_loading: loading,
//     single_product_error: error,
//     single_product: product,
//     fetchSingleProduct,
//   } = useProductsContext()

//   useEffect(() => {
//     fetchSingleProduct(`${url}${id}`)
//     // eslint-disable-next-line
//   }, [id])

//   useEffect(() => {
//     if (error) {
//       setTimeout(() => {
//         history.push('/')
//       }, 3000)
//     }
//     // eslint-disable-next-line
//   }, [error])

//   if (loading) {
//     return <Loading />
//   }
//   if (error) {
//     return <Error />
//   }
//   const {
//     name,
//     price,
//     description,
//     stock,
//     stars,
//     reviews,
//     id: sku,
//     company,
//     images,
//   } = product
//   return (
//     <Wrapper>
//       <PageHero title={name} product />
//       <div className='section section-center page'>
//         <Link to='/products' className='btn'>
//           back to products
//         </Link>
//         <div className=' product-center'>
//           <ProductImages images={images} />
//           <section className='content'>
//             <h2>{name}</h2>
//             <Stars stars={stars} reviews={reviews} />
//             <h5 className='price'> {formatPrice(price)}</h5>
//             <p className='desc'> {description}</p>
//             <p className='info'>
//               <span>Available : </span>
//               {stock > 0 ? 'In stock' : 'out of stock'}
//             </p>
//             <p className='info'>
//               <span>SKU : </span>
//               {sku}
//             </p>
//             <p className='info'>
//               <span>Brand : </span>
//               {company}
//             </p>
//             <hr />
//             {stock > 0 && <AddToCart product={product} />}
//           </section>
//         </div>
//       </div>
//     </Wrapper>
//   )


// const Wrapper = styled.main`
//   .product-center {
//     display: grid;
//     gap: 4rem;
//     margin-top: 2rem;
//   }
//   .price {
//     color: var(--clr-primary-5);
//   }
//   .desc {
//     line-height: 2;
//     max-width: 45em;
//   }
//   .info {
//     text-transform: capitalize;
//     width: 300px;
//     display: grid;
//     grid-template-columns: 125px 1fr;
//     span {
//       font-weight: 700;
//     }
//   }

//   @media (min-width: 992px) {
//     .product-center {
//       grid-template-columns: 1fr 1fr;
//       align-items: center;
//     }
//     .price {
//       font-size: 1.25rem;
//     }
//   }
// `
const Wrapper=styled.div`
.product{
  margin:5% auto;
  width:90%;
  height:90%;
  display:grid;
  grid-template-columns:50% 50%;
  
}
.main-img{
  width:100%;
  height:70%;
  border-radius:10px;
  border:2px solid #adeffh;
}
.side-images{
  display:flex;
  justify-content:space-between;
  align-content:center;
  align-items:stretch;
}
.side-img{
  width:15%;
  height:30%;
  border-radius:20px;
}
.prod-info{
  width:100%;
  padding-left:10px;
}

`
export default SingleProductPage
