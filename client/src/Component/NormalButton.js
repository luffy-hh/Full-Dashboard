import React from "react";

function NormalButton(props) {
  const className = `${props.className} btn`;
  return (
    <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default NormalButton;
