import React, { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import { FeaturedProducts, Hero, Services, Contact } from '../components'
import styled from 'styled-components'
import heroBcg from '../assets/hero-bcg.jpeg'
import heroBcg2 from '../assets/hero-bcg-2.jpeg'
import { services } from '../utils/constants'
import { products_url as url } from '../utils/constants'
//ClientID: Jxml9VUkd7V4cQpSgWtH69pqyRM9LCy9
//Domain:dev-lyif94d1.eu.auth0.com
// const HomePage = () => {

  // return (



















  //   <main>
  //     <Hero />
  //     <FeaturedProducts />
  //     <Services />
  //     <Contact />
  //   </main>
  // )
// }
const HomePage=()=>{
  const [featuredProducts,setFeaturedProducts]=useState([]);
  const getfeaturedProducts=async()=>{
      try
        { const data=await fetch(url);
          const Products=await data.json();
          const featuredProducts=Products.filter((product)=>product.featured==true);
          setFeaturedProducts(featuredProducts);
        }
        catch(error)
        {
          console.log(error);
        }
  }
  useEffect(()=>{
   getfeaturedProducts();
  },[])
  return(
  <Wrapper>
   <div className='home-container'>
   <br></br>
   <div className='hero-content'>

     <div className='hero-text'>
    <h1>Design Your Comfort Zone</h1>
    <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?</p>
    <button>Shop Now</button>
    </div>

   <div className='image-container'>
    
      <img src={heroBcg} alt='nice table' className='main-img' />
      <img src={heroBcg2} alt='person working' className='accent-img' />
   </div>

</div>
  
  <div className='featured-products'>
     <div className='heading'>
      <h3>Featured Products</h3>
     </div>

     <div className='featured-images'>
      {featuredProducts.slice(0,3).map((product,index)=>{
        return (<div className={`featured-img`} key={index}><img src={product.image} alt={`${product.name}`}/><div className="featured-text"><h3>{product.name}</h3><h3> ${product.price}</h3></div></div>);
      })}
     </div>
     <button className='prod-btn'><Link to="/products">All Products</Link></button>

  </div>

  <div className="services">

           <h3 className='service-heading'>
             custom furniture <br />
             built only for you
           </h3>
           <p className='service-txt'>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
             quisquam saepe id reiciendis sunt, repudiandae libero amet rem quia
             quod?
           </p>

           {services.map((service,index)=>{
             const{icon,title,text}=service;
             return (<div className='service-item'>
               <div className='service-img'>{icon}</div>
               <div className='service-title'>{title}</div>
               <div className='service-text'>{text}</div>
             </div>);
           }
           )
           }

  </div>

  <div className='contact'>
   <h3>Join our newsletter and get 20% off</h3>
   <div className='contact-text'>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat ratione soluta veniam provident adipisci cumque eveniet tempore?</p>
     <form action="https://formspree.io/f/xnqlpelp" method="POST">
    <input type='email'  name="_replyto" Email placeholder='Enter Email'/>
    <span><button type='submit' className='contact-btn'>Subscribe</button></span>
     </form>
   </div>
  </div>

</div>
</Wrapper>
  );
}
const Wrapper=styled.div`
.home-container{
background-color:white;
height:300vh;
display:block;
position:relative;
align-content:center;
align-items:center;

}
.hero-content {
  background-color:rgb(183,209,15);
  position:relative;
  display:flex;
  height:28%;
  width:100%;
  place-items:center;
  
}
.hero-text{
  width:40%
  height:50%;
  padding-left:2rem;
}
.image-container
{ position:relative;
  width:50%;
  height:80%;
 
}

.main-img
{
  position:relative;
  width:100%;
  height:80%;
  object-fit:contain;
   border-radius:311px;
}
.accent-img{
position:absolute;
left:0;
bottom:0;
width:60%;
height:50%;
border-radius:40px;
}
.featured-products{
  padding:0px 50px;
  display:block;
  height:30%;
  background-color:#f1f5f8;
  
  flex-direction:row;
  flex-wrap:wrap;
}
.heading{
  padding-top:2rem;
  text-align:center;
  height:10%;
}
.featured-images{
  padding-top:2rem;
display:flex;
justify-content:space-between;
flex-direction:row;
height:80%;
flex-wrap:wrap;
gap:10%;
justify-items:stretch;
}

.featured-img{
  width:40%;
  height:40%;
  object-fit:contain;
}
img{
  height:80%;
  width:100%;
}
.featured-text{
  display:flex;
  justify-content:space-between;
}
.prod-btn{
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  margin:0px auto;
}

.services{
  padding:0px 50px;
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:space-between;
  justify-items:stretch;
  align-items:center;
  background-color: #eaded7;
  height:20%;
}
.service-heading{
  width:40%;
}
.service-txt{
  width:40%;
}

.service-item{
  width:40%;
}
.service-img{width:100%;}
.service-title{width:100%;}
.service-text{width:100%}
.contact>h3{
  padding:20px;
  text-align:center;
}
.contact-text{
  display:flex;
  align-items:center;
  height:80%;
}
.contact-text>p{
  width:50%;
}
form{
  width:50%;
}
.contact{
  height:15%;
}
.contact-text>input{
  width:60%;
}
`
export default HomePage
