import React from "react";
import { PiNumberCircleTwoDuotone } from "react-icons/pi";
import { PiNumberCircleThreeDuotone } from "react-icons/pi";
import { setFilterTwoDArr } from "../../../Feactures/twoDapiSlice";
import { setConditionLuckyNo } from "../../../Feactures/twoDapiSlice";
import { useDispatch } from "react-redux";

import styles from "./LuckyNoCategory.module.css";

function LuckyNoCategory({
  setLuckyNoShow,
  setLuckyTwoDShow,
  setLucyThreeDShow,
  allDArr,
}) {
  const dispatch = useDispatch();

  const handleClick = (id, catName) => {
    if (catName === "2D Lottries") {
      dispatch(setLuckyNoShow(true));

      dispatch(setFilterTwoDArr({ id: id }));
      dispatch(setLuckyTwoDShow(true));
      dispatch(setLucyThreeDShow(false));
    } else {
      dispatch(setLuckyNoShow(true));
      dispatch(setFilterTwoDArr({ id: id }));
      dispatch(setLuckyTwoDShow(false));
      dispatch(setLucyThreeDShow(true));
    }
  };

  const list = allDArr?.map((d) => (
    <li
      key={d._id}
      className="box_shadow"
      onClick={() => handleClick(d._id, d.cat_name)}
    >
      <span className={styles.icons}>
        {d.cat_name === "2D Lottries" ? (
          <PiNumberCircleTwoDuotone />
        ) : (
          <PiNumberCircleThreeDuotone />
        )}
      </span>
      <span> {d.cat_name}</span>
    </li>
  ));
  return (
    <div className={styles.lucky_no_cate}>
      <ul>{list}</ul>
    </div>
  );
}

export default LuckyNoCategory;
