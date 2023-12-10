import React, { useState } from "react";
import styles from "./ShanGame.module.css";
import DumyCard from "./DumyCard";
import NormalButton from "../../../Component/NormalButton";

import AllPlayer from "./AllPlayer";

function ShanGame() {
  const [showAns, setShowAns] = useState(false);
  const [result, setResult] = useState(false);
  const handleOpen = () => {
    setShowAns(true);
  };

  const handleResult = () => {
    setShowAns(true);
  };
  return (
    <div className={styles.shan_game}>
      <div className={styles.shan_table}>
        <img src="/shangame/lady/Girl.png" alt="lady" className={styles.lady} />
        {!showAns && <DumyCard />}
        <AllPlayer showAns={showAns} />
        {showAns ? (
          <NormalButton className={styles.open} onClick={handleResult}>
            show result
          </NormalButton>
        ) : (
          <NormalButton className={styles.open} onClick={handleOpen}>
            Open
          </NormalButton>
        )}
      </div>
    </div>
  );
}

export default ShanGame;
