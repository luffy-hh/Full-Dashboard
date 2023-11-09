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
  fetGetLuckNo,
  selectLuckyNoData,
  selectPostLuckyNo,
} from "../../Feactures/twoDapiSlice";
import { selectLuckyNoHead } from "../../Feactures/adminTwodSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import styles from "./LuckyNumber.module.css";

import LuckyNoBox from "../../Component/CustomBox/LuckyNoBox";
import LuckyNoCategory from "./LuckyNoCategory/LuckyNoCategory";
import Tables from "../../Component/Tables";

function LuckyNumber() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const allTwoDArr = useSelector(selectAllTwoDArr);
  const luckyNoHead = useSelector(selectLuckyNoHead);
  const filterTwoDArr = useSelector(selectfilterTwoDArr);
  const luckyNoData = useSelector(selectLuckyNoData);
  const postLuckyNoData = useSelector(selectPostLuckyNo);

  useEffect(() => {
    dispatch(fetGetGameCat({ api: "gamecat", accessToken }));
    dispatch(fetGetSubGameCat({ api: "gamesubcat", accessToken }));
  }, []);

  useEffect(() => {
    dispatch(fetGetLuckNo({ api: "twoDLucky", accessToken }));
  }, [postLuckyNoData]);

  const lukyNoArr = luckyNoData?.data;

  const list = lukyNoArr?.map((d, i) => (
    <tr key={d._id} className="table_d_tbody_tr">
      <td>{i + 1}</td>
      <td>{d.number}</td>
      <td>{d.subCatId.subCatName}</td>
      <td>{"Complete"}</td>
      <td className={styles.luky_date}>
        <span>{new Date(d.date).toLocaleDateString()}</span>
        <span>{"12:00 AM"}</span>
      </td>
    </tr>
  ));
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
        <>
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
          </div>
          <Container
            className={`table_d_container box_shadow ${styles.show_lucky_no}`}
          >
            <Tables thead={luckyNoHead} tbody={list} />
          </Container>
        </>
      )}
    </div>
  );
}

export default LuckyNumber;
