import React, { useEffect } from "react";
import { setDragCard, setPullCard } from "../../../../Feactures/shan";
import { useDispatch } from "react-redux";
import styles from "./DragCard.module.css";

function DragCard({ setResult }) {
  const dispatch = useDispatch();
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
    setResult(true);
    dispatch(setDragCard(false));
    dispatch(setPullCard(true));
  };
  return (
    <div className={styles.modal}>
      <div className={styles.card_box}>
        <img
          id="front_card_one"
          className={styles.front_card_one}
          src="/shangame/Cards/HeartK.png"
          alt="cards"
        />
        <img
          id="front_card_two"
          className={styles.front_card_two}
          src="/shangame/Cards/Heart1.png"
          alt="card"
        />

        <div id="dragable" className={styles.dragable}>
          <div id="dragzone" className={styles.dragzone}>
            <img
              className={styles.back_card_one}
              src="/shangame/Cards/Heart1.png"
              alt="cards"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DragCard;
