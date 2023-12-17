import React from "react";
import GameBurmesCaur from "./GameBurmesCaur";
import { useSelector } from "react-redux";
// import { selectBurmesData } from "../../../Feactures/StaticDataSlice";
import styles from "./GameHome.module.css";
function GameHome() {
  // const burmesData = useSelector(selectBurmesData);
  return (
    <div
      style={{
        backgroundImage: "url(/img/home/LoginBackground.png)",
      }}
      className={styles.home_page}
    >
      <h1>I am home</h1>
    </div>
  );
}

export default GameHome;
