import React from "react";
import styles from "./ShowCard.module.css";
import { selectPullCardShow } from "../../../../Feactures/shan";
import { useSelector } from "react-redux";

function ShowCard({ index, data }) {
  const pullCardShow = useSelector(selectPullCardShow);

  return (
    <div className={`${styles.show_card} ${styles[`show_card_${index}`]}`}>
      <div className={styles.cards_box}>
        <img
          src={`/shangame/Cards/${data?.firstCard?.type}${data?.firstCard.name}.png`}
          className={styles.show_card_one}
        />
        <img
          src={`/shangame/Cards/${data?.secondCard.type}${data?.secondCard.name}.png`}
          className={styles.show_card_two}
        />

        {data?.thirdCard && (
          <img
            src={`/shangame/Cards/${data?.thirdCard.type}${data?.thirdCard.name}.png`}
            className={styles.show_card_third}
          />
        )}

        {pullCardShow && <p className={styles.win_lose}>{data.result}</p>}
        {!pullCardShow && <p className={styles.speak}>{data.result} </p>}
        {data?.winlose && <p className={styles.speak}>{data.result}</p>}
      </div>
    </div>
  );
}

export default ShowCard;
