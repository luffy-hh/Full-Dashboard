import React from "react";
import Container from "../../../Component/Container";
import NormalButton from "../../../Component/NormalButton";
import styles from "./Lottery.module.css";
import {
  selectClickNoList,
  setClickedFirst,
  setClickedSecond,
} from "../../../Feactures/StaticDataSlice";
import { useSelector, useDispatch } from "react-redux";

function LeftLottery() {
  const clickNoList = useSelector(selectClickNoList);
  const dispatch = useDispatch();
  const data1List = clickNoList.map((d, index) => (
    <NormalButton
      onClick={() => dispatch(setClickedFirst(d))}
      className={`${styles.frontBtn} btn_opacity`}
      key={index}
    >
      {d}
    </NormalButton>
  ));

  const data2List = clickNoList.map((d, index) => (
    <NormalButton
      onClick={() => dispatch(setClickedSecond(d))}
      className={`${styles.frontBtn} btn_opacity`}
      key={index}
    >
      {d}
    </NormalButton>
  ));

  return (
    <div
      className={`${styles.lottery_bg_img} bg_photo`}
      style={{ backgroundImage: "url(/img/lottery/TwoBoxes.png)" }}
    >
      <Container className={styles.front_back}>{data1List}</Container>
      <Container className={styles.front_back}>{data2List}</Container>
    </div>
  );
}

export default LeftLottery;
