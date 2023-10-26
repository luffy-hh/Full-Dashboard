import React from "react";
import AllusersFun from "./AllusersFun";
import {
  setModalUserDetail,
  setUserDetailData,
} from "../../Feactures/modalSlice";
import { useDispatch } from "react-redux";

import styles from "./AllusersTable.module.css";
import UserDetailBox from "../../Component/CustomBox/UserDetail/UserDetailBox";

function MainTable({ data, dataArr, query }) {
  const admin = data === "admin";
  // const datas = admin ? alladminData : allusersData;
  const dispatch = useDispatch();

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
        } else if (val.name.toLowerCase().includes(query.toLowerCase())) {
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
          {admin ? null : <td>{d.unit}</td>}
          {<AllusersFun data={data} toId={d._id} />}
          <td>{d.status ? "Active" : "InActive"}</td>
          <td className="table_d_lastTime">
            <span>{new Date(d.loginTime).toLocaleDateString()}</span>
            <span>{new Date(d.loginTime).toLocaleTimeString()}</span>
          </td>
        </tr>
      ));
  return (
    <>
      <UserDetailBox isMaster={data} />
      <table className={"table_d"}>
        <thead>
          <tr>
            <th style={{ width: "7rem" }}>No</th>
            <th style={{ width: "10rem" }}>Name</th>
            {admin ? null : <th style={{ width: "13rem" }}>Balance</th>}
            <th>Function</th>
            <th style={{ width: "9rem" }}>Status</th>
            <th style={{ width: "13rem" }}>Last login Time</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </>
  );
}

export default MainTable;
