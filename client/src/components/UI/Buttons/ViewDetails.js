import React from "react";

const ViewDetails = props => {
  return (
    <div onClick={props.click} className="view_details_btn">
      {props.title}
    </div>
  );
};

export default ViewDetails;
