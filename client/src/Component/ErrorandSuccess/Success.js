import React from "react";
import styles from "./ErrorandSuccess.module.css";
import { RiEmotionHappyFill } from "react-icons/ri";

function Success({ message }) {
  return (
    <div className={styles.success}>
      <span className={styles.s_emote_icon}>
        <RiEmotionHappyFill />
      </span>
      <p className={styles.s_message}>{message}</p>
    </div>
  );
}

export default Success;
