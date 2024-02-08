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
  const activeUser = tableId.slice(-6);

  const randomNumber = Math.floor(Math.random() * 10) + 1;

  const dispatch = useDispatch();

  const bettingTime = useSelector(selectBettingTime);
  const [mainObj, setMainObj] = useState([]);
  const [mainAmount, setMainAmount] = useState([]);
  const [cardHandling, setCardHandling] = useState(false);
  console.log(tableId.slice(0, tableId.length - 6));

  // const expfun = () => {
  //   const socket = io("https://gamevegas.online/playGame");

  //   socket.emit("tableId", { tableId: tableId.slice(0, tableId.length - 6) });

  //   socket.on("initTableData", (data) => {
  //     console.log(data);
  //     setMainObj(data.initTableData.currentPlayerArr);
  //     setMainAmount([
  //       data.initTableData.tableMaxAmt,
  //       data.initTableData.tableMinAmt,
  //     ]);
  //   });
  // };

  const joinFun = () => {
    const socketJoin = io(
      `https://gamevegas.online/${tableId.slice(0, tableId.length - 6)}`
    );
    socketJoin.on("joinUserSuccess", (data) => {
      console.log(data, "join user data");

      let players = data.tableObj.players; //player Array

      let userIndex = players.findIndex(
        (player) => player.userId === activeUser
      );

      // If the loginUser is found and not already at index 0, move it to index 0
      if (userIndex !== -1 && userIndex !== 0) {
        let [removedUser] = players.splice(userIndex, 1);

        // Insert the removed loginUser at index 0
        players.splice(0, 0, removedUser);

        setMainObj(players);
      }
    });
  };

  console.log(mainObj);

  useEffect(() => {
    // expfun();
    joinFun();
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
