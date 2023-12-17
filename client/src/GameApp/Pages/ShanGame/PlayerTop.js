import React from "react";
import styles from "./ShanGame.module.css";

function PlayerTop({ data, showAns, result }) {
  return (
    <div className={styles.player} style={data?.position}>
      <div className={styles.player_card}>
        <div>
          <div className={styles.userInfo_top}>
            <p className={styles.player_data}>{data.userId.name}</p>
            <p className={styles.player_data}>{data.game_unit}K</p>
          </div>
          <div className={styles.user_box}>
            <img
              className={styles.user_img}
              src="/shangame/user/user3.jpg"
              alt="player3"
            />
            {result && <p className={styles.win_lose}>Win</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerTop;
