import React from "react";
import styles from "./ErrorandSuccess.module.css";
import { RiEmotionUnhappyFill } from "react-icons/ri";

function Error({ message }) {
  return (
    <div className={styles.error}>
      <div className={styles.emote_container}>
        <span className={styles.emote_icon}>
          <RiEmotionUnhappyFill />
        </span>
      </div>

      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default Error;
