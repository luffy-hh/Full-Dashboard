import React from "react";

function Button(props) {
  const className = `${props.className} btn`;
  return (
    <button className={className} onClick={props.onClick} type="submit">
      {props.children}
    </button>
  );
}

export default Button;
