import React, { useState } from "react";
import styles from "./ShanGame.module.css";
import UserBetIcon from "./UserBetIcon/UserBetIcon";
import Banker from "./UserBetIcon/Banker";
import ShowCard from "./ShowCard/ShowCard";
import { selectResult } from "../../../Feactures/shan";
import { useSelector } from "react-redux";
function PlayerTop({ data, index }) {
  const result = useSelector(selectResult);
  return (
    <div className={styles.player} style={data?.position}>
      <div className={styles.player_card}>
        <div>
          <div className={styles.userInfo_top}>
            <p className={styles.player_data_name}>{data.userId.name}</p>
            <p className={styles.player_data_price}>{data.game_unit}K</p>
          </div>
          <div className={styles.user_box}>
            <img
              className={styles.user_img}
              src="/shangame/user/user3.jpg"
              alt="player3"
            />

            {data?.player_roll === "banker" ? (
              <Banker index={index} />
            ) : (
              <UserBetIcon index={index} />
            )}
          </div>
        </div>
      </div>
      {result && <ShowCard index={index} data={data} />}
    </div>
  );
}

export default PlayerTop;
