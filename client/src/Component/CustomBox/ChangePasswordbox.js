import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import {
  setModalChangePassword,
  selectModalChangePassword,
  selectUserObj,
  setModalSucc,
} from "../../Feactures/modalSlice";
import CustomBoxSucc from "./CustomBoxSucc";
import {
  fetchPutChangePassword,
  selectlogInData,
  selectChnagePassword,
  setChangePassword,
} from "../../Feactures/apiSlice";
import styles from "./CustomBox.module.css";

function ChangePasswordbox() {
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const userObj = useSelector(selectUserObj);
  const accessToken = logInData.token;
  const [newPass, setNewPass] = useState("");
  const [comfrimPass, setComfrimPass] = useState("");
  const modalChnagePassword = useSelector(selectModalChangePassword);
  const changePassword = useSelector(selectChnagePassword);
  console.log(changePassword);
  const patchData = { password: newPass, confirmPassword: comfrimPass };

  const handleActive = () => {
    dispatch(
      fetchPutChangePassword({
        api: `user/${userObj?._id}`,
        patchData,
        accessToken,
      })
    );
    // if () {

    // }
  };

  const modalOpen = () => {
    dispatch(setModalChangePassword(false));
    dispatch(setModalSucc(true));
  };
  return (
    <>
      {changePassword.status === "succeed" && modalOpen()}
      <CustomBoxSucc clearFun={setChangePassword} />
      <Modal
        title="Change New Password"
        centered
        open={modalChnagePassword}
        onOk={handleActive}
        onCancel={() => dispatch(setModalChangePassword(false))}
        width={700}
        okText={"Save"}
        className="modalStyle"
      >
        <div className={styles.bank_input}>
          <div>
            <label>Enter New Password</label>
            <input
              type="text"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>
          <div>
            <label>Comfrim Password</label>
            <input
              type="text"
              value={comfrimPass}
              onChange={(e) => setComfrimPass(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ChangePasswordbox;
