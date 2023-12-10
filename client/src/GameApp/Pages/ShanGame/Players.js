import React from "react";
import styles from "./ShanGame.module.css";
import DumyAns from "./DumyAns";

function Players({ data, showAns }) {
  return (
    <div className={styles.player} style={data?.position}>
      <div className={styles.player_card}>
        <div className={styles.user_box}>
          <img
            className={styles.user_img}
            src="/shangame/user/user3.jpg"
            alt="player3"
          />
          <div className={styles.userInfo}>
            <p className={styles.player_data}>Aye Aye</p>
            <p className={styles.player_data}>$ 59.4K</p>
          </div>
        </div>
        {showAns && <DumyAns top={"1rem"} />}
      </div>
    </div>
  );
}

export default Players;
