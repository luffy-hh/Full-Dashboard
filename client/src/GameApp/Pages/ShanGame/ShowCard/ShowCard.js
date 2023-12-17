import React from "react";
import styles from "./ShowCard.module.css";
import { selectPullCardShow } from "../../../../Feactures/shan";
import { useSelector } from "react-redux";

const shan = [
  {
    type: "Club1",
    name: "1",
    value: 1,
  },
  {
    type: "Club2",
    name: "2",
    value: 2,
  },
  {
    type: "Club3",
    name: "3",
    value: 3,
  },
  {
    type: "Club4",
    name: "4",
    value: 4,
  },
  {
    type: "Club5",
    name: "5",
    value: 5,
  },
  {
    type: "Club6",
    name: "6",
    value: 6,
  },
  {
    type: "Club7",
    name: "7",
    value: 7,
  },
  {
    type: "Club8",
    name: "8",
    value: 8,
  },
  {
    type: "Club9",
    name: "9",
    value: 9,
  },
  {
    type: "Club10",
    name: "10",
    value: 10,
  },
  {
    type: "ClubJ",
    name: "J",
    value: 10,
  },
  {
    type: "ClubQ",
    name: "Q",
    value: 10,
  },
  {
    type: "ClubK",
    name: "K",
    value: 10,
  },

  {
    type: "Diamond1",
    name: "1",
    value: 1,
  },
  {
    type: "Diamond2",
    name: "2",
    value: 2,
  },
  {
    type: "Diamond3",
    name: "3",
    value: 3,
  },
  {
    type: "Diamond4",
    name: "4",
    value: 4,
  },
  {
    type: "Diamond5",
    name: "5",
    value: 5,
  },
  {
    type: "Diamond6",
    name: "6",
    value: 6,
  },
  {
    type: "Diamond7",
    name: "7",
    value: 7,
  },
  {
    type: "Diamond8",
    name: "8",
    value: 8,
  },
  {
    type: "Diamond9",
    name: "9",
    value: 9,
  },
  {
    type: "Diamond10",
    name: "10",
    value: 10,
  },
  {
    type: "DiamondJ",
    name: "Jack",
    value: 10,
  },
  {
    type: "DiamondQ",
    name: "queen",
    value: 10,
  },
  {
    type: "DiamondK",
    name: "king",
    value: 10,
  },

  {
    type: "Heart1",
    name: "A",
    value: 1,
  },
  {
    type: "Heart2",
    name: "2",
    value: 2,
  },
  {
    type: "Heart3",
    name: "3",
    value: 3,
  },
  {
    type: "Heart4",
    name: "4",
    value: 4,
  },
  {
    type: "Heart5",
    name: "5",
    value: 5,
  },
  {
    type: "Heart6",
    name: "6",
    value: 6,
  },
  {
    type: "Heart7",
    name: "7",
    value: 7,
  },
  {
    type: "Heart8",
    name: "8",
    value: 8,
  },
  {
    type: "Heart9",
    name: "9",
    value: 9,
  },
  {
    type: "Heart10",
    name: "10",
    value: 10,
  },
  {
    type: "HeartJ",
    name: "jack",
    value: 10,
  },
  {
    type: "HeartQ",
    name: "queen",
    value: 10,
  },
  {
    type: "HeartK",
    name: "king",
    value: 10,
  },

  {
    type: "Spade1",
    name: "A",
    value: 1,
  },
  {
    type: "Spade2",
    name: "2",
    value: 2,
  },
  {
    type: "Spade3",
    name: "3",
    value: 3,
  },
  {
    type: "Spade4",
    name: "4",
    value: 4,
  },
  {
    type: "Spade5",
    name: "5",
    value: 5,
  },
  {
    type: "Spade6",
    name: "6",
    value: 6,
  },
  {
    type: "Spade7",
    name: "7",
    value: 7,
  },
  {
    type: "Spade8",
    name: "8",
    value: 8,
  },
  {
    type: "Spade9",
    name: "9",
    value: 9,
  },
  {
    type: "Spade10",
    name: "10",
    value: 10,
  },
  {
    type: "SpadeJ",
    name: "jack",
    value: 10,
  },
  {
    type: "SpadeQ",
    name: "queen",
    value: 10,
  },
  {
    type: "SpadeK",
    name: "king",
    value: 10,
  },
];

function ShowCard({ index, data }) {
  const pullCardShow = useSelector(selectPullCardShow);
  return (
    <div className={`${styles.show_card} ${styles[`show_card_${index}`]}`}>
      <div className={styles.cards_box}>
        <img
          src={`/shangame/Cards/${shan[data?.shan[0]].type}.png`}
          className={styles.show_card_one}
        />
        <img
          src={`/shangame/Cards/${shan[data.shan[1]].type}.png`}
          className={styles.show_card_two}
        />

        {pullCardShow && <p className={styles.speak}>{data.speakValue}</p>}
        {pullCardShow && <p className={styles.win_lose}>{data.result}</p>}
        {!pullCardShow && <p className={styles.speak}>{data.speakValue} </p>}
      </div>
    </div>
  );
}

export default ShowCard;
