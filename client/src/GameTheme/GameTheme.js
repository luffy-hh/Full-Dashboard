import React, { useEffect } from "react";
import { selectCollapsed, selectModalLog } from "../Feactures/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./GameTheme.module.css";
import {
  selectGameThing,
  selectGameThingHead,
  fetGetGameThing,
  setEditGameThing,
  selectPostGameThing,
} from "../Feactures/bankApiSlice";
import { selectlogInData } from "../Feactures/apiSlice";
import Tables from "../Component/Tables";
import NormalButton from "../Component/NormalButton";
import GameThingBox from "../Component/CustomBox/GameThingBox";
import { setModalGameThing } from "../Feactures/modalSlice";
function GameTheme() {
  const collapsed = useSelector(selectCollapsed);
  const gameThing = useSelector(selectGameThing);
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const gameThingHead = useSelector(selectGameThingHead);
  const postGameThing = useSelector(selectPostGameThing);

  useEffect(() => {
    dispatch(fetGetGameThing({ api: "things", accessToken }));
  }, [dispatch, postGameThing]);

  const handleClick = (text) => {
    dispatch(setEditGameThing(text));
    dispatch(setModalGameThing(true));
  };

  const tbody = gameThing?.response.map((d) => (
    <tr key={d._id} className="table_d_tbody_tr">
      <td>{d?.settingText}</td>
      <td>
        <NormalButton
          className={`btn_hover ${styles.btn_edit}`}
          onClick={() => handleClick(d.settingName)}
        >
          Edit
        </NormalButton>
      </td>
    </tr>
  ));
  return (
    <div className={collapsed ? "page_style_coll" : "page_style"}>
      <div className={`box_shadow ${styles.deposit_title}`}>GameThings</div>
      <div className={styles.game_theme}>
        <Tables thead={gameThingHead} tbody={tbody} />
      </div>
      <GameThingBox accessToken={accessToken} />
    </div>
  );
}

export default GameTheme;
