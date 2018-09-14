import React from "react";

const Filler = props => {
  return (
    <div style={{ width: `${props.progressBarWidth}%` }} className="filler" />
  );
};

export default Filler;