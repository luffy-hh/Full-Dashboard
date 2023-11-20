import React from "react";
import Container from "../../../Component/Container";
import OneClose from "./OneClosecomponent/OneClose";
import { selectTwoDHead } from "../../../Feactures/adminTwodSlice";
import { useSelector } from "react-redux";
import TwoDHead from "./TwoDHead";
import styles from "./TwoDPage.module.css";
import FirstTopNo from "./FistTopSection/FirstTopNo";
import OpenandCloseTime from "./TimePicker/OpenandCloseTime";
import {
  selectSubGameCat,
  selectSubGameCatId,
} from "../../../Feactures/twoDapiSlice";

function TwoDPage() {
  const twoDHead = useSelector(selectTwoDHead);
  const subGameCat = useSelector(selectSubGameCat);
  const subGameCatId = useSelector(selectSubGameCatId);
  const subGameCatArr = subGameCat?.data.allSubGameCat;
  const filterArr = subGameCatArr?.filter((d) => d._id === subGameCatId.id);

  return (
    <Container className={styles.two_d_page}>
      <div className={styles.two_d_container}>
        <div className={styles.two_d_title}>
          <h3>Edit 2D</h3>
          <h3>{filterArr[0]?.subCatName}</h3>
        </div>

        <TwoDHead />

        {twoDHead[0].active && <FirstTopNo />}
        {twoDHead[1].active && <OneClose subObj={subGameCatId} />}
        {twoDHead[2].active && <OpenandCloseTime subObj={subGameCatId} />}
      </div>
    </Container>
  );
}

export default TwoDPage;
