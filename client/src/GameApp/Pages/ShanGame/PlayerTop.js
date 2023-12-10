import React from "react";
import styles from "./ShanGame.module.css";
import DumyAns from "./DumyAns";

function PlayerTop({ data, showAns }) {
  return (
    <div className={styles.player} style={data?.position}>
      <div className={styles.player_card}>
        <div>
          <div className={styles.userInfo_top}>
            <p className={styles.player_data}>Aye Aye</p>
            <p className={styles.player_data}>$ 59.4K</p>
          </div>
          <div className={styles.user_box}>
            <img
              className={styles.user_img}
              src="/shangame/user/user3.jpg"
              alt="player3"
            />
          </div>
        </div>
        {showAns && <DumyAns top={"5rem"} />}
      </div>
    </div>
  );
}

export default PlayerTop;
