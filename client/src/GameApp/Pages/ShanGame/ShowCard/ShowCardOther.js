import React from "react";
import styles from "./ShowCard.module.css";

function ShowCardOther({ index, data }) {
  return (
    <div className={`${styles.show_card} ${styles[`show_card_${index}`]}`}>
      <div className={styles.cards_box_other}>
        <img src={`/shangame/playCard/PeterRiver.png`} />
        <img src={`/shangame/playCard/PeterRiver.png`} />

        {data?.thirdCard && <img src={`/shangame/playCard/PeterRiver.png`} />}
      </div>
    </div>
  );
}

export default ShowCardOther;
