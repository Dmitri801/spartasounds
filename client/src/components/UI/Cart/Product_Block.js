import React from "react";
const comingSoonImage = require("../../../resources/Images/coming_soon_detail.png");
const CartProductBlock = ({ products, removeItem, location }) => {
  const renderCartImage = images => {
    if (images.length > 0) {
      return images[1].url;
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
            </div>
          </div>
        ))
      : null;
  };
  return <div>{renderItems()}</div>;
};

export default CartProductBlock;
