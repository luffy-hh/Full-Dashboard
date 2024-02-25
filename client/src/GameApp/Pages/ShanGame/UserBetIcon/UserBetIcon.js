import React from "react";
import styles from "./UserBetIcon.module.css";

function UserBetIcon({ index, betAmt }) {
  console.log(betAmt);
  return (
    <>
      {betAmt > 0 && (
        <div
          className={`${styles.user_bet_icons} ${
            styles[`player_bet_${index}`]
          }`}
        >
          <img src="/shangame/D.png" alt="coin_photo" />
          <span>{betAmt}</span>
        </div>
      )}
    </>
  );
}

export default UserBetIcon;
