import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetGetGameCat,
  selectAllTwoDArr,
  fetGetSubGameCat,
} from "../../Feactures/twoDapiSlice";

import {
  selectLuckyTwoDShow,
  selectLuckyNoShow,
  selectLuckyThreeDShow,
  setLucyThreeDShow,
  setLuckyTwoDShow,
  setLuckyNoShow,
} from "../../Feactures/adminTwodSlice";
import { selectCollapsed } from "../../Feactures/modalSlice";

import { selectlogInData } from "../../Feactures/apiSlice";

import LuckyNoCategory from "./LuckyNoCategory/LuckyNoCategory";

import TwoDLuckyNo from "./TwoDLuckyNo";
import ThreeDLuckyNo from "./ThreeDLuckyNo";

function LuckyNumber() {
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const allTwoDArr = useSelector(selectAllTwoDArr);
  const luckyNoShow = useSelector(selectLuckyNoShow);
  const luckyTwoDShow = useSelector(selectLuckyTwoDShow);
  const luckyThreeDShow = useSelector(selectLuckyThreeDShow);
  const collapsed = useSelector(selectCollapsed);

  useEffect(() => {
    dispatch(fetGetGameCat({ api: "gamecat", accessToken }));
    dispatch(fetGetSubGameCat({ api: "gamesubcat", accessToken }));
  }, []);

  return (
    <div
      className={collapsed ? "page_style_coll" : "page_style"}
      style={{ overflow: "hidden" }}
    >
      {!luckyNoShow && (
        <LuckyNoCategory
          setLuckyNoShow={setLuckyNoShow}
          setLuckyTwoDShow={setLuckyTwoDShow}
          setLucyThreeDShow={setLucyThreeDShow}
          allDArr={allTwoDArr}
        />
      )}
      {luckyTwoDShow && (
        <TwoDLuckyNo
          setLuckyNoShow={setLuckyNoShow}
          setLuckyTwoDShow={setLuckyTwoDShow}
          setLucyThreeDShow={setLucyThreeDShow}
        />
      )}
      {luckyThreeDShow && (
        <ThreeDLuckyNo
          setLuckyNoShow={setLuckyNoShow}
          setLuckyTwoDShow={setLuckyTwoDShow}
          setLucyThreeDShow={setLucyThreeDShow}
        />
      )}
    </div>
  );
}

export default LuckyNumber;
