import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCollapsed,
  selectModalAccDepo,
} from "../../Feactures/modalSlice";
import {
  selectUserWithId,
  selectUserWithIdStatus,
  fetGetUserWithId,
  selectlogInData,
} from "../../Feactures/apiSlice";
import styles from "./UnitTransferTo.module.css";
import NormalButton from "../../Component/NormalButton";
import SecretCodeBox from "../../Component/CustomBox/SecretCodeBox";
import { setModalSecretCode } from "../../Feactures/modalSlice";

function UnitTransferTo() {
  const dispatch = useDispatch();
  const collapsed = useSelector(selectCollapsed);
  const userWithId = useSelector(selectUserWithId);
  const userWithIdStatus = useSelector(selectUserWithIdStatus);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const [id, setId] = useState("");
  const [text, setText] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = () => {
    if (id && userWithId?.data.userAll[0].name && unit) {
      if (Number(unit > 0)) {
        dispatch(setModalSecretCode(true));
      } else {
        setText("Unit Amount Will Be Plus");
      }
    } else {
      setText("Enter User ID and Unit Amount");
    }
  };

  const handleCheck = () => {
    if (id) {
      dispatch(fetGetUserWithId({ api: `user?userId=${id}`, accessToken }));
    } else {
      setText("Enter User ID");
    }
  };

  console.log(userWithId && userWithId);
  return (
    <>
      <SecretCodeBox />
      <div className={collapsed ? "page_style_coll" : "page_style"}>
        <div className={styles.unitHistory_container}>
          <h3>Fast Unit Transfer</h3>
          <div className={styles.box_container}>
            <div>
              <label>User ID</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />

              <NormalButton
                onClick={() => handleCheck()}
                className={`btn_hover ${styles.check_btn}`}
              >
                {userWithIdStatus === "loading" ? "Loading" : "Check"}
              </NormalButton>
            </div>
            <div>
              <label>User Name</label>
              <input
                disabled={true}
                type="text"
                value={userWithId?.data.userAll[0].name}
              />
            </div>
            <div>
              <label>Unit Amount</label>
              <input
                type="number"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
            {text && <p style={{ color: "red" }}>{text}</p>}
            <NormalButton
              onClick={() => handleSubmit()}
              className={`btn_hover ${styles.submit_btn}`}
            >
              Submit
            </NormalButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnitTransferTo;
