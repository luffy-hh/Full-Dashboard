import React from "react";
import Container from "../../../Component/Container";
import styles from "./HotNumber.module.css";

function ProgessLine({ progess }) {
  return (
    <Container className={styles.progess}>
      <div
        aria-label="line"
        style={{
          width: `${progess.hot}%`,
          height: "100%",
          backgroundColor: "#dc2626",
        }}
      ></div>
    </Container>
  );
}

export default ProgessLine;
