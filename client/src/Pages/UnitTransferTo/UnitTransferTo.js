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
import {
  selectPostFastTransferTo,
  selectPostFastTransferToStatus,
  postFastTransferTo,
} from "../../Feactures/apiSlice";

function UnitTransferTo() {
  const dispatch = useDispatch();
  const collapsed = useSelector(selectCollapsed);
  const userWithId = useSelector(selectUserWithId);
  const userWithIdStatus = useSelector(selectUserWithIdStatus);
  const logInData = useSelector(selectlogInData);
  const postFastTransferToData = useSelector(selectPostFastTransferTo);
  const status = useSelector(selectPostFastTransferToStatus);

  const accessToken = logInData.token;
  const [id, setId] = useState("");
  const [text, setText] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = () => {
    if (id && userWithId?.data.userAll[0].name && unit) {
      if (Number(unit > 0)) {
        // dispatch(setModalSecretCode(true)); secret code modle box
        dispatch(
          postFastTransferTo({
            api: `transferTo/${id}`,
            postData: { amount: unit },
            accessToken,
          })
        );
      } else {
        setText("Unit Amount Will Be Plus");
      }
    } else {
      setText("Enter User ID and Unit Amount");
    }
  };
  console.log(postFastTransferToData, "from fast transfer");
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
                placeholder={userWithId?.data.userAll[0].name}
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
              {status === "loading" ? "Loading" : "Submit"}
            </NormalButton>
          </div>
          {postFastTransferToData?.status === "succeed" && (
            <span className={styles.success}>Successfully Transfer Unit</span>
          )}
        </div>
      </div>
    </>
  );
}

export default UnitTransferTo;
