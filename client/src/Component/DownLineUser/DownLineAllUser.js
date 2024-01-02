import React, { useEffect } from "react";
import styles from "./DownLine.module.css";
import { selectDonwlineUserHead } from "../../Feactures/AllUserPageSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDownLineUser,
  fetGetDownLineUser,
  selectlogInData,
} from "../../Feactures/apiSlice";
import Tables from "../Tables";
import { useParams } from "react-router-dom";
import CopyID from "../CopyText/CopyID";

function DownLineAllUser() {
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const { userId } = useParams();
  const downLineHead = useSelector(selectDonwlineUserHead);
  const downLineUser = useSelector(selectDownLineUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetGetDownLineUser({ api: `downlineUser/${userId}`, accessToken })
    );
  }, []);
  const downLineUserArr = downLineUser?.data.downlineObj;

  console.log(downLineUserArr);

  const list = downLineUserArr?.map((d, i) => (
    <tr className="table_d_tbody_tr" key={d.userId}>
      <td>{i + 1}</td>
      <td>{d.name}</td>
      <CopyID id={d.userId} />
      <td>{d.unit}</td>
      <td>{d.status ? "Active" : "InActive"}</td>
      <td className="table_d_lastTime">
        <span>{new Date(d.loginTime).toLocaleDateString()}</span>
        <span>{new Date(d.loginTime).toLocaleTimeString()}</span>
      </td>
    </tr>
  ));

  return (
    <div className="page_style" style={{ overflow: "hidden" }}>
      <p className={`box_shadow ${styles.title}`}>DownLine User List</p>

      {downLineUserArr?.length === 0 ? (
        <p>There is no User</p>
      ) : (
        <div
          className={`table_d_container hide_scroll box_shadow ${styles.downline_table}`}
        >
          <Tables thead={downLineHead} tbody={list} />
        </div>
      )}
    </div>
  );
}

export default DownLineAllUser;
