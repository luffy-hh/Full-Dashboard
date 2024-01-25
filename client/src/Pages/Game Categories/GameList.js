import React from "react";
import styles from "./GameCategories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setModalSupGameCat } from "../../Feactures/modalSlice";
import {
  setClickSubName,
  setFilterSupGameArr,
  fetPatchGameCat,
} from "../../Feactures/twoDapiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { Switch } from "antd";

function GameList({ category, activeFun }) {
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  const handleSupCat = (id, catName) => {
    dispatch(setModalSupGameCat(true));
    dispatch(setClickSubName(catName));
    dispatch(setFilterSupGameArr({ id: id }));
  };

  const handleCloseGame = (data, id, status) => {
    const patchData = { id: id, status: !status };
    dispatch(fetPatchGameCat({ api: "gamecat", patchData, accessToken }));
    dispatch(activeFun(data));
  };

  const list =
    category &&
    category.map((d) => (
      <li
        key={d._id}
        className={`box_shadow ${
          d.status ? styles.color_green : styles.color_red
        }`}
      >
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleSupCat(d._id, d.cat_name)}
        >
          {d.cat_name}
        </span>
        <Switch
          defaultChecked={d.status}
          onChange={() => handleCloseGame(d.cat_name, d._id, d.status)}
        />
      </li>
    ));
  return <ul className={`${styles.game_cat_container} box_shadow`}>{list}</ul>;
}

export default GameList;
