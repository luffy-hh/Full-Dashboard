import React, { useEffect, useState } from "react";
import styles from "./ShanGame.module.css";
import DumyCard from "./DumyCard";
import NormalButton from "../../../Component/NormalButton";
import { useParams } from "react-router-dom";
import {
  selectShanGameRing,
  fetGetShanGameRing,
} from "../../../Feactures/shan";
import { useSelector, useDispatch } from "react-redux";
import AllPlayer from "./AllPlayer";

function ShanGame() {
  const { tableId } = useParams();

  const dispatch = useDispatch();
  const shanGameRing = useSelector(selectShanGameRing);

  useEffect(() => {
    dispatch(fetGetShanGameRing("shanRing"));
  }, []);

  console.log(shanGameRing && shanGameRing);
  const mainObj = shanGameRing?.data.filter((d) => d._id === tableId);
  console.log(mainObj);

  const [showAns, setShowAns] = useState(false);
  const [result, setResult] = useState(false);
  const [show, setShow] = useState(false);
  const [cardHandling, setCardHandling] = useState(false);
  const [btnShow, setBtnShow] = useState(false);

  const handleResult = () => {
    setShowAns(true);
  };
  return (
    <div className={styles.shan_game}>
      <div className={styles.shan_table}>
        <img src="/shangame/lady/Girl.png" alt="lady" className={styles.lady} />

        {!showAns && (
          <DumyCard
            cardHandling={cardHandling}
            counts={mainObj}
            setCardHandling={setCardHandling}
            setBtnShow={setBtnShow}
          />
        )}

        {shanGameRing && <AllPlayer showAns={showAns} data={mainObj} />}
        {btnShow && (
          <NormalButton className={styles.open} onClick={handleResult}>
            show result
          </NormalButton>
        )}
      </div>
    </div>
  );
}

export default ShanGame;
