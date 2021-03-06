import React from "react";

import Logo from "../../resources/Images/Logo.png";

export const TheLogo = props => {
  const template = (
    <div
      id={props.id}
      className={props.classes}
      style={{
        width: props.width,
        height: props.height,
        background: `url(${Logo}) no-repeat`,
        position: props.position,
        right: props.right,
        bottom: props.bottom
      }}
    />
  );

  if (props.link) {
    return template;
  } else {
    return template;
  }
};
