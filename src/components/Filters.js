// import { initialAuthState } from '@auth0/auth0-react/dist/auth-state';
import React, { useReducer, useEffect, useState } from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
// import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from "react-icons/fa";
// import { initialAuthState } from '@auth0/auth0-react/dist/auth-state'
import { products_url as url } from "../utils/constants";

// let categories=[]
// let companies=[];
// let colors=[];

// const iniState={
//   allproducts:[],
//   filteredproducts:[],
//   category:"All",
//   company:"All",
//   color:"All",
//   price:[],
//   shipping:[]
// };

const Filters = () => {
  const {
    dispatch,
    colors,
    companies,
    categories,
    price,
    min_price,
    max_price,
    shipping,
  } = useFilterContext();
  // const filterproducts=(state)=>{
  // const tmpprod=[...state.allproducts];
  //      const {company,category,color,price}=state;
  //      if(company!='All')
  //      tmpprod=tmpprod.filter((prod)=>prod.company==company);
  //      if(category!='All')
  //      tmpprod=tmpprod.filter((prod)=>prod.category==category);
  //      if(color!='All')
  //       tmpprod=tmpprod.filter((prod)=>prod.category==category);
  //       if(price>=0)
  //        tmpprod=tmpprod.filter((prod)=>prod.price<=price);
  //        state.filteredproducts=tmpprod;
  // }
  //   // const [catState,setCatState]=useState([]);
  //   const reducer=(state,action)=>

  //   {
  //      if(action.type=='initsetting')
  //      {
  //       let tCat=[...new Set(action.payload.map((product)=>product.category))];
  //       let tcomp=[...new Set(action.payload.map((product)=>product.company))];
  //        let tcolors=[...new Set(action.payload.map((product)=>product.colors).flat())];
  //        let tprice=Math.max(...(action.payload.map((product)=>product.price)));
  //       //  let tship=action.payload.map((product)=>product.shipping)
  //       //  console.log(tprice);
  //        categories=["All",...tCat];
  //        companies=["All",...tcomp];
  //        colors=["All",...tcolors]
  //       //  console.log("inside reducer",tcolors.flat());
  //        return {...state,allproducts:action.payload,filteredproducts:action.payload};
  //      }
  //      if(action.type==='category')
  //       {  state.category=action.payload.category
  //           filterproducts(state);
  //        return{...state,category:action.payload.category}
  //       //  return {...state,products:tprod};
  //      }
  //      if(action.type==='company')
  //      {
  //        state.category=action.payload
  //           filterproducts(state);
  //        return{...state,category:action.payload};
  //      }

  //      //filtering

  //   }
  //   const [state,dispatch]=useReducer(reducer,iniState);

  //    const getProducts= async () =>
  //    { const dta=await fetch(`${url}`);
  //      const products=await dta.json();
  //       dispatch({type:'initsetting',payload:products});
  //      console.log("innside async",iniState.category)
  //    }
  //    useEffect(()=>
  //    {
  //      getProducts();
  //    },
  //    []);

  //  console.log("consol from outside",iniState.category);
  return (
    <>
      <form>
        <input
          placeholder="search"
          onChange={(e) =>
            dispatch({ type: "search", payload: e.target.value })
          }
          type="search"
        />
        <label htmlFor="category">
          <strong>Category</strong>
        </label>
        {categories.map((category) => {
          return (
            <>
              <br />
              <label htmlFor="${cat}">{category}</label>
              <span> </span>
              <input
                type="radio"
                name="category"
                onClick={() =>
                  dispatch({ type: "category", payload: { category } })
                }
              ></input>
            </>
          );
        })}
        <br></br>
        <label htmlFor="companies">
          <strong>Company</strong>
        </label>
        <br />
        <select
          name="company"
          onChange={(e) =>
            dispatch({ type: "company", payload: e.target.value })
          }
        >
          {companies.map((company) => {
            return (
              <>
                <option value={company}>{company}</option>
              </>
            );
          })}
        </select>
        <br />
        <label htmlFor="colors">
          <strong>Colors</strong>
        </label>
        <br />
        {colors.map((color) => {
          if (color == "All")
            return (
              <>
                <button
                  name="color"
                  style={{
                    background: color,
                    borderRadius: "25%",
                    width: "10%",
                    height: "10px",
                    border: "hidden",
                  }}
                  value={color}
                  onClick={(e) =>
                    dispatch({ type: "color", payload: { color } })
                  }
                >
                  All
                </button>
              </>
            );
          return (
            <>
              <button
                name="color"
                style={{
                  background: color,
                  borderRadius: "40%",
                  width: "10%",
                  height: "10px",
                }}
                value={color}
                id={`${color}`}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(e.target.value);
                  dispatch({ type: "color", payload: e.target.value });
                }}
              ></button>
            </>
          );
        })}
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          name="pricerange"
          value={price}
          type="range"
          min={min_price}
          max={max_price}
          value={price}
          onChange={(e) => {
            console.log(e.target.value);
            dispatch({ type: "price", payload: e.target.value });
          }}
        ></input>
        <br />
        <label htmlFor="shipping">Free Shipping</label>
        <span> </span>
        <input
          type="checkbox"
          name="shipping"
          onChange={(e) => dispatch({ type: "shipping" })}
        />
        <br />
        <button className="warning" onClick={() => dispatch({ type: "reset" })}>
          Clear Filters
        </button>
      </form>
    </>
  );
};

// const Filters = () => {
//   const {
//     filters: {
//       text,
//       category,
//       company,
//       color,
//       min_price,
//       price,
//       max_price,
//       shipping,
//     },
//     updateFilters,
//     clearFilters,
//     all_products,
//   } = useFilterContext()

//   const categories = getUniqueValues(all_products, 'category')
//   const companies = getUniqueValues(all_products, 'company')
//   const colors = getUniqueValues(all_products, 'colors')

//   return (
//     <Wrapper>
//       <div className='content'>
//         <form onSubmit={(e) => e.preventDefault()}>
//           {/* search input */}
//           <div className='form-control'>
//             <input
//               type='text'
//               name='text'
//               placeholder='search'
//               className='search-input'
//               value={text}
//               onChange={updateFilters}
//             />
//           </div>
//           {/* end search input */}
//           {/* categories */}
//           <div className='form-control'>
//             <h5>category</h5>
//             <div>
//               {categories.map((c, index) => {
//                 return (
//                   <button
//                     key={index}
//                     onClick={updateFilters}
//                     type='button'
//                     name='category'
//                     className={`${
//                       category === c.toLowerCase() ? 'active' : null
//                     }`}
//                   >
//                     {c}
//                   </button>
//                 )
//               })}
//             </div>
//           </div>
//           {/* end of categories */}
//           {/* companies */}
//           <div className='form-control'>
//             <h5>company</h5>
//             <select
//               name='company'
//               value={company}
//               onChange={updateFilters}
//               className='company'
//             >
//               {companies.map((c, index) => {
//                 return (
//                   <option key={index} value={c}>
//                     {c}
//                   </option>
//                 )
//               })}
//             </select>
//           </div>
//           {/* end of companies */}
//           {/*
//           colors
//           */}
//           <div className='form-control'>
//             <h5>colors</h5>
//             <div className='colors'>
//               {colors.map((c, index) => {
//                 if (c === 'all') {
//                   return (
//                     <button
//                       key={index}
//                       name='color'
//                       onClick={updateFilters}
//                       data-color='all'
//                       className={`${
//                         color === 'all' ? 'all-btn active' : 'all-btn'
//                       }`}
//                     >
//                       all
//                     </button>
//                   )
//                 }
//                 return (
//                   <button
//                     key={index}
//                     name='color'
//                     style={{ background: c }}
//                     className={`${
//                       color === c ? 'color-btn active' : 'color-btn'
//                     }`}
//                     data-color={c}
//                     onClick={updateFilters}
//                   >
//                     {color === c ? <FaCheck /> : null}
//                   </button>
//                 )
//               })}
//             </div>
//           </div>
//           {/*
// end of           colors
//           */}
//           {/* price */}
//           <div className='form-control'>
//             <h5>price</h5>
//             <p className='price'>{formatPrice(price)}</p>
//             <input
//               type='range'
//               name='price'
//               min={min_price}
//               max={max_price}
//               onChange={updateFilters}
//               value={price}
//             />
//           </div>
//           {/* end of price */}
//           {/* shippping */}
//           <div className='form-control shipping'>
//             <label htmlFor='shipping'> free shipping</label>
//             <input
//               type='checkbox'
//               name='shipping'
//               id='shipping'
//               onChange={updateFilters}
//               checked={shipping}
//             />
//           </div>
//           {/* end of  shippping */}
//         </form>
//         <button type='button' className='clear-btn' onClick={clearFilters}>
//           {' '}
//           clear filters
//         </button>
//       </div>
//     </Wrapper>
//   )
// }

// const Wrapper = styled.section`
//   .form-control {
//     margin-bottom: 1.25rem;
//     h5 {
//       margin-bottom: 0.5rem;
//     }
//   }
//   .search-input {
//     padding: 0.5rem;
//     background: var(--clr-grey-10);
//     border-radius: var(--radius);
//     border-color: transparent;
//     letter-spacing: var(--spacing);
//   }
//   .search-input::placeholder {
//     text-transform: capitalize;
//   }

//   button {
//     display: block;
//     margin: 0.25em 0;
//     padding: 0.25rem 0;
//     text-transform: capitalize;
//     background: transparent;
//     border: none;
//     border-bottom: 1px solid transparent;
//     letter-spacing: var(--spacing);
//     color: var(--clr-grey-5);
//     cursor: pointer;
//   }
//   .active {
//     border-color: var(--clr-grey-5);
//   }
//   .company {
//     background: var(--clr-grey-10);
//     border-radius: var(--radius);
//     border-color: transparent;
//     padding: 0.25rem;
//   }
//   .colors {
//     display: flex;
//     align-items: center;
//   }
//   .color-btn {
//     display: inline-block;
//     width: 1rem;
//     height: 1rem;
//     border-radius: 50%;
//     background: #222;
//     margin-right: 0.5rem;
//     border: none;
//     cursor: pointer;
//     opacity: 0.5;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     svg {
//       font-size: 0.5rem;
//       color: var(--clr-white);
//     }
//   }
//   .all-btn {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-right: 0.5rem;
//     opacity: 0.5;
//   }
//   .active {
//     opacity: 1;
//   }
//   .all-btn .active {
//     text-decoration: underline;
//   }
//   .price {
//     margin-bottom: 0.25rem;
//   }
//   .shipping {
//     display: grid;
//     grid-template-columns: auto 1fr;
//     align-items: center;
//     text-transform: capitalize;
//     column-gap: 0.5rem;
//     font-size: 1rem;
//   }
//   .clear-btn {
//     background: var(--clr-red-dark);
//     color: var(--clr-white);
//     padding: 0.25rem 0.5rem;
//     border-radius: var(--radius);
//   }
//   @media (min-width: 768px) {
//     .content {
//       position: sticky;
//       top: 1rem;
//     }
//   }
// `

export default Filters;
