import React from "react";
import Container from "../../Component/Container";
import NormalButton from "../../Component/NormalButton";
import styles from "./LuckyNumber.module.css";
import LuckyTable from "./LuckyTable";

function LuckyNumber() {
  return (
    <div className={styles.lucky_number_page}>
      <div className={`box_shadow ${styles.lucky_number_container}`}>
        <Container className={styles.lucky_number_header}>
          <p>2D LuckyNumber</p>
          <NormalButton className={styles.lucky_no_btn}>
            Create Number
          </NormalButton>
        </Container>
        <LuckyTable />
      </div>
    </div>
  );
}

export default LuckyNumber;
