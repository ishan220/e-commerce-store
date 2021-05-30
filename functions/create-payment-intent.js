// domain/.netlify/functions/create-payment-intent
//  require('dotenv').config()
//  const stripe=require('stripe')("sk_test_51Iv4hFSDeULngt3YUDJvh1YmuuV2WHQt27bOzDXUlRlfS71UapqMz6FY7qJmbdJP1rYhp8mQDVqQbEPShUvPFcIb009GJoRJws")
// exports.handler=async function(event,context) 
// {
//   console.log(event);
//   if(event.body)
//    {
//     const {Cart,totalBill}=JSON.parse(event.body);
//     try{
//       const paymentIntent=await stripe.paymentIntents.create({
//        amount:totalBill,
//        currency:'usd',
//       })
//       return {
//         statusCode:200,
//         body:JSON.stringify({clientSecret:paymentIntent.client_secret}),
//       }
//     }
//     catch(error)
//     {
//       return {
//          statusCode: 500,
//          body: JSON.stringify({ msg: error.message }),
//        }
//     }

// }
 
//   return 
//    {
//      statusCode: 200,
//      body:'Create Payment Intent'
//    }

  
// }
require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_AUTH_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  if (event.body) {
    const { Cart,totalBill } = JSON.parse(event.body)

    const calculateOrderAmount = () => {
      return totalBill;
    }
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        shipping: {
    name: 'Jenny Rosen',
    address: {
      line1: '510 Townsend St',
      postal_code: '98140',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
    },
  },
  

        amount: calculateOrderAmount(),
        currency: 'usd',
        description: 'Software development services',
      })
      console.log(paymentIntent);
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      }
    }
  }
   return {
     statusCode: 200,
     body: 'Create Payment Intent',
   }
}
