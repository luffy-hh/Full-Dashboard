import React from "react";
import AllusersFun from "./AllusersFun";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./AllusersTable.module.css";

import NormalButton from "../../Component/NormalButton";

import CopyID from "../../Component/CopyText/CopyID";
import UserActiveBox from "../../Component/CustomBox/UserActiveBox";
import ChangePasswordbox from "../../Component/CustomBox/ChangePasswordbox";
import LogBox from "../../Component/CustomBox/LogBox";
import { selectlogInData } from "../../Feactures/apiSlice";

function MainTable({ data, dataArr, query, downLine }) {
  const admin = data === "admin";
  // const datas = admin ? alladminData : allusersData;
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const role = logInData.user.role;

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
        <tr
          key={d._id}
          className={`table_d_tbody_tr ${d.status ? "" : "ban_user"}`}
        >
          <td>{index + 1}</td>
          <td>
            <Link to={`${d._id}`} className={styles.all_user_name_link}>
              {d.name}
            </Link>
          </td>
          <CopyID id={d.userId} />
          {admin ? null : <td>{d.unit}</td>}

          {role === "Master" && (
            <td>
              <NormalButton className={`btn_hover ${styles.show_more_btn}`}>
                <Link to={`${d._id}`}> Show More </Link>
              </NormalButton>
            </td>
          )}

          <AllusersFun data={data} toId={d._id} userObj={d} />
          <td>
            <span className={d.status ? "" : "color_red"}>
              {d.status ? "Active" : "InActive"}
            </span>
          </td>
          {admin ? null : <td>{d?.securityCode}</td>}
          <td className="table_d_lastTime">
            <span>{new Date(d.loginTime).toLocaleDateString()}</span>
            <span>{new Date(d.loginTime).toLocaleTimeString()}</span>
          </td>
        </tr>
      ));
  return (
    <>
      <table className={"table_d box_shadow"}>
        <thead>
          <tr>
            <th style={{ minWidth: "5rem" }}>No</th>
            <th style={{ minWidth: "20rem" }}>Name</th>
            <th style={{ minWidth: "10rem" }}>UserID</th>
            {admin ? null : <th style={{ minWidth: "20rem" }}>Balance</th>}
            {role === "Master" && (
              <th style={{ minWidth: "25rem" }}>DownLine</th>
            )}
            <th style={{ minWidth: "50rem" }}>Function</th>
            <th style={{ minWidth: "15rem" }}>Status</th>
            {admin ? null : (
              <th style={{ minWidth: "20rem" }}>Security Code</th>
            )}
            <th style={{ minWidth: "20rem" }}>Last login Time</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>

      <UserActiveBox />
      <ChangePasswordbox />
      <LogBox />
    </>
  );
}

export default MainTable;
