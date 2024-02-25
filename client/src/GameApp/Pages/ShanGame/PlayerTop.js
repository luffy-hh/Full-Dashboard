import React, { useState } from "react";
import styles from "./ShanGame.module.css";
import UserBetIcon from "./UserBetIcon/UserBetIcon";
import Banker from "./UserBetIcon/Banker";

import { selectResult } from "../../../Feactures/shan";
import { useSelector } from "react-redux";
import ShowCardOther from "./ShowCard/ShowCardOther";
function PlayerTop({ data, index, bank_amt, allShowResult }) {
  const result = useSelector(selectResult);
  return (
    <div className={styles.player} style={data?.position}>
      <div className={styles.player_card}>
        <div>
          <div className={styles.userInfo_top}>
            <p className={styles.player_data_name}>{data.userName}</p>
            <p className={styles.player_data_price}>{data.gameUnit}</p>
          </div>
          <div className={styles.user_box}>
            <img
              className={styles.user_img}
              src="/shangame/user/user3.jpg"
              alt="player3"
            />

            {data?.player_role === "banker" ? (
              <Banker index={index} bank_amt={data.bank_amt} />
            ) : (
              <UserBetIcon index={index} betAmt={data.play_amt} />
            )}
          </div>
        </div>
      </div>
      {result && <ShowCardOther index={index} data={data} />}
    </div>
  );
}

export default PlayerTop;
