import React from "react";
import {
  selectModalMasterSubGame,
  setModalMasterSubGame,
} from "../../../Feactures/modalSlice";
import {
  selectFilterMasterSubGame,
  closeMasterSubGameCat,
  selectlogInData,
} from "../../../Feactures/apiSlice";
import { fetPatchMasterSubGameCat } from "../../../Feactures/twoDapiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Switch } from "antd";
import styles from "../CustomBox.module.css";

function UserSubGameBox({ masterId }) {
  const dispatch = useDispatch();
  const modalMasterSubGame = useSelector(selectModalMasterSubGame);
  const subGameArr = useSelector(selectFilterMasterSubGame);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  console.log(subGameArr, "from modal");
  const onEditSubGame = (id, status, catId) => {
    const patchData = {
      subCatIdToUpdate: catId,
      status: !status,
    };
    dispatch(
      fetPatchMasterSubGameCat({
        api: `mastersubcatstatus/${masterId}`,
        patchData,
        accessToken,
      })
    );
    dispatch(closeMasterSubGameCat(id));
  };

  const list = subGameArr?.map((d) => (
    <div
      key={d._id}
      className={`${styles.sup_game} box_shadow  ${
        d.status ? styles.color_green : styles.color_red
      }`}
    >
      <span>{d.subCatName}</span>
      <Switch
        onChange={() => onEditSubGame(d._id, d.status, d.catName_id)}
        checked={d.status}
      />
    </div>
  ));
  return (
    <Modal
      open={modalMasterSubGame}
      onOk={() => dispatch(setModalMasterSubGame(false))}
      onCancel={() => dispatch(setModalMasterSubGame(false))}
      cancelButtonProps={{ style: { display: "none" } }}
      width={800}
      okText={"Save"}
      className="modalStyle"
    >
      <div className={styles.sup_game_cat}>{list}</div>
    </Modal>
  );
}

export default UserSubGameBox;
