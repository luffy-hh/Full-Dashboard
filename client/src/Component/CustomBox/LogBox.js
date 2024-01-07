import React from "react";
import { setModalLog, selectModalLog } from "../../Feactures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import ReportDate from "../../Pages/WinLoseReport/Component/ReportDate";
import { Modal } from "antd";
import styles from "./CustomBox.module.css";
import { selectLogHead } from "../../Feactures/AllUserPageSlice";
import Tables from "../Tables";
function LogBox() {
  const dispatch = useDispatch();
  const modalLog = useSelector(selectModalLog);
  const logHead = useSelector(selectLogHead);

  return (
    <>
      <Modal
        centered
        open={modalLog}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => dispatch(setModalLog(false))}
        width={900}
        okText={"Save"}
        className="modalStyle"
      >
        <div className={styles.log_container}>
          <ReportDate />
          <div className={`hide_scroll ${styles.log_tabel}`}>
            <Tables thead={logHead} />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default LogBox;
