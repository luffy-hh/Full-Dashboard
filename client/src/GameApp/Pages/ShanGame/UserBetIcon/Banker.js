import React from "react";

import styles from "./UserBetIcon.module.css";

function Banker({ index }) {
  return (
    <div className={`player_bet_${index}`}>
      <span className={styles.banker}>Banker</span>
    </div>
  );
}

export default Banker;
