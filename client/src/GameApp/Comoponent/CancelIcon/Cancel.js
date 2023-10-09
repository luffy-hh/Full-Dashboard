import React from "react";

import { useDispatch } from "react-redux";

import styles from "./Cancel.module.css";

function Cancel({ hideFun }) {
  const dispatch = useDispatch();
  return (
    <div
      className={`${styles.cancle_icon} btn_opacity`}
      onClick={() => dispatch(hideFun())}
    >
      <span>X</span>
    </div>
  );
}

export default Cancel;
