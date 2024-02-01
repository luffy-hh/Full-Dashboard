import React, { useEffect, useState } from "react";
import styles from "./ShanGame.module.css";
import DumyCard from "./DumyCard";
import BettingAmount from "./BettingAmount";
import { io } from "socket.io-client";

import { useParams } from "react-router-dom";
import {
  selectShanGameRing,
  fetGetShanGameRing,
  selectBettingTime,
  selectPullCard,
} from "../../../Feactures/shan";
import { useSelector, useDispatch } from "react-redux";
import AllPlayer from "./AllPlayer";
import { relativeTimeRounding } from "moment";

function ShanGame() {
  const { tableId } = useParams();
  console.log(tableId);

  const randomNumber = Math.floor(Math.random() * 10) + 1;

  const dispatch = useDispatch();
  const shanGameRing = useSelector(selectShanGameRing);
  const bettingTime = useSelector(selectBettingTime);
  const [mainObj, setMainObj] = useState([]);
  const [mainAmount, setMainAmount] = useState([]);
  const [cardHandling, setCardHandling] = useState(false);

  const expfun = () => {
    const socket = io("https://gamevegas.online/playGame");
    socket.emit("tableId", { tableId: tableId });

    socket.on("initTableData", (data) => {
      console.log(data);
      setMainObj(data.initTableData.currentPlayerArr);
      setMainAmount([
        data.initTableData.tableMaxAmt,
        data.initTableData.tableMinAmt,
      ]);
    });
  };

  console.log(mainAmount);

  useEffect(() => {
    expfun();
  }, []);

  return (
    <div className={styles.shan_game}>
      <div className={styles.shan_table}>
        <img src="/shangame/lady/Girl.png" alt="lady" className={styles.lady} />

        {/* { mainObj.length > 0 && (
          <DumyCard
            cardHandling={cardHandling}
            counts={mainObj.length}
            setCardHandling={setCardHandling}
            number={randomNumber}
          />
        )} */}

        {mainObj.length > 0 && (
          <AllPlayer data={mainObj} number={randomNumber} />
        )}
      </div>
      {bettingTime && <BettingAmount mainAmount={mainAmount} />}
    </div>
  );
}

export default ShanGame;
