import React from "react";
import NormalButton from "../../../Component/NormalButton";
import styles from "./ShanGame.module.css";
import BettingRange from "./BettingRange/BettingRange";
import { setPlayerBetAmount } from "../../../Feactures/shan";
import {
  selectBetRangeShow,
  setBetRangeShow,
  selectBetRangeAmount,
} from "../../../Feactures/shan";
import { useDispatch, useSelector } from "react-redux";

function BettingAmount() {
  const min = 100;
  const max = 1000;

  const numbers = [200, 600, 900];

  const betRangeShow = useSelector(selectBetRangeShow);
  const dispatch = useDispatch();
  const betRangeAmount = useSelector(selectBetRangeAmount);

  const btnList = numbers.map((d) => (
    <NormalButton
      key={d}
      onClick={() => dispatch(setPlayerBetAmount(d))}
      className={styles.btn_bet}
    >
      {d}K
    </NormalButton>
  ));
  return (
    <>
      <div className={styles.betting_amount}>
        <div className={styles.left_bet_btn}>{btnList}</div>
        <div className={styles.left_bet_btn}>
          <NormalButton
            className={styles.btn_max}
            onClick={() => dispatch(setPlayerBetAmount(max))}
          >
            All In
          </NormalButton>
          {betRangeShow ? (
            <NormalButton
              onClick={() => dispatch(betRangeAmount)}
              className={styles.btn_max}
            >
              {betRangeAmount}K
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
