import React from "react";
import Tables from "../../Tables";
import {
  selectUserDetailCom,
  selectUserDetailComHead,
} from "../../../Feactures/AllUserPageSlice";
import { useSelector } from "react-redux";
import styles from "../CustomBox.module.css";
import NormalButton from "../../NormalButton";

function UserDetailCom() {
  const userDetailHead = useSelector(selectUserDetailComHead);
  const userDetailCom = useSelector(selectUserDetailCom);

  const tbodyList = userDetailCom.map((d) => (
    <tr className="table_d_tbody_tr">
      <td> {d.name}</td>
      <td>{d.com}</td>
      <td>{d.za}</td>
      <td>
        <NormalButton className={`btn_hover ${styles.user_com_edit}`}>
          Edit
        </NormalButton>
      </td>
    </tr>
  ));
  return (
    <section className={styles.user_com}>
      <h3>Commasion</h3>
      <div className="table_d_container hide_scroll">
        <Tables thead={userDetailHead} tbody={tbodyList} />
      </div>
    </section>
  );
}

export default UserDetailCom;
