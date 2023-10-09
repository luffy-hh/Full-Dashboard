import React from "react";
import Container from "../../../Component/Container";
import NormalButton from "../../../Component/NormalButton";
import { useDispatch } from "react-redux";
import { reportFun } from "../../../Feactures/ShowHideSlice";
import styles from "./TwoDPage.module.css";

const reportData = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
];
for (let i = 11; i <= 99; i++) {
  reportData.push(`${i}`);
}

function ReportInterface() {
  const dispatch = useDispatch();
  return (
    <Container className={styles.report_container}>
      <div className={styles.report_date}>
        <span>9/20/2023</span>
        <span>12:00 AM</span>
        <NormalButton
          onClick={() => dispatch(reportFun({ bool: true }))}
          className={styles.return_btn}
        >
          Return
        </NormalButton>
      </div>
      <table>
        <tr>
          <th>Number</th>
          <th>Total Value</th>
          <th>Amount</th>
          <th>Balance</th>
        </tr>
        {reportData.map((d) => (
          <tr className={styles.reprot_tr}>
            <td>{d}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </table>
    </Container>
  );
}

export default ReportInterface;
