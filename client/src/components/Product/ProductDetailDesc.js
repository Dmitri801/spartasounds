import React from "react";

const ProductDetailDesc = ({ kit }) => {
  const kitDescriptionArr = kit.description.split(/[.]/);
  const firstSentence = kitDescriptionArr[0];
  kitDescriptionArr.shift();
  const descriptionBod = kitDescriptionArr.join('.')
  return (
    <div className="description_container">
      <div className="desc_gutter" />
      <div className="desc_content">
        <p><span>{firstSentence}.</span>
         {descriptionBod}
        </p>
        <hr />

        <ul>
          <li>
            <span>Sample Length: {kit.sampleLength}</span>
          </li>
        </ul>
      </div>
      <div className="desc_gutter" />
    </div>
  );
};

export default ProductDetailDesc;
