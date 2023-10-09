import React from "react";
import Container from "../../../Component/Container";
import NormalButton from "../../../Component/NormalButton";
import {
  selectLotteryRight,
  selectClickNoList,
} from "../../../Feactures/StaticDataSlice";
import { useSelector } from "react-redux";

import styles from "./Lottery.module.css";

function RightLottery() {
  const lotteryRight = useSelector(selectLotteryRight);
  const clickNoList = useSelector(selectClickNoList);
  const btnList = lotteryRight.map((b, i) => (
    <li key={i}>
      <NormalButton className={`btn_opacity ${styles.right_lottery_btn}`}>
        {b}
      </NormalButton>
    </li>
  ));

  const dataList = clickNoList.map((d, index) => (
    <li key={index}>
      <NormalButton className={`btn_opacity ${styles.right_bottom_btn}`}>
        {d}
      </NormalButton>
    </li>
  ));
  return (
    <Container className={styles.lotter_right}>
      <div className={styles.right_lottery_box}>
        <span>ရိုးရိုး</span>
        <ul>{btnList}</ul>
        <div className={styles.right_bottom}>
          <ul>{dataList}</ul>
        </div>
      </div>
    </Container>
  );
}

export default RightLottery;
