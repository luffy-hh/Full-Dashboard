import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetGetGameCat,
  selectAllTwoDArr,
  fetGetSubGameCat,
} from "../../Feactures/twoDapiSlice";

import { selectlogInData } from "../../Feactures/apiSlice";

import LuckyNoCategory from "./LuckyNoCategory/LuckyNoCategory";

import TwoDLuckyNo from "./TwoDLuckyNo";
import ThreeDLuckyNo from "./ThreeDLuckyNo";

function LuckyNumber() {
  const [show, setShow] = useState(false);
  const [threeDshow, setThreeDShow] = useState(false);
  const [twoDShow, setTwoDShow] = useState(false);

  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const allTwoDArr = useSelector(selectAllTwoDArr);

  useEffect(() => {
    dispatch(fetGetGameCat({ api: "gamecat", accessToken }));
    dispatch(fetGetSubGameCat({ api: "gamesubcat", accessToken }));
  }, []);

  return (
    <div className="page_style">
      {!show && (
        <LuckyNoCategory
          show={show}
          setShow={setShow}
          setThreeDShow={setThreeDShow}
          setTwoDShow={setTwoDShow}
          allDArr={allTwoDArr}
        />
      )}
      {twoDShow && <TwoDLuckyNo />}
      {threeDshow && <ThreeDLuckyNo />}
    </div>
  );
}

export default LuckyNumber;
