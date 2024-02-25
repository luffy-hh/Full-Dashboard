import React, { useEffect } from "react";
import {
  setDragCard,
  setPullCard,
  selectDragCard,
  setResult,
} from "../../../../Feactures/shan";

import { useDispatch, useSelector } from "react-redux";
import styles from "./DragCard.module.css";
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

function DragCard({ data }) {
  const dispatch = useDispatch();
  const dragCardState = useSelector(selectDragCard);

  useEffect(() => {
    const frontCardOne = document.getElementById("front_card_one");

    const dragable = document.getElementById("dragable");
    const dragzone = document.getElementById("dragzone");

    const frontCardTwo = document.getElementById("front_card_two");

    const dragElement = (element, dragzone) => {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      //MouseUp occurs when the user releases the mouse button
      const dragMouseUp = () => {
        document.onmouseup = null;
        console.log("mouseUp");

        //after dragging cards=======================
        result(dragable, frontCardTwo, frontCardOne);
        //btnStopAndAgainShow(); //show rigthsideBtn
        document.onmousemove = null;
      };

      const dragMouseMove = (event) => {
        event.preventDefault();

        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;

        if (pos3 > 29 && pos4 > 24)
          element.style.top = `${element.offsetTop - pos2}px`;
        element.style.left = `${element.offsetLeft - pos1}px`;

        console.log("moving");
      };

      const dragMouseDown = (event) => {
        event.preventDefault();

        pos3 = event.clientX;
        pos4 = event.clientY;
        console.log(pos3, pos4);

        document.onmouseup = dragMouseUp;
        document.onmousemove = dragMouseMove;
      };

      dragzone.onmousedown = dragMouseDown;
    };

    dragzone.addEventListener("mousedown", (event) => {
      dragElement(dragable, dragzone);
    });
  }, []);

  const result = (dragable, element, cardOne) => {
    dragable.style.display = "none";
    element.style.display = "block";
    cardOne.style.transform = "rotate(-9deg)";

    setTimeout(() => {
      handleShow();
    }, 1000);
  };

  const showAllCard = () => {
    const cardAll = document.getElementById("dummy_cards_all");
    cardAll.remove();
  };

  const handleShow = () => {
    showAllCard();
    dispatch(setResult(true));
    dispatch(setDragCard(false));
    dispatch(setPullCard(true));
  };
  return (
    <div className={styles.modal}>
      <div className={styles.card_box}>
        <img
          id="front_card_one"
          className={styles.front_card_one}
          src={`/shangame/Cards/${data?.firstCard.type}${data?.firstCard.name}.png`}
          alt="cards"
        />
        <img
          id="front_card_two"
          className={styles.front_card_two}
          src={`/shangame/Cards/${data?.secondCard.type}${data?.secondCard.name}.png`}
          alt="card"
        />

        <div id="dragable" className={styles.dragable}>
          <div id="dragzone" className={styles.dragzone}>
            <img
              className={styles.back_card_one}
              src={`/shangame/Cards/${data?.secondCard.type}${data?.secondCard.name}.png`}
              alt="cards"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DragCard;
