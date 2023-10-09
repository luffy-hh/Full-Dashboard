import React from "react";

import { useDispatch } from "react-redux";

import styles from "./CancelHot.module.css";

function CancelHot({ hideFun, top, right }) {
  const dispatch = useDispatch();
  return (
    <div
      style={{ top: `${top}rem`, right: `${right}rem` }}
      className={`${styles.cancle_icon} btn_opacity`}
      onClick={() => dispatch(hideFun())}
    >
      <span>X</span>
    </div>
  );
}

export default CancelHot;
