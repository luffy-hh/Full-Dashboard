import React from "react";
import { setMasterGameCat } from "../../../Feactures/apiSlice";
import { fetPatchMasterGameCat } from "../../../Feactures/twoDapiSlice";
import {
  selectlogInData,
  setFilterMasterSubGameCat,
} from "../../../Feactures/apiSlice";

import { Switch } from "antd";
import { setModalMasterSubGame } from "../../../Feactures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "../CustomBox.module.css";

function UserDetailGameCat({ data, masterId, subGameArr }) {
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  const subHanlde = (catName) => {
    const filterData = subGameArr?.filter((d) => d.catName === catName);
    dispatch(setFilterMasterSubGameCat(filterData));
    dispatch(setModalMasterSubGame(true));
  };

  const closeGameHandle = (id, status) => {
    const patchData = {
      catIdToUpdate: id,
      status: !status,
    };

    dispatch(
      fetPatchMasterGameCat({
        api: `mastercatstatus/${masterId}`,
        patchData,
        accessToken,
      })
    );
    dispatch(setMasterGameCat({ id: id }));
  };

  const list = data?.map((d) => (
    <li
      key={d._id}
      className={`box_shadow ${styles.close_game} ${
        d.status ? "color_green" : "color_red"
      }`}
    >
      <span style={{ cursor: "pointer" }} onClick={() => subHanlde(d.cat_name)}>
        {d.cat_name}
      </span>
      <Switch
        checked={d.status}
        onChange={() => closeGameHandle(d.cat_id, d.status)}
      />
    </li>
  ));

  return (
    <section className={styles.game_cat_container}>
      <h3>Game Category</h3>
      <ul>{list}</ul>
    </section>
  );
}

export default UserDetailGameCat;
