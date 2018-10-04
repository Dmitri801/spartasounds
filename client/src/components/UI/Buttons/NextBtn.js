import React from "react";
import ArrowForward from "@material-ui/icons/ArrowForward";
const NextArrowBtn = props => {
  return (
    <div className="next_btn_container">
      <div onClick={props.click} className="next_btn">
        <h1>{props.title}</h1>
        <div className="arrow_forward">
          <ArrowForward fontSize="inherit" />
        </div>
      </div>
    </div>
  );
};

export default NextArrowBtn;
