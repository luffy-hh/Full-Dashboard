import React from "react";
import Container from "../../../Component/Container";
import HotNoFooter from "./HotNoFooter";
import styles from "./HotNumber.module.css";
import ProgessLine from "./ProgessLine";
import Cancel from "../CancelIcon/Cancel";
import {
  backRecentRightBtn,
  clickedNos,
  amounts,
  setAddList,
  setAmount,
  lists,
  clickListHistory,
  listHistorys,
} from "../../../Feactures/StaticDataSlice";
import { setClickedNo } from "../../../Feactures/StaticDataSlice";
import { useDispatch } from "react-redux";
import List from "./List";

const cssCode = { display: "flex" };
function HotNumberList({ noAndProgess }) {
  const dispatch = useDispatch();

  const noandProgessList = noAndProgess.map((d) => (
    <li key={d.id}>
      <button
        disabled={d.hot >= 80 ? true : false}
        onClick={() => dispatch(setClickedNo(d.no))}
        className={`btn_opacity ${styles.hotNo_btn} ${
          d.hot >= 80 ? styles.disable_no : ""
        } `}
      >
        <span>{d.no}</span>
      </button>
      <ProgessLine progess={d} />
    </li>
  ));
  return (
    <>
      <section className={styles.hotNumger_box}>
        <Container className={styles.hotNumber_box}>
          <ul>{noandProgessList}</ul>
        </Container>
        {/* <HotNoFooter
          forCss={cssCode}
          clickedNos={clickedNos}
          amounts={amounts}
          setAddList={setAddList}
          setAmount={setAmount}
          lists={lists}
          clickListHistory={clickListHistory}
          lottery=""
        /> */}
        <Cancel hideFun={backRecentRightBtn} />
      </section>
      <List
        list={lists}
        listHistory={listHistorys}
        clickListHistory={clickListHistory}
      />
    </>
  );
}

export default HotNumberList;
