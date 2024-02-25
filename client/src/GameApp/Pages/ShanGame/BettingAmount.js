import React, { useState } from "react";
import NormalButton from "../../../Component/NormalButton";
import styles from "./ShanGame.module.css";
import BettingRange from "./BettingRange/BettingRange";

import {
  selectBetRangeShow,
  setBetRangeShow,
  selectBetRangeAmount,
} from "../../../Feactures/shan";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

function BettingAmount({ mainAmount, tableId, userId, setMainObj }) {
  const min = mainAmount[1];
  const max = mainAmount[0];
  const [betAmount, setBetAmount] = useState(min);

  const numbers = [min + min, max / 2, max - min];

  console.log(betAmount);

  const betRangeShow = useSelector(selectBetRangeShow);
  const dispatch = useDispatch();
  const betRangeAmount = useSelector(selectBetRangeAmount);

  const handleBtn = () => {
    const socket = io(tableId);
    socket.emit("betAmt", { betAmt: betAmount, userId: userId });
    socket.on("tableData", (data) => {
      console.log(data);

      let players = data.updateTableArr;

      let userIndex = players.findIndex((player) => player.userId === userId);

      console.log(userIndex);

      if (userIndex !== -1 && userIndex !== 0) {
        let removedUser = players.splice(userIndex, 1)[0];

        players.unshift(removedUser);
      }

      setMainObj([...players]);
    });
  };

  const leftBtnBet = (d) => {
    setBetAmount(`${d}`);
    handleBtn();
  };

  const rightBtnBet = (d) => {
    dispatch(setBetRangeShow(false));
    setBetAmount(`${d}`);
    handleBtn();
  };

  const btnList = numbers.map((d, i) => (
    <NormalButton
      key={`btn_${i}`}
      onClick={() => leftBtnBet(d)}
      className={styles.btn_bet}
    >
      {d}
    </NormalButton>
  ));
  return (
    <>
      <div className={styles.betting_amount}>
        <div className={styles.left_bet_btn}>{btnList}</div>
        <div className={styles.left_bet_btn}>
          <NormalButton
            className={styles.btn_max}
            onClick={() => leftBtnBet(max)}
          >
            All In
          </NormalButton>
          {betRangeShow ? (
            <NormalButton
              className={styles.btn_max}
              onClick={() => rightBtnBet(betRangeAmount)}
            >
              {`${betRangeAmount}`}
            </NormalButton>
          ) : (
            <NormalButton
              className={styles.btn_max}
              onClick={() => dispatch(setBetRangeShow(true))}
            >
              Amount
            </NormalButton>
          )}
        </div>
      </div>
      {betRangeShow && <BettingRange min={min} max={max} />}
    </>
  );
}

export default BettingAmount;

//loginPlayer >>> if >> banker ==== no Show betting btn
//                      player ====== show btn and bet >>>
//after 10 second       player ==== min amount auto showing
