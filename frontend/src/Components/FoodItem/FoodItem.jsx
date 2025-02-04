// It is The Cart Structure
//Items Inside the Cart

import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

function FoodItem({id, name, description, price, image}) {

  // When we click + It is creating one itemCount variable for each count. That is not a best practice.
  const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

  return (
    // Cart Structure
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} alt="" className="food-item-image" />
        {!cartItems[id]
          ? <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" className='add' />
          : <div className="food-item-counter">
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      {/* Food Item Info */}
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name} </p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description} </p>
        <p className="food-item-price">Rs.{price} </p>
      </div>
    </div>
  )
}

export default FoodItem
