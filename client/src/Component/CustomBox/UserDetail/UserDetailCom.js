import React from "react";
import Tables from "../../Tables";
import { selectUserDetailComHead } from "../../../Feactures/AllUserPageSlice";
import { useSelector } from "react-redux";
import styles from "../CustomBox.module.css";
import NormalButton from "../../NormalButton";

function UserDetailCom({ gameSubGame }) {
  const userDetailHead = useSelector(selectUserDetailComHead);

  const tbodyList = gameSubGame?.map((d) => (
    <tr className="table_d_tbody_tr">
      <td> {d.subCatName}</td>

      <td>{d.comession}</td>
      <td>{d.mainCompensation}</td>
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
      <div
        className={`table_d_container hide_scroll ${styles.userDetailTable}`}
      >
        <Tables thead={userDetailHead} tbody={tbodyList} />
      </div>
    </section>
  );
}

export default UserDetailCom;
