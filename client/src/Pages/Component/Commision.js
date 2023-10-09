import React, { useState } from "react";
import { commisionListDatas } from "../../Feactures/AllUserPageSlice";
import { useSelector, useDispatch } from "react-redux";
import Container from "../../Component/Container";
import styles from "./Commision.module.css";
import AllTable from "./AllTable";

function Commision({ dataArr, addfun }) {
  const [selectText, setSelectText] = useState("2D");
  const [percent, setPercent] = useState("");

  const dataList = useSelector(commisionListDatas);
  const dispatch = useDispatch();

  const saveCommision = (e) => {
    e.preventDefault();
    dispatch(
      addfun({
        no: dataArr.length + 1,
        name: selectText,
        percent,
      })
    );
  };

  const valueList = dataList.map((d) => (
    <option key={d.title} value={d.title}>
      {d.title}
    </option>
  ));

  return (
    <section className={styles.comm_section}>
      <h3>Commision</h3>
      <Container className={styles.commision_box}>
        <select
          value={selectText}
          onChange={(e) => setSelectText(e.target.value)}
          className={styles.select_comm}
        >
          {valueList}
        </select>
        <input
          type="text"
          placeholder="Enter Commision Percent"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
        />
        <button
          className={styles.commision_btn}
          onClick={(e) => saveCommision(e)}
        >
          Save
        </button>
      </Container>
      <AllTable dataArr={dataArr} />
    </section>
  );
}

export default Commision;
