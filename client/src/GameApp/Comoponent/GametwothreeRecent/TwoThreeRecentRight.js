import React from "react";
import Container from "../../../Component/Container";
import NormalButton from "../../../Component/NormalButton";
import { useDispatch } from "react-redux";
import styles from "./TwoThreeRecent.module.css";

function TwoThreeRecentRight({ recentTwoThreeData, btnHandle }) {
  const dispatch = useDispatch();
  const twoDRighBtnList = recentTwoThreeData.map((b) => (
    <NormalButton
      onClick={() => dispatch(btnHandle({ title: b.title }))}
      className={`${styles.towD_right_btn} btn_opacity`}
      key={b.id}
    >
      {b.title}
    </NormalButton>
  ));
  return (
    <Container className={styles.rect_btn_container}>
      {twoDRighBtnList}
    </Container>
  );
}

export default TwoThreeRecentRight;
