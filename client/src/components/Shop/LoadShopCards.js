import React from "react";
import CardBlockShop from "../UI/Cards/Card_Block_Shop";
const LoadShopCards = props => {
  return (
    <div>
      <div className="shop_container">
        <CardBlockShop grid={props.grid} list={props.list} />
      </div>

      {props.size > 0 && props.size >= props.limit ? (
        <div>
          <hr className="shopCards_hr" />
         
          <div className="load_more_container">
            <span onClick={() => props.loadMore()}>Load More</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LoadShopCards;
