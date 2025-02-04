// import React, { useContext, useEffect, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../Context/StoreContext";
// import axios from "axios";

// function PlaceOrder() {

//   const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (event)=>{
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data=>({...data,[name]:value}))
//   }
//  const placeOrder = async(event)=>{
//   event.preventDefault();
//   let orderItems = [];
//   food_list.map((item)=>{
//     if(cartItems[item._id]>0){
//       let itemInfo = item;
//       itemInfo["quantity"] = cartItems[item._id];
//       orderItems.push(itemInfo)
//     }
//   })
//   let orderData = {
//     address:data,
//     items:orderItems,
//     amount:getTotalCartAmount()+2,
//   }
//   let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
//   if (response.data.success) {
//     const {session_url} = response.data;
//     window.location.replace(session_url); 
//   }
//   else{
//     alert("error");  
//   }
// }

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
//           <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="last name" />
//         </div>
//         <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
//         <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
//         <div className="multi-fields">
//           <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
//           <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
//         </div>
//         <div className="multi-fields">
//           <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
//           <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
//         </div>
//         <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//           <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>$ {getTotalCartAmount() === 0 ? 0 : 100}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>
//                 $ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100}
                
//               </b>
//             </div>
//           </div>
//           <button type="submit">PROCEED TO Payment</button>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default PlaceOrder;

import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      // Collect order items
      let orderItems = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item, quantity: cartItems[item._id] };
          orderItems.push(itemInfo);
        }
      });

      if (orderItems.length === 0) {
        return alert("Your cart is empty.");
      }

      // Construct order data
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 100, // Assuming a $100 delivery fee
      };

      // Send order request
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Redirect to payment session
      } else {
        alert("Order placement failed.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again.");
    }
  };

  const navigate = useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount() === 0 ? 0 : 100}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;

