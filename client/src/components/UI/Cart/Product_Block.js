import React from "react";
import TrashIcon from "@material-ui/icons/Delete"
const comingSoonImage = require("../../../resources/Images/coming_soon_cartsize.png");
const CartProductBlock = ({ products, removeItem, location }) => {
  const renderCartImage = images => {
    if (images.length > 0 && images[2]) {
      return images[2].url;
    } else {
      return comingSoonImage;
    }
  };

  const renderItems = () => {
    return products
      ? products.map(product => (
          <div key={product._id} className="cart_product_block">
            <div className="cart_item">
              <div
                style={{
                  background: `url(${renderCartImage(
                    product.images
                  )}) no-repeat` 
                }}
                className="cart_image"
              />
              <div className="name">
               {product.name}
              </div>
              <div className="end_container">
               <span className="price">${product.price}</span>
               <TrashIcon />
              </div>
            </div>
          </div>
        ))
      : null;
  };
  return <div>{renderItems()}</div>;
};

export default CartProductBlock;
