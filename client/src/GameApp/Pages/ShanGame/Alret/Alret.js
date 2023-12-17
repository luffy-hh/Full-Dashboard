import React, { useState } from "react";
import styles from "./Alret.module.css";

function Alret({ message }) {
  return (
    <div className={styles.alret}>
      <p>{message}</p>
    </div>
  );
}

export default Alret;
