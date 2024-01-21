import React, { useEffect } from "react";
import {
  setModalLog,
  selectModalLog,
  selectUserObj,
} from "../../Feactures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import ReportDate from "../../Pages/WinLoseReport/Component/ReportDate";
import { Modal } from "antd";
import styles from "./CustomBox.module.css";
import { selectLogHead } from "../../Feactures/AllUserPageSlice";
import Spinner from "../Spinner/Spinner";
import {
  selectTransationRecordAll,
  selectTransationRecordAllStatus,
} from "../../Feactures/apiSlice";
import Tables from "../Tables";
function LogBox() {
  const dispatch = useDispatch();
  const modalLog = useSelector(selectModalLog);
  const logHead = useSelector(selectLogHead);
  const userObj = useSelector(selectUserObj);

  const transationRecordAll = useSelector(selectTransationRecordAll);
  const status = useSelector(selectTransationRecordAllStatus);

  const dataList = transationRecordAll?.map((d) => (
    <tr key={d._id} className="table_d_tbody_tr">
      <td>
        <span>{new Date(d.createdAt).toLocaleDateString()}</span>
        <span style={{ paddingLeft: "10px" }}>
          {new Date(d.createdAt).toLocaleTimeString()}
        </span>
      </td>
      <td>{d.type}</td>
      <td>{d.user_id.userId}</td>
      <td>{d.action_id.userId}</td>
      <td>{d.before_amt}</td>
      <td>
        <span
          className={
            d.status === "In" ? "color_green_style" : "color_red_style"
          }
        >
          {d.action_amt}
        </span>
      </td>
      <td>{d.after_amt}</td>
    </tr>
  ));

  console.log(transationRecordAll && transationRecordAll);

  return (
    <>
      <Modal
        centered
        open={modalLog}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => dispatch(setModalLog(false))}
        width={1000}
        okText={"Save"}
        className="modalStyle"
      >
        <div className={styles.log_container}>
          <ReportDate
            condition={"transation"}
            gameapi={`transaction-record?user_id=${userObj?._id}&type[in]=receive-from-other,send-to-other,deposit-confirmed,deposit-canceled,withdrawal-confirmed,withdrawal-cancled,deposit-received,withdrawal-requested,withdrawal-canceled-refunded,withdrawal-confirm-from-admin`}
          />
          {status === "loading" ? (
            <Spinner />
          ) : (
            <div className={`hide_scroll ${styles.log_tabel}`}>
              <Tables thead={logHead} tbody={dataList} />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default LogBox;
