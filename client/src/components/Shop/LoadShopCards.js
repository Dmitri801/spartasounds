import React from 'react'
import CardBlockShop from '../UI/Cards/Card_Block_Shop';
const LoadShopCards = (props) => {
  return (
    <div>
      <div className="shop_container">
          <CardBlockShop
           grid={props.grid}
           list={props.list}
          />
      </div>
      <h1>Load More</h1>
    </div>
  )
}

export default LoadShopCards;
