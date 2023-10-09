import React from "react";
import Container from "../../../../Component/Container";
import NormalButton from "../../../../Component/NormalButton";
import { useDispatch } from "react-redux";
import { setShowRecent } from "../../../../Feactures/StaticDataSlice";
import styles from "./Gametwothree.module.css";

function GameTwoandThree() {
  const dispatch = useDispatch();

  return (
    <section
      style={{
        backgroundImage: "url(/img/TwoThree/twothreebackground.jpg)",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <span className={styles.burmes}>Burmese Game</span>
      <Container className={styles.two_three_btn_container}>
        <NormalButton className={styles.two_three_btn}>
          <img
            className={styles.two_d_photo}
            src="/img/TwoThree/ThreeDRounded.png"
            alt="3dphoto"
          />
        </NormalButton>
        <NormalButton
          className={styles.two_three_btn}
          onClick={() => dispatch(setShowRecent())}
        >
          <img
            className={styles.two_d_photo}
            src="/img/TwoThree/TwoDRounded.png"
            alt="2dphoto"
          />
        </NormalButton>
      </Container>
    </section>
  );
}

export default GameTwoandThree;
