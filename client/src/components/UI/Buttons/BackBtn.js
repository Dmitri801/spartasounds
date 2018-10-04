import React from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
const BackArrowBtn = props => {
  return (
    <div className="back_btn_container">
      <div onClick={props.click} className="back_btn">
        <h1>{props.title}</h1>
        <div className="arrow_back">
          <ArrowBack fontSize="inherit" />
        </div>
      </div>
    </div>
  );
};

export default BackArrowBtn;
