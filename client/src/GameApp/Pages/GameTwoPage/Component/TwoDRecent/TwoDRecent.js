import React from "react";
import Container from "../../../../../Component/Container";
import TwoThreeRecentLeft from "../../../../Comoponent/GametwothreeRecent/TwoThreeRecentLeft";
import TwoThreeRecentRight from "../../../../Comoponent/GametwothreeRecent/TwoThreeRecentRight";
import { useSelector } from "react-redux";
import {
  twoDrecntNos,
  twoDRight,
  twoDrecntOpactiy,
  hotNoandProgessArr,
  clickTwoDRightBtn,
  showHotNumber,
  showLive,
  show2Dlist,
  showLottery,
} from "../../../../../Feactures/StaticDataSlice";

import HotNumberList from "../../../../Comoponent/HotNumber/HotNumberList";

import styles from "./TwoDRecent.module.css";
import Cancel from "../../../../Comoponent/CancelIcon/Cancel";
import Lottery from "../../../../Comoponent/LotteryTwoThree/Lottery";

function TwoDRecent({ hideFun }) {
  const recenttwoDNo = useSelector(twoDrecntNos);
  const twoDRightSideData = useSelector(twoDRight);
  const twoDopacity = useSelector(twoDrecntOpactiy);
  const hotNoandProgess = useSelector(hotNoandProgessArr);
  const showHotNumberPage = useSelector(showHotNumber);
  const showLotterys = useSelector(showLottery);

  return (
    <section
      style={{
        backgroundImage: "url(/img/TwoThree/Bg.png)",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {twoDopacity && (
        <Container className={styles.twod_recent_container}>
          <TwoThreeRecentLeft recentTwoThreeData={recenttwoDNo} />
          <TwoThreeRecentRight
            recentTwoThreeData={twoDRightSideData}
            btnHandle={clickTwoDRightBtn}
          />
          <Cancel hideFun={hideFun} />
        </Container>
      )}
      {showHotNumberPage && <HotNumberList noAndProgess={hotNoandProgess} />}
      {showLotterys && <Lottery />}
    </section>
  );
}

export default TwoDRecent;
