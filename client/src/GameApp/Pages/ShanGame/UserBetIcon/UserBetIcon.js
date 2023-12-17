import React from "react";
import styles from "./UserBetIcon.module.css";

function UserBetIcon({ index }) {
  return (
    <div
      className={`${styles.user_bet_icons} ${styles[`player_bet_${index}`]}`}
    >
      <img src="/shangame/D.png" alt="coin_photo" />
      <span>1K</span>
    </div>
  );
}

export default UserBetIcon;
