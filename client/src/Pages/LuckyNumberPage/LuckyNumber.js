import React, { useState } from "react";
import Container from "../../Component/Container";
import NormalButton from "../../Component/NormalButton";
import { setModalLucky } from "../../Feactures/modalSlice";
import { useDispatch } from "react-redux";
import styles from "./LuckyNumber.module.css";
import LuckyTable from "./LuckyTable";
import LuckyNoBox from "../../Component/CustomBox/LuckyNoBox";
import LuckyNoCategory from "./LuckyNoCategory/LuckyNoCategory";

function LuckyNumber() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="page_style">
      <LuckyNoBox />
      {!show && <LuckyNoCategory show={show} setShow={setShow} />}
      {show && (
        <div className={`box_shadow ${styles.lucky_number_container}`}>
          <Container className={styles.lucky_number_header}>
            <p>2D LuckyNumber</p>
            <NormalButton
              onClick={() => dispatch(setModalLucky(true))}
              className={styles.lucky_no_btn}
            >
              Create Number
            </NormalButton>
          </Container>
          <LuckyTable />
        </div>
      )}
    </div>
  );
}

export default LuckyNumber;
