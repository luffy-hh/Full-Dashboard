import React from "react";
import styles from "./ShanGame.module.css";

function DumyAns({ top }) {
  return (
    <div className={styles.ans_card_container} style={{ marginTop: top }}>
      <div>
        <img
          src="/shangame/Cards/Club1.png"
          className={styles.ans_card}
          alt="cards"
        />
        <img
          src="/shangame/Cards/Club2.png"
          className={styles.ans_card}
          alt="cards"
        />
      </div>
      <p>Win</p>
    </div>
  );
}

export default DumyAns;
