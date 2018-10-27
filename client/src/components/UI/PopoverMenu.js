import React from "react";

export const PopoverMenu = props => {
  const classes = ["popover", props.classes];
  return <div className={classes.join(" ")}>{props.children}</div>;
};
