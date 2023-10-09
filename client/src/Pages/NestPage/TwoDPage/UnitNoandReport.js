import React from "react";
import Container from "../../../Component/Container";
import NormalButton from "../../../Component/Button";
import { useDispatch } from "react-redux/es/exports";
import { reportFun } from "../../../Feactures/ShowHideSlice";
import styles from "./TwoDPage.module.css";

function UnitNoandReport({ title }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.unit_limit_container}>
      <h3>{title}</h3>
      <Container className={styles.unit_report_container}>
        <NormalButton className={styles.unit_report_btn}>
          Close and limit Number
        </NormalButton>
        <NormalButton
          onClick={() => dispatch(reportFun({ bool: false }))}
          className={styles.unit_report_btn}
        >
          Report
        </NormalButton>
      </Container>
    </div>
  );
}

export default UnitNoandReport;
