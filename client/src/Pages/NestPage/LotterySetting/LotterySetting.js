import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetGetSubGameCat,
  selectSubGameCat,
  setSubGameCatId,
} from "../../../Feactures/twoDapiSlice";
import { selectlogInData } from "../../../Feactures/apiSlice";
import styles from "./LotterySetting.module.css";
import { selectCollapsed } from "../../../Feactures/modalSlice";

function LotterySetting() {
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const subGameCat = useSelector(selectSubGameCat);
  const navigate = useNavigate();
  const collapsed = useSelector(selectCollapsed);

  useEffect(() => {
    dispatch(fetGetSubGameCat({ api: "gamesubcat", accessToken }));
  }, []);

  const subGameCatArr = subGameCat?.data.allSubGameCat;

  const handleChange = (id, index) => {
    navigate(`/admin/lottery2dand3d`);
    dispatch(setSubGameCatId({ id: id, index: index }));
  };

  const lottery = subGameCatArr?.map((l, index) => (
    <div
      onClick={() => handleChange(l._id, index)}
      key={l._id}
      className={`box_shadow ${styles.lottery_card}`}
    >
      <p>{l.subCatName}</p>
    </div>
  ));
  return (
    <div className={collapsed ? "page_style_coll" : "page_style"}>
      <div className={`box_shadow ${styles.lottery_setting_container}`}>
        {lottery}
      </div>
    </div>
  );
}

export default LotterySetting;
