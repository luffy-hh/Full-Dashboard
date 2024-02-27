import React from "react";
import NormalButton from "../../../Component/NormalButton";
import styles from "./ShanGame.module.css";
import { io } from "socket.io-client";
import { setPullCard, setResult } from "../../../Feactures/shan";
import { useDispatch } from "react-redux";
function BankerCatch({
  socket,
  userId,
  setMainObj,
  mainObj,
  tableIdForMatch,
  setAllShowResult,
}) {
  const dispatch = useDispatch();
  const nextCardFun = () => {
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

  const winLose = () => {
    socket.emit("winlose", { tableId: tableIdForMatch });
    socket.on("winlose", (data) => {
      const combined = mainObj.map((item1) => {
        const foundItem = data.winlose.find(
          (item2) => item2.userId === item1.userId
        );
        return { ...item1, ...foundItem };
      });

      setMainObj(combined);
      console.log(mainObj, "nextCard ====================");
      setAllShowResult(true);
      dispatch(setResult(false));
    });
  };
  return (
    <div className={styles.banker_catch_btn}>
      <NormalButton className={styles.btn_bet} onClick={nextCardFun}>
        NextCard
      </NormalButton>
      <NormalButton className={styles.btn_bet} onClick={winLose}>
        Catch
      </NormalButton>
    </div>
  );
}

export default BankerCatch;
