import React from "react";
import Container from "../../../Component/Container";

import styles from "./TwoThreeRecent.module.css";

function TwoThreeRecentLeft({ recentTwoThreeData }) {
  const recentNosList = recentTwoThreeData.map((no) => (
    <li key={no.id} className={styles.recent_twoD_box}>
      <span className={styles.recentNo}>{no.no}</span>
      <span className={styles.recentTime}>{no.date}</span>
    </li>
  ));
  return (
    <Container className={styles.recent_left}>
      <div
        style={{
          backgroundImage: "url(/img/TwoThree/LeftSide.png)",
          width: "40rem",
          height: "80vh",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container className={styles.recent_twoD_no}>
          <ul className={styles.recent_twoD_nolist}>{recentNosList}</ul>
        </Container>
      </div>
    </Container>
  );
}

export default TwoThreeRecentLeft;
