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

function BettingAmount({ mainAmount }) {
  const min = mainAmount[1];
  const max = mainAmount[0];

  const numbers = [min + min, max / 2, max - min];

  const betRangeShow = useSelector(selectBetRangeShow);
  const dispatch = useDispatch();
  const betRangeAmount = useSelector(selectBetRangeAmount);

  const btnList = numbers.map((d, i) => (
    <NormalButton
      key={`btn_${i}`}
      onClick={() => dispatch(setPlayerBetAmount(d))}
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
            onClick={() => dispatch(setPlayerBetAmount(max))}
          >
            All In
          </NormalButton>
          {betRangeShow ? (
            <NormalButton className={styles.btn_max}>
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
