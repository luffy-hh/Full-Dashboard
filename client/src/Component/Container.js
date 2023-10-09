import React from "react";

function Container(props) {
  const className = props.className;
  return <div className={className}>{props.children}</div>;
}

export default Container;
