import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "../../Comoponent/Aside/Aside";

import styles from "./GameLayout.module.css";
import GameNavbar from "../../Comoponent/NavandFooter/GameNavbar";
function GameLayout() {
  return (
    <>
      <GameNavbar />

      <div className={styles.layout}>
        <Aside />
        <Outlet />
      </div>
    </>
  );
}

export default GameLayout;
