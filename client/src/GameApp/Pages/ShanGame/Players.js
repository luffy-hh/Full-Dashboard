import React from "react";
import styles from "./ShanGame.module.css";
import UserBetIcon from "./UserBetIcon/UserBetIcon";
import Banker from "./UserBetIcon/Banker";

import { useSelector } from "react-redux";
import ShowCard from "./ShowCard/ShowCard";
import DragCard from "./Dragable/DragCard";
import { selectResult, selectDragCard } from "../../../Feactures/shan";
import ShowCardOther from "./ShowCard/ShowCardOther";

function Players({ data, index, allShowResult }) {
  const result = useSelector(selectResult);
  const dragCardState = useSelector(selectDragCard);

  return (
    <>
      <div className={styles.player} style={data?.position}>
        <div className={styles.player_card}>
          <div className={styles.user_box}>
            {/* Check Banker */}

            {data?.player_role === "banker" ? (
              <Banker index={index} bank_amt={data.bank_amt} />
            ) : (
              <UserBetIcon index={index} betAmt={data.play_amt} />
            )}

            <div className={styles.user_img_box}>
              <img
                className={styles.user_img}
                src="/shangame/user/user3.jpg"
                alt="player3"
              />
            </div>
            <div className={styles.userInfo}>
              <p className={styles.player_data_name}>{data.userName}</p>
              <p className={styles.player_data_price}>{data.gameUnit}</p>
            </div>
          </div>
        </div>
        {index === 0 && result && <ShowCard index={0} data={data} />}

        {index === 0 && dragCardState && <DragCard data={data} />}
      </div>
    </>
  );
}

export default Players;
