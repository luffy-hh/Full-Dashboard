import React from "react";
import Container from "../../../Component/Container";
import OneClose from "./OneClosecomponent/OneClose";
import { selectTwoDHead } from "../../../Feactures/adminTwodSlice";
import { useSelector } from "react-redux";
import TwoDHead from "./TwoDHead";
import styles from "./TwoDPage.module.css";
import FirstTopNo from "./FistTopSection/FirstTopNo";
import OpenandCloseTime from "./TimePicker/OpenandCloseTime";

function TwoDPage() {
  const twoDHead = useSelector(selectTwoDHead);
  return (
    <Container className={styles.two_d_page}>
      <div className={styles.two_d_container}>
        <h3>နစ်လုံးထီအပြင်အဆင်</h3>
        <TwoDHead />

        {twoDHead[0].active && <FirstTopNo />}
        {twoDHead[1].active && <OneClose />}
        {twoDHead[2].active && <OpenandCloseTime />}
      </div>
    </Container>
  );
}

export default TwoDPage;
