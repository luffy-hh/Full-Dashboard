import React, { useEffect, useState } from "react";
import styles from "./ShanGame.module.css";
import DumyCard from "./DumyCard";
import BettingAmount from "./BettingAmount";

import { useParams } from "react-router-dom";
import {
  selectShanGameRing,
  fetGetShanGameRing,
  selectBettingTime,
  selectPullCard,
} from "../../../Feactures/shan";
import { useSelector, useDispatch } from "react-redux";
import AllPlayer from "./AllPlayer";
import PullCard from "./PullCard/PullCard";

function ShanGame() {
  const { tableId } = useParams();

  const dispatch = useDispatch();
  const shanGameRing = useSelector(selectShanGameRing);
  const bettingTime = useSelector(selectBettingTime);
  const pullCard = useSelector(selectPullCard);

  useEffect(() => {
    dispatch(fetGetShanGameRing("shanRing"));
  }, []);

  console.log(shanGameRing && shanGameRing);

  const mainObj = shanGameRing?.data.filter((d) => d._id === tableId);
  console.log(mainObj);

  const [result, setResult] = useState(false);
  const [cardHandling, setCardHandling] = useState(false);

  return (
    <div className={styles.shan_game}>
      <div className={styles.shan_table}>
        <img src="/shangame/lady/Girl.png" alt="lady" className={styles.lady} />

        {shanGameRing && (
          <DumyCard
            cardHandling={cardHandling}
            counts={mainObj}
            setCardHandling={setCardHandling}
          />
        )}

        {shanGameRing && (
          <AllPlayer data={mainObj} result={result} setResult={setResult} />
        )}
      </div>
      {bettingTime && <BettingAmount />}
    </div>
  );
}

export default ShanGame;
