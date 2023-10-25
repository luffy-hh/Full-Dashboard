import React, { useState, useEffect } from "react";
import Container from "../../Component/Container";
import NormalButton from "../../Component/NormalButton";
import { setModalLucky } from "../../Feactures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetGetGameCat,
  selectAllTwoDArr,
  fetGetSubGameCat,
  selectfilterTwoDArr,
  postLuckyNo,
} from "../../Feactures/twoDapiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import styles from "./LuckyNumber.module.css";
import LuckyTable from "./LuckyTable";
import LuckyNoBox from "../../Component/CustomBox/LuckyNoBox";
import LuckyNoCategory from "./LuckyNoCategory/LuckyNoCategory";

function LuckyNumber() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const allTwoDArr = useSelector(selectAllTwoDArr);

  const filterTwoDArr = useSelector(selectfilterTwoDArr);

  useEffect(() => {
    dispatch(fetGetGameCat({ api: "gamecat", accessToken }));
    dispatch(fetGetSubGameCat({ api: "gamesubcat", accessToken }));
  }, []);

  return (
    <div className="page_style">
      <LuckyNoBox
        category={filterTwoDArr}
        postFun={postLuckyNo}
        accessToken={accessToken}
      />

      {!show && (
        <LuckyNoCategory show={show} setShow={setShow} allDArr={allTwoDArr} />
      )}
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
