import React from "react";
import NormalButton from "../../../Component/NormalButton";
import styles from "./ShanGame.module.css";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setPullCard } from "../../../Feactures/shan";
function PlayerNextCard({ tableId, userId, setMainObj, mainObj }) {
  const dispatch = useDispatch();

  const nextCard = () => {
    const socket = io(tableId);
    socket.emit("nextCard", { userId: userId });
    socket.on("nextCard", (data) => {
      const combined = mainObj.map((item1) => {
        const foundItem = data.updateCard.find(
          (item2) => item2.userId === item1.userId
        );
        return { ...item1, ...foundItem };
      });

      setMainObj(combined);
      console.log(mainObj, "nextCard ====================");

      dispatch(setPullCard(true));
      console.log("working nextcardFun");
    });
  };
  return (
    <div className={styles.banker_catch_btn}>
      <NormalButton className={styles.btn_bet} onClick={nextCard}>
        NextCard
      </NormalButton>
      <NormalButton className={styles.btn_bet}>Stop</NormalButton>
    </div>
  );
}

export default PlayerNextCard;
