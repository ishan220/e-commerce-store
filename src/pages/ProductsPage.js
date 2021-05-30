import React, {  useEffect,useReducer }from 'react'
import styled from 'styled-components'
import { Filters, ProductList, Sort, PageHero } from '../components'
import { products_url as url } from '../utils/constants'
import { useState } from 'react'
import { BsFillGridFill, BsList } from 'react-icons/bs'
 import {useFilterContext} from '../context/filter_context'
import {Link} from 'react-router-dom'
 
const initialState={sortedProducts:[]};

const ProductsPage = () => {
  const {state}=useFilterContext();
  // const {filteredproducts,allproducts}=useFilterContext();
  initialState.sortedProducts=state.filteredproducts;
   console.log("prodpage",initialState.sortedProducts);
  const [sortOption,setSortOption]=useState('pricelowest');
  const reducer=(redstate,action)=>{

         if(action.type=='productsfetch')
         {
           return {...redstate,sortedProducts:action.payload};
        }
         

         if(action.type=='pricelowest')
          {
            redstate.sortedProducts= redstate.sortedProducts.sort((a,b)=>{
              const price1=a.price;
              const price2=b.price; 
              return price1-price2;
             }
              )
              
              return {...redstate,sortedProducts:redstate.sortedProducts};
             
          }

       else if(action.type=='pricehighest')
        {
             redstate.sortedProducts= redstate.sortedProducts.sort((a,b)=>{
              const price1=a.price;
              const price2=b.price; 
              return price2-price1;}
              )
             
              return {...redstate,sortedProducts:redstate.sortedProducts};
        }

      else  if(action.type=='A_Z')
        {
                redstate.sortedProducts=redstate.sortedProducts.sort((a,b)=>{
              const name1=a.name;
              const name2=b.name; 
              return name1.localeCompare(name2);}
              )
      
             
              return {...redstate,sortedProducts:redstate.sortedProducts};
        }

       else if(action.type=='Z_A')
        {
            redstate.sortedProducts=redstate.sortedProducts.sort((a,b)=>{
              const name1=a.name;
              const name2=b.name; 
              return name2.localeCompare(name1);}
              )
              
              return {...redstate,sortedProducts:redstate.sortedProducts};
        }
        else
        throw new Error("this type of action is not found");
      }

   
  
   const [redstate,dispatch]=useReducer(reducer,initialState);
   if(state.filteredproducts)
   {redstate.sortedProducts=state.filteredproducts;}
     
 
 const handleSort=(e)=>{
     e.preventDefault();
    setSortOption(e.target.value);
    console.log(sortOption);
      dispatch({type:e.target.value});
  
  }

  
  console.log("productsinprodpage:",initialState.sortedProducts);
  useEffect(()=>{
    dispatch({type:'pricelowest'});
  },[]);

  useEffect(()=>{
    dispatch({type:document.getElementById('sort-value').value});
  },[state.filteredproducts])
      
  return(
     <Wrapper>
      <div><Filters/></div>
      <div className='products'>
         <div className='products-heading'>
           <div className='btn-container'>
            <button><BsFillGridFill/></button>
             <button><BsList/> </button>
           </div>
          <div ><p>{redstate.sortedProducts&&redstate.sortedProducts.length}  Products Found</p></div>
          <div className='underline'></div>
          <div className='product-sort'>
         
              <form >
                   <label htmlFor='sort' className='sort-text'>Sort By</label>
                <select name='sortname' id="sort-value" onChange={handleSort}>
                <option value='pricelowest'>Price(Lowest)</option>
                <option value='pricehighest'>Price(Highest)</option>
                <option value='A_Z'>Name(A-Z)</option>
                <option value='Z_A'>Name(Z-A)</option>
                </select>        
              </form>

          </div>
     </div>

       <div className='product-list'>
            { redstate.sortedProducts && redstate.sortedProducts.map((product,index)=>{
               const {id,image,name,price} = product;
               return (<article className='product'>
                <img className='product-image' src={image}></img>
               <div className='product-info'>
                 <h4>{name}</h4>
                 <p>${price}</p>
               </div>
               <button ><Link to={`/products/${id}`}>More details</Link></button>
               </article>);
         
              }
              )
              
              }
      </div>

    </div>
    </Wrapper>
  );
  // return (
  //   <main>
  //     <PageHero title='products' />
  //     <Wrapper className='page'>
  //       <div className='section-center products'>
  //         <Filters />
  //         <div>
  //           <Sort />
  //           <ProductList />
  //         </div>
  //       </div>
  //     </Wrapper>
  //   </main>
  // )
}
const Wrapper=styled.div`
 height:65%;
 display:grid;
 grid-template-columns:200px auto;
.products-heading{
  display:flex;
  justify-content:space-around;
}
.product-list{
display:grid;
grid-template-columns:30% 30% 30%;
gap:3%;
}
.product{
  width:100%;
  height:300px;
}
.product-image{
  width:100%;
  height:80%;
}
.product-info{
  display:flex;
  justify-content:space-between;

}
`

// const Wrapper = styled.div`
//   .products {
//     display: grid;
//     gap: 3rem 1.5rem;
//     margin: 4rem auto;
//   }
//   @media (min-width: 768px) {
//     .products {
//       grid-template-columns: 200px 1fr;
//     }
//   }
// `

export default ProductsPage
