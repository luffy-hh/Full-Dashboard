import React from "react";
import styles from "./ShanGame.module.css";

function Players({ data, showAns, result }) {
  return (
    <div className={styles.player} style={data?.position}>
      <div className={styles.player_card}>
        <div className={styles.user_box}>
          {result && <p className={styles.win_lose}>Win</p>}
          <img
            className={styles.user_img}
            src="/shangame/user/user3.jpg"
            alt="player3"
          />
          <div className={styles.userInfo}>
            <p className={styles.player_data}>{data.userId.name}</p>
            <p className={styles.player_data}>{data.game_unit}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Players;
