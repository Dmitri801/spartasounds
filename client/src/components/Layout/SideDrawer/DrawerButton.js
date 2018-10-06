import React from "react";

const DrawerButton = props => {
  let buttonClassNames = ["toggle_button"];
  if (props.sideDrawerOpen) {
    buttonClassNames.push("drawerOpen");
  }
  return (
    <button onClick={props.click} className={buttonClassNames.join(" ")}>
      <div className="toggle_button_line one" />
      <div className="toggle_button_line two" />
      <div className="toggle_button_line three" />
    </button>
  );
};

export default DrawerButton;
