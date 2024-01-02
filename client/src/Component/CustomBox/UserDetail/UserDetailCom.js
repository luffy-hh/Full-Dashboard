import React from "react";
import Tables from "../../Tables";
import { selectUserDetailComHead } from "../../../Feactures/AllUserPageSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "../CustomBox.module.css";
import NormalButton from "../../NormalButton";
import { setModalEditCom, setCommisionId } from "../../../Feactures/modalSlice";
import EditCommisionBox from "./EditCommisionBox";

function UserDetailCom({ gameSubGame, masterId, accessToken }) {
  const userDetailHead = useSelector(selectUserDetailComHead);
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    dispatch(setModalEditCom(true));
    dispatch(setCommisionId(id));
  };

  const tbodyList = gameSubGame?.map((d) => (
    <tr className="table_d_tbody_tr" key={d._id}>
      <td> {d.subCatName}</td>

      <td>{d.comession}</td>
      <td>{d.mainCompensation}</td>
      <td>
        <NormalButton
          onClick={() => handleEdit(d)}
          className={`btn_hover ${styles.user_com_edit}`}
        >
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

      <EditCommisionBox masterId={masterId} accessToken={accessToken} />
    </section>
  );
}

export default UserDetailCom;
