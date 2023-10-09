import React from "react";
import Container from "../../../Component/Container";
import Button from "../../../Component/Button";
import Cancel from "../../../GameApp/Comoponent/CancelIcon/Cancel";
import styles from "../AllCreateForm.module.css";

function Form({ hideFun, data }) {
  const dataList = data.map((d) => (
    <Container key={d.id} className={styles.lable_container}>
      <label htmlFor={d.id}>{d.label}</label>
      <input type="text" id={d.id} />
    </Container>
  ));

  return (
    <Container className={styles.admin_form_container}>
      <form className={styles.admin_form}>
        <Container className={styles.admin_form_flex}>{dataList}</Container>
        <Container className={styles.master_btn_container}>
          <Button className={styles.master_submit_btn}>Create</Button>
        </Container>
      </form>
      <Cancel hideFun={hideFun} />
    </Container>
  );
}

export default Form;
