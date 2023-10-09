import React from "react";
import Container from "../../Component/Container";
import Button from "../../Component/Button";
import styles from "./AllCreateForm.module.css";
import SwitchesGroup from "../../Component/SwitchesGroup";
import Commision from "./Commision";
import CancelHot from "../../GameApp/Comoponent/HotNumber/CancelHot";

function AllCreateForm({ hideFun, data, dataArr, addComm, state = true }) {
  const dataList = data.map((d) => (
    <Container key={d.id} className={styles.lable_container}>
      <label htmlFor={d.id}>{d.label}</label>
      <input type="text" id={d.id} />
    </Container>
  ));
  return (
    <Container className={styles.master_form_container}>
      <form className={styles.master_form}>
        <Container className={styles.master_form_grid}>{dataList}</Container>
        <SwitchesGroup />
        <Commision dataArr={dataArr} addfun={addComm} />
        <Container className={styles.master_btn_container}>
          <Button className={styles.master_submit_btn}>Submit</Button>
        </Container>
        <CancelHot hideFun={hideFun} top="1" right="0" />
      </form>
    </Container>
  );
}

export default AllCreateForm;
