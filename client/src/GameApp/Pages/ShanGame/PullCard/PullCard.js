import React from "react";
import NormalButton from "../../../../Component/NormalButton";
import { selectIsBanker } from "../../../../Feactures/shan";
import { useSelector } from "react-redux";
import styles from "./PullCard.module.css";

function PullCard() {
  const isBanker = useSelector(selectIsBanker);
  const pullCardFun = () => {
    let selectCard = document.getElementById(`dummy_cards_pull_img`);
    selectCard.style.opacity = "1";
    selectCard.style.transform = `translate(${75 - 53}vw, 49vh) rotate(10deg)`;

    selectCard.style.width = "5rem";
  };
  return (
    <>
      {isBanker ? (
        <div className={styles.btn_stop_pull}>
          <NormalButton className={styles.stop_btn}>Catch</NormalButton>
          <NormalButton className={styles.pull_btn}>Pull</NormalButton>
        </div>
      ) : (
        <div className={styles.btn_stop_pull}>
          <NormalButton className={styles.stop_btn}>Stop</NormalButton>
          <NormalButton onClick={pullCardFun} className={styles.pull_btn}>
            Pull
          </NormalButton>
        </div>
      )}
    </>
  );
}

export default PullCard;
