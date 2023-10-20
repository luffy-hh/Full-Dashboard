import React, { useState } from "react";
import styles from "./CustomBox.module.css";
import {
  selectFilterSubGameArr,
  closeSupGameCat,
  fetchFilterPatchLotterySetting,
} from "../../Feactures/twoDapiSlice";
import {
  selectModalSupGameCat,
  setModalSupGameCat,
} from "../../Feactures/modalSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Modal } from "antd";

function SubGameCatBox({ title }) {
  const [cond, setCond] = useState(true);
  const dispatch = useDispatch();
  const modalSupGameCat = useSelector(selectModalSupGameCat);
  const filterSubGameArr = useSelector(selectFilterSubGameArr);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  const clickHandle = () => {
    dispatch(setModalSupGameCat(false));
  };

  const onEditSubGame = (id, status) => {
    dispatch(closeSupGameCat(id));
    setCond(status);
    console.log(status);
    dispatch(
      fetchFilterPatchLotterySetting({
        api: `gamesubcat`,
        patchData: { id: id, status: status },
        accessToken,
      })
    );
  };

  const list =
    filterSubGameArr &&
    filterSubGameArr.map((d) => (
      <div
        key={d._id}
        className={`${styles.sup_game} box_shadow  ${
          d.status ? styles.color_green : styles.color_red
        }`}
      >
        <span>{d.subCatName}</span>
        <Switch
          onChange={() => onEditSubGame(d._id, d.status)}
          defaultChecked={d.status}
        />
      </div>
    ));

  return (
    <>
      <Modal
        title={title}
        centered
        open={modalSupGameCat}
        onOk={clickHandle}
        onCancel={() => dispatch(setModalSupGameCat(false))}
        cancelButtonProps={{ style: { display: "none" } }}
        width={700}
        okText={"Save"}
        className="modalStyle"
      >
        <div className={styles.sup_game_cat}>{list}</div>
      </Modal>
    </>
  );
}

export default SubGameCatBox;
