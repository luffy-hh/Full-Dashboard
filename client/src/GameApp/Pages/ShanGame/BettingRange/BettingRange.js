import React, { useState } from "react";
import styles from "./BettingRange.module.css";
import {
  selectBetRangeAmount,
  setBetRangeAmount,
} from "../../../../Feactures/shan";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "antd";

function BettingRange({ min, max }) {
  const betRangeAmount = useSelector(selectBetRangeAmount);
  const dispatch = useDispatch();

  const onChange = (newValue) => {
    dispatch(setBetRangeAmount(newValue));
  };

  return (
    <div>
      <div className={styles.slider}>
        <Slider
          vertical
          min={min}
          max={max}
          defaultValue={5}
          onChange={onChange}
          value={betRangeAmount}
          tooltip={{ open: true }}
        />
      </div>
    </div>
  );
}

export default BettingRange;
