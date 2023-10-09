import React from "react";
import Container from "../../../Component/Container";
import GameTwoandThree from "./Component/GameTwoandThree";
import { showRecent, setShowRecent } from "../../../Feactures/StaticDataSlice";
import { useSelector } from "react-redux";

import styles from "./GameTwoD.module.css";
import TwoDRecent from "./Component/TwoDRecent/TwoDRecent";

function GameTwoD() {
  const showRecents = useSelector(showRecent);
  return (
    <Container className={styles.game_two_d_page}>
      {showRecents ? (
        <GameTwoandThree />
      ) : (
        <TwoDRecent hideFun={setShowRecent} />
      )}
    </Container>
  );
}

export default GameTwoD;
