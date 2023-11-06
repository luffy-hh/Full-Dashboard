import React from "react";
import AllusersFun from "./AllusersFun";
import {
  setModalUserDetail,
  setUserDetailData,
  selectUserDetailData,
} from "../../Feactures/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AllusersTable.module.css";
import UserDetailBox from "../../Component/CustomBox/UserDetail/UserDetailBox";

function MainTable({ data, dataArr, query }) {
  const admin = data === "admin";
  // const datas = admin ? alladminData : allusersData;
  const dispatch = useDispatch();
  const userDetailData = useSelector(selectUserDetailData);

  const handleUserDetail = (userData) => {
    dispatch(setModalUserDetail(true));
    dispatch(setUserDetailData(userData));
  };

  const tableData =
    dataArr &&
    dataArr
      .filter((val) => {
        if (query === "") {
          return val;
        } else if (val.userId.includes(query)) {
          return val;
        }
      })
      .map((d, index) => (
        <tr key={d._id} className="table_d_tbody_tr">
          <td>{index + 1}</td>
          <td>
            <span
              onClick={() => handleUserDetail(d)}
              className={styles.all_user_name_link}
            >
              {d.name}
            </span>
          </td>
          <td>{d.userId}</td>
          {admin ? null : <td>{d.unit}</td>}
          {<AllusersFun data={data} toId={d._id} user={d} />}
          <td>{d.status ? "Active" : "InActive"}</td>
          <td className="table_d_lastTime">
            <span>{new Date(d.loginTime).toLocaleDateString()}</span>
            <span>{new Date(d.loginTime).toLocaleTimeString()}</span>
          </td>
        </tr>
      ));
  return (
    <>
      {userDetailData && <UserDetailBox isMaster={data} />}
      <table className={"table_d box_shadow"}>
        <thead>
          <tr>
            <th style={{ minWidth: "7rem" }}>No</th>
            <th style={{ minWidth: "20rem" }}>Name</th>
            <th style={{ minWidth: "10rem" }}>UserID</th>
            {admin ? null : <th style={{ minWidth: "20rem" }}>Balance</th>}
            <th>Function</th>
            <th style={{ minWidth: "15rem" }}>Status</th>
            <th style={{ minWidth: "20rem" }}>Last login Time</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </>
  );
}

export default MainTable;
