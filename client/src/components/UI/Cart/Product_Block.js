import React from "react";

const CartProductBlock = ({ products, removeItem, location }) => {
  const renderItems = () => {
    return products
      ? products.map(product => (
          <div key={product._id} className="cart_product_block">
            {product.name}
          </div>
        ))
      : null;
  };
  return <div>{renderItems()}</div>;
};

export default CartProductBlock;
