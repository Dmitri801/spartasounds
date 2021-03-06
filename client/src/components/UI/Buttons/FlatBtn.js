import React from "react";

function FlatBtn(props) {
  return (
    <div
      style={{ width: props.width }}
      className={["flat_btn_container", props.classes].join(" ")}
    >
      <div
        onClick={props.click}
        style={{
          background: props.backgroundColor,
          fontSize: props.fontSize,
          margin: props.margin,
          height: props.height,
          padding: props.padding,
          outline: props.outline
        }}
        className="flat_btn"
        tabIndex={props.tabIndex}
      >
        {props.title}
      </div>
    </div>
  );
}

export default FlatBtn;
