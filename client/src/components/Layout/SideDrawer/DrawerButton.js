import React from "react";

const DrawerButton = props => {
  return (
    <button onClick={props.click} className="toggle_button">
      <div className="toggle_button_line" />
      <div className="toggle_button_line" />
      <div className="toggle_button_line" />
    </button>
  );
};

export default DrawerButton;
 