import React from "react";
import Container from "../../../Component/Container";
import HotNoFooter from "../HotNumber/HotNoFooter";
import LeftLottery from "./LeftLottery";

import styles from "./Lottery.module.css";
import RightLottery from "./RightLottery";
import CancelHot from "../HotNumber/CancelHot";
import {
  backRecentRightBtn,
  setLotteryAmount,
  setAddLotteryList,
  clickLotteryListHistory,
  selectLotteryFirstNo,
  selectLotterySecondNo,
  selectLotteryList,
  selectLotteryAmount,
  selectLotteryClickHistory,
} from "../../../Feactures/StaticDataSlice";
import List from "../HotNumber/List";

const cssCode = { display: "flex", justifyContent: "center" };
function Lottery() {
  return (
    <>
      <section className={styles.lottery_section}>
        <Container className={styles.lottery_container}>
          <LeftLottery />
          <RightLottery />
        </Container>
      </section>
      <HotNoFooter
        forCss={cssCode}
        clickedNos={selectLotteryFirstNo}
        amounts={selectLotteryAmount}
        setAddList={setAddLotteryList}
        setAmount={setLotteryAmount}
        lists={selectLotteryList}
        clickListHistory={clickLotteryListHistory}
        lottery={selectLotterySecondNo}
      />
      <CancelHot hideFun={backRecentRightBtn} top="1" right="2" />
      <List
        list={selectLotteryList}
        listHistory={selectLotteryClickHistory}
        clickListHistory={clickLotteryListHistory}
      />
    </>
  );
}

export default Lottery;
