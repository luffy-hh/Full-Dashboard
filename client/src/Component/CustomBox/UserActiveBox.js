import React from "react";
import styles from "./CustomBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModalActive,
  setModalActive,
  selectUserObj,
} from "../../Feactures/modalSlice";
import { Modal } from "antd";

function UserActiveBox() {
  const modalActive = useSelector(selectModalActive);
  const userObj = useSelector(selectUserObj);
  const dispatch = useDispatch();

  const handleActive = () => {
    dispatch(setModalActive(false));
  };

  return (
    <>
      <Modal
        centered
        open={modalActive}
        onOk={handleActive}
        onCancel={() => dispatch(setModalActive(false))}
        width={700}
        okText={"Save"}
        className="modalStyle"
      >
        <div style={{ fontSize: "2rem" }}>
          Are you sure to ban this user
          <span style={{ color: "#4ade80" }}>{userObj?.name}</span> No API
        </div>
      </Modal>
    </>
  );
}

export default UserActiveBox;
