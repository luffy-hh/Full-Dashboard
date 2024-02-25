import React from "react";

import styles from "./UserBetIcon.module.css";

function Banker({ index, bank_amt }) {
  return (
    <div className={`player_bet_${index}`}>
      <span className={styles.banker}>Banker -- {bank_amt}</span>
    </div>
  );
}

export default Banker;
