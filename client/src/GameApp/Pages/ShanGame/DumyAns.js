import React from "react";
import styles from "./ShanGame.module.css";

function DumyAns({ top }) {
  return (
    <div className={styles.ans_card_container} style={{ marginTop: top }}>
      <div className={styles.ans_card}>1</div>
      <div className={styles.ans_card}>10</div>
    </div>
  );
}

export default DumyAns;
