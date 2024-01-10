import React, { useEffect } from "react";
import Container from "../../Component/Container";
import NormalButton from "../../Component/NormalButton";
import { setModalLucky } from "../../Feactures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Tables from "../../Component/Tables";
import { selectLuckyNoHead } from "../../Feactures/adminTwodSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import {
  fetGetLuckNo,
  selectLuckyNoData,
  selectPostLuckyNo,
  postLuckyNo,
  selectfilterTwoDArr,
} from "../../Feactures/twoDapiSlice";
import styles from "./LuckyNumber.module.css";
import LuckyNoBox from "../../Component/CustomBox/LuckyNoBox";
import BackTo from "../../Component/BackIcon/BackTo";

function TwoDLuckyNo({ setLuckyNoShow, setLuckyTwoDShow, setLucyThreeDShow }) {
  const luckyNoHead = useSelector(selectLuckyNoHead);
  const dispatch = useDispatch();
  const luckyNoData = useSelector(selectLuckyNoData);
  const postLuckyNoData = useSelector(selectPostLuckyNo);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const filterTwoDArr = useSelector(selectfilterTwoDArr);

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
        <span style={{ marginRight: "1.2rem" }}>
          {new Date(d.date).toLocaleDateString()}
        </span>
        <span>{new Date(d.date).toLocaleTimeString()}</span>
      </td>
    </tr>
  ));
  return (
    <>
      <LuckyNoBox
        category={filterTwoDArr}
        postFun={postLuckyNo}
        api="twoDLucky"
        accessToken={accessToken}
        lottery="2D"
      />
      <div className={`box_shadow ${styles.lucky_number_container}`}>
        <Container className={styles.lucky_number_header}>
          <BackTo
            setLuckyNoShow={setLuckyNoShow}
            setLuckyTwoDShow={setLuckyTwoDShow}
            setLucyThreeDShow={setLucyThreeDShow}
          />
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
  );
}

export default TwoDLuckyNo;
