import React from "react";
import styles from "./UserBtn.module.css";

function UserBtn(props) {
  return (
    <button onClick={props.onClick} className={styles.user_fun_btn}>
      {props.children}
    </button>
  );
}

export default UserBtn;
