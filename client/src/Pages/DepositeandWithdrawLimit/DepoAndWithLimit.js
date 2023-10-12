import React from "react";
import NormalButton from "../../Component/NormalButton";
import styles from "./DepoAndWithLimit.module.css";
const data = [
  { id: 1, text: "Minimum Deposite Limit" },
  { id: 2, text: "Maximum Deposite Limit" },
  { id: 3, text: "Minimum Withdraw Limit" },
  { id: 4, text: "Maximum Withdraw Limit" },
];
function DepoAndWithLimit() {
  const list = data.map((d) => (
    <li key={d.id}>
      <label>{d.text}</label>
      <input type="number" />
      <NormalButton className={styles.depo_with_limit_btn}>Save</NormalButton>
    </li>
  ));
  return (
    <div className="page_style">
      <div className={`box_shadow ${styles.depo_with_limit_container}`}>
        <p>Deposite and Withdraw Limit</p>
        <ul className={styles.depo_limit_input}>{list}</ul>
      </div>
    </div>
  );
}

export default DepoAndWithLimit;
