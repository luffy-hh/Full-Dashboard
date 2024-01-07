import React from "react";
import {
  selectDepositeAmount,
  selectBeforeAmt,
  selectCurrentUnit,
} from "../../Feactures/modalSlice";

import { useDispatch, useSelector } from "react-redux";
import styles from "./CustomBox.module.css";
import Spinner from "../Spinner/Spinner";

function ErrorandSucc({ status, loading, condition }) {
  const dispatch = useDispatch();
  const amount = useSelector(selectCurrentUnit);
  const beforeAmt = useSelector(selectBeforeAmt);

  console.log(status, "from real action");

  return (
    <>
      {loading === "loading" && <Spinner />}
      {condition === "DEP" ? (
        status?.status === "success" ? (
          <div className={styles.box_succ}>
            <img
              className={styles.logo_succ}
              src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/172-512.png"
            />
            <p className={styles.succ_text}>Succeded!</p>
            <div className={styles.amount_box}>
              <p>
                BeforeAmount
                <span className={styles.amount_bold}>{beforeAmt}</span>
              </p>
              <p>
                Unit <span className={styles.amount_bold}>{amount}</span>
              </p>
              <p>
                After Amount
                <span className={styles.amount_bold}>
                  {beforeAmt + Number(amount)}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.box_succ}>
            <img
              className={styles.logo_succ}
              src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png"
            />
            <p className={styles.error_text}>{status?.message}</p>
          </div>
        )
      ) : status === "succeeded" ? (
        <div className={styles.box_succ}>
          <img
            className={styles.logo_succ}
            src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/172-512.png"
          />
          <p className={styles.succ_text}>Succeded!</p>
          <div className={styles.amount_box}>
            <p>
              BeforeAmount
              <span className={styles.amount_bold}>{beforeAmt}</span>
            </p>
            <p>
              Unit <span className={styles.amount_bold}>{amount}</span>
            </p>
            <p>
              After Amount
              <span className={styles.amount_bold}>
                {beforeAmt - Number(amount)}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.box_succ}>
          <img
            className={styles.logo_succ}
            src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png"
          />
          <p className={styles.error_text}>{status?.message}</p>
        </div>
      )}
    </>
  );
}

export default ErrorandSucc;
