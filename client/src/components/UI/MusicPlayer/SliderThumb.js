import React from "react";

const SliderThumb = props => {
  return (
    <div
      style={{ left: `${props.progressBarWidth - 1}%` }}
      className="sliderThumb"
    />
  );
};

export default SliderThumb;