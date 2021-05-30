import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import { products_url as url } from '../utils/constants'
import {Filters} from '../components'
// import {
//   LOAD_PRODUCTS,
//   SET_GRIDVIEW,
//   SET_LISTVIEW,
//   UPDATE_SORT,
//   SORT_PRODUCTS,
//   UPDATE_FILTERS,
//   FILTER_PRODUCTS,
//   CLEAR_FILTERS,
// } from '../actions'

let categories=[]
let companies=[];
let colors=[];

const iniState={
  allproducts:[],
  filteredproducts:[],
  category:"All",
  company:"All",
  color:"All",
  min_price:0,
  price:0,
  max_price:0,
  shipping:false
};
const FilterContext=React.createContext();

export const FilterProvider= ({children}) =>{

const filterproducts=(state,value)=>{
      console.log("in func filter prod",value,state);
     let tmpprod=[...state.allproducts];
     const {company,category,color,price,shipping}=state;
     
     if(company!='All')
     tmpprod=tmpprod.filter((prod)=>prod.company==company);

     if(category!='All')
     tmpprod=tmpprod.filter((prod)=>prod.category==category);

     if(color!='All')
      tmpprod=tmpprod.filter((prod)=>prod.colors.includes(color));

      if(price>=0)
       tmpprod=tmpprod.filter((prod)=>prod.price<=price);

       if(shipping)
        tmpprod=tmpprod.filter((prod)=>prod.shipping==true);

        if(value!="")
        {
          tmpprod=tmpprod.filter((prod)=>prod.name.startsWith(value.toLowerCase()));
        }
         if(tmpprod)
       state.filteredproducts=tmpprod;
       else
        state.filteredproducts=[];
}
  // const [catState,setCatState]=useState([]);
  const reducer=(state,action)=>
  
  {
     if(action.type=='initsetting')
     {
      let tCat=[...new Set(action.payload.map((product)=>product.category))];
      let tcomp=[...new Set(action.payload.map((product)=>product.company))];
       let tcolors=[...new Set(action.payload.map((product)=>product.colors).flat())];
       let tmaxprice=Math.max(...(action.payload.map((product)=>product.price)));
       let tminprice=Math.min(...(action.payload.map((product)=>product.price)));
      //  let tship=action.payload.map((product)=>product.shipping)
      //  console.log(tprice);
       categories=["All",...tCat];
       companies=["All",...tcomp];
       colors=["All",...tcolors]
      console.log("inside reducer",action.payload);
       return {...state, allproducts:[...action.payload], filteredproducts:[...action.payload],max_price:tmaxprice,min_price:tminprice,price:tmaxprice};
     }

     if(action.type==='category')
      {  state.category=action.payload.category;
          filterproducts(state,'');
       return{...state,category:action.payload.category}
      //  return {...state,products:tprod};
     }
     if(action.type==='company')
     {
       state.company=action.payload;
       console.log("company in reducer",action.payload)
          filterproducts(state,'');
       return{...state};
     }
     if(action.type==='color')
     {
       state.color=action.payload;
       console.log("color in reducer",action.payload)
          filterproducts(state,'');
       return{...state}; 
     }
     if(action.type==='price')
     {
       state.price=action.payload;
       filterproducts(state,'');
       return {...state};
     }
     if(action.type==='shipping')
     {
       state.shipping=!state.shipping;
       console.log(state.shipping);
       filterproducts(state,'');
       return {...state};
     }
     if(action.type == "search")
     {    console.log(action.payload);
          filterproducts(state,action.payload);
          return  {...state};
     }
     if(action.type == 'reset')
     {
        return {...state,filteredProducts:state.allproducts,category:"All",company:"All",color:"All",price:state.max_price}
     }
  }
  const [state,dispatch]=useReducer(reducer,iniState);

   const getProducts= async () =>
   { const dta=await fetch(`${url}`);
     const products=await dta.json();
      dispatch({type:'initsetting',payload:products});
    //  console.log("innside async",state.allproducts)
   }
   const changeState=(prop)=>{
     state.allproducts=prop;
   }
   useEffect(()=>
   {
     getProducts();
   },
   [] );
  //  console.log("console outside",state.filteredproducts)
   return (<>
   <FilterContext.Provider value={{state,dispatch,categories,companies,colors,changeState}}>
     {children}
   </FilterContext.Provider>
   </>);

  }
  export const useFilterContext=()=>
  {
    return useContext(FilterContext);
  }















// import { useProductsContext } from './products_context'

// const initialState = {
//   filtered_products: [],
//   all_products: [],
//   grid_view: true,
//   sort: 'price-lowest',
//   filters: {
//     text: '',
//     company: 'all',
//     category: 'all',
//     color: 'all',
//     min_price: 0,
//     max_price: 0,
//     price: 0,
//     shipping: false,
//   },
// }

// const FilterContext = React.createContext()

// export const FilterProvider = ({ children }) => {
//   const { products } = useProductsContext()
//   const [state, dispatch] = useReducer(reducer, initialState)

//   useEffect(() => {
//     dispatch({ type: LOAD_PRODUCTS, payload: products })
//   }, [products])

//   useEffect(() => {
//     dispatch({ type: FILTER_PRODUCTS })
//     dispatch({ type: SORT_PRODUCTS })
//   }, [products, state.sort, state.filters])

//   const setGridView = () => {
//     dispatch({ type: SET_GRIDVIEW })
//   }
//   const setListView = () => {
//     dispatch({ type: SET_LISTVIEW })
//   }
//   const updateSort = (e) => {
//     // for demonstration
//     // const name = e.target.name
//     const value = e.target.value
//     dispatch({ type: UPDATE_SORT, payload: value })
//   }
//   const updateFilters = (e) => {
//     let name = e.target.name
//     let value = e.target.value
//     if (name === 'category') {
//       value = e.target.textContent
//     }
//     if (name === 'color') {
//       value = e.target.dataset.color
//     }
//     if (name === 'price') {
//       value = Number(value)
//     }
//     if (name === 'shipping') {
//       value = e.target.checked
//     }
//     dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
//   }
//   const clearFilters = () => {
//     dispatch({ type: CLEAR_FILTERS })
//   }
//   return (
//     <FilterContext.Provider
//       value={{
//         ...state,
//         setGridView,
//         setListView,
//         updateSort,
//         updateFilters,
//         clearFilters,
//       }}
//     >
//       {children}
//     </FilterContext.Provider>
//   )
// }
// // make sure use
// export const useFilterContext = () => {
//   return useContext(FilterContext)
// }
