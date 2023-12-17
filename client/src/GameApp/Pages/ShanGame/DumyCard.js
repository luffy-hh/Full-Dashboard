import React, { useEffect } from "react";
import styles from "./ShanGame.module.css";

import {
  setBettingTime,
  setDragCard,
  setPullCard,
} from "../../../Feactures/shan";
import { useDispatch } from "react-redux";
const myArray = Array(12).fill("/shangame/playCard/PeterRiver.png");

// const userPost = [
//   { top: "-8rem", right: `calc(75vw - 65vw)` },
//   { top: "6rem", right: `calc(75vw - 78vw)` },
//   { bottom: "-7rem", right: `calc(75vw - 70vw)` },
//   { bottom: "-7rem", right: `calc(75vw - 42vw)` },
//   { bottom: "-7rem", left: `calc(75vw - 72vw)` },
//   { top: "6rem", left: `calc(75vw - 78vw)` },
//   { top: "-8rem", left: `calc(75vw - 65vw)` },
// ];

const cardPosition = new Map([
  [
    2,
    [
      "translate(calc(75vw - 60vw), 0vh)",
      "translate(calc(75vw - 45vw),20vh)",

      "translate(calc(75vw - 58.5vw), 0vh)",
      "translate(calc(75vw - 43.5vw), 20vh)",
    ],
  ],
  [
    3,
    [
      "translate(calc(75vw - 60vw), 0vh)",
      "translate(calc(75vw - 45vw),20vh)",
      "translate(calc(75vw - 55vw),50vh)",

      "translate(calc(75vw - 58.5vw), 0vh)",
      "translate(calc(75vw - 43.5vw), 20vh)",
      "translate(calc(75vw - 53.5vw),50vh)",
    ],
  ],
  [
    4,
    [
      "translate(calc(75vw - 60vw), 0vh)",
      "translate(calc(75vw - 45vw),20vh)",
      "translate(calc(75vw - 55vw),50vh)",
      "translate(-15vw,50vh)",

      "translate(calc(75vw - 58.5vw), 0vh)",
      "translate(calc(75vw - 43.5vw), 20vh)",
      "translate(calc(75vw - 53.5vw),50vh)",
      "translate(-13.5vw,50vh)",
    ],
  ],
  [
    5,
    [
      "translate(calc(75vw - 60vw), 0vh)",
      "translate(calc(75vw - 45vw),20vh)",
      "translate(calc(75vw - 55vw),50vh)",
      "translate(-15vw,50vh)",
      "translate(-32vw,20vh)",

      "translate(calc(75vw - 58.5vw), 0vh)",
      "translate(calc(75vw - 43.5vw), 20vh)",
      "translate(calc(75vw - 53.5vw),50vh)",
      "translate(-13.5vw,50vh)",
      "translate(-30.5vw,20vh)",
    ],
  ],
  [
    6,
    [
      "translate(calc(75vw - 60vw), 0vh)",
      "translate(calc(75vw - 45vw),20vh)",
      "translate(calc(75vw - 55vw),50vh)",
      "translate(-15vw,50vh)",
      "translate(-32vw,20vh)",
      "translate(-18vw,0vh)",

      "translate(calc(75vw - 58.5vw), 0vh)",
      "translate(calc(75vw - 43.5vw), 20vh)",
      "translate(calc(75vw - 53.5vw),50vh)",
      "translate(-13.5vw,50vh)",
      "translate(-30.5vw,20vh)",
      "translate(-16.5vw,0vh)",
    ],
  ],
]);

function DumyCard({
  cardHandling,
  counts,
  setCardHandling,
  setResult,
  number,
}) {
  const dispatch = useDispatch();

  const showAllCard = () => {
    const cardAll = document.getElementById("dummy_cards_all");
    cardAll.remove();
  };

  const handleShow = () => {
    showAllCard();
    setResult(true);
    // dispatch(setDragCard(false));
    dispatch(setPullCard(true));
  };
  const cards = myArray.map((d, index) => (
    <img
      key={`cardNo${index}`}
      id={`dummy_card${index}`}
      src={d}
      alt={`card${index}`}
      className={styles.cards_img}
    />
  ));

  let indexCount = 0;

  const autoCardHealding = (postion, count) => {
    let condNo = postion.get(count).length;
    let condHaft = condNo / 2;
    const intervalId = setInterval(() => {
      if (indexCount < condNo) {
        let selectCard = document.getElementById(`dummy_card${indexCount}`);
        selectCard.style.opacity = "1";

        // selectCard.style.transform = postion.get(count)[indexCount];
        if (indexCount < condHaft) {
          selectCard.style.transform = `${
            postion.get(count)[indexCount]
          } rotate(-9deg)`;
        } else {
          selectCard.style.transform = `${
            postion.get(count)[indexCount]
          } rotate(1deg)`;
        }

        selectCard.style.width = "2.6rem";
        selectCard.style.height = "4rem";

        indexCount++;
      } else {
        clearInterval(intervalId);
        // dispatch(setDragCard(true));
        handleShow();

        return;
      }
    }, 500);
  };

  useEffect(() => {
    cardHandling &&
      counts[0].players.length >= 2 &&
      autoCardHealding(cardPosition, counts[0].players.length);

    // //testing
    // false &&
    //   counts[0].players.length >= 2 &&
    //   autoCardHealding(cardPosition, counts[0].players.length);
  }, [cardHandling]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCardHandling(true);
      dispatch(setBettingTime(false));
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className={styles.dummy_cards}>
        <div id="dummy_cards_all" className={styles.dummy_card_container}>
          {cards}
        </div>
        <div id="dummy_cards_pull" className={styles.dummy_card_container}>
          <img
            src={`/shangame/Cards/Spade${number}.png`}
            className={styles.cards_img}
            id="dummy_cards_pull_img"
          />
        </div>
      </div>
    </>
  );
}

export default DumyCard;
