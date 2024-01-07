import React, { useEffect, useState } from "react";
import styles from "./ThaiTwoD12am.module.css";
import ThaiTwoDHeader from "./ThaiTwoDHeader";

import {
  showTable1,
  showTable3,
  showTable2,
} from "../../Feactures/adminTwodSlice";
import {
  fetGetLuckyNoHistory,
  fetGetSubGameCat,
  selectSubGameCat,
  setFilterTwoDReportHistroy,
  selectTwoDReportHistory,
  fetGetLuckyWinner,
  selectThreeDReportHistory,
} from "../../Feactures/twoDapiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { setShowDropDown } from "../../Feactures/ShowHideSlice";
import { useDispatch, useSelector } from "react-redux";
import ThaiTwoDTable from "./ThaiTwoDTable";
import ThaiTable3 from "./ThaiTable3";
import ThaiTwoDTable2 from "./ThaiTwoDTable2";
import Dropdown from "../../Component/Dropdown/Dropdown";
import { selectCollapsed } from "../../Feactures/modalSlice";

function ThaiTwoD12am() {
  const table1 = useSelector(showTable1);
  const table3 = useSelector(showTable3);
  const table2 = useSelector(showTable2);
  const dispatch = useDispatch();
  const gameSubCat = useSelector(selectSubGameCat);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const [selectText, setSelectText] = useState("Choose Category");
  const twoDReportHistory = useSelector(selectTwoDReportHistory);
  const threeDReportHistory = useSelector(selectThreeDReportHistory);
  const collapsed = useSelector(selectCollapsed);

  useEffect(() => {
    dispatch(fetGetSubGameCat({ api: "gamesubcat", accessToken }));
  }, []);

  console.log(selectText);

  useEffect(() => {
    if (selectText.includes("3d")) {
      console.log("3dapi");
      dispatch(fetGetLuckyNoHistory({ api: "thai3D", accessToken }));
      dispatch(fetGetLuckyWinner({ api: "thai3DLuckyWinner", accessToken }));
    } else {
      console.log("2dapi");
      dispatch(fetGetLuckyNoHistory({ api: "thai2dsale", accessToken }));
      dispatch(fetGetLuckyWinner({ api: "thai2DLuckyWinners", accessToken }));
    }
  }, [selectText]);

  console.log(twoDReportHistory && twoDReportHistory, "history");

  const resultDict = {};

  const calFun = (obj) => {
    obj?.forEach((entry) => {
      const { number, amount } = entry;

      if (number in resultDict) {
        resultDict[number].amount += amount;
        resultDict[number].count += 1;
      } else {
        resultDict[number] = { amount, count: 1 };
      }
    });
  };

  const mainFun = () => {
    if (selectText.includes("3d")) {
      calFun(threeDReportHistory);
    } else {
      calFun(twoDReportHistory);
    }
  };

  mainFun();

  const resultList = Object.entries(resultDict).map(([number, values]) => ({
    number: number,
    ...values,
  }));

  console.log(resultList);

  const gameSubCatArr = gameSubCat?.data.allSubGameCat;

  const handleData = (id, subName) => {
    if (selectText.includes("3d")) {
      setSelectText(subName);
      dispatch(setShowDropDown());
    } else {
      dispatch(setFilterTwoDReportHistroy(id));
      setSelectText(subName);
      dispatch(setShowDropDown());
    }
  };
  const list = gameSubCatArr?.map((d) => (
    <li key={d._id} onClick={() => handleData(d._id, d.subCatName)}>
      {d.subCatName}
    </li>
  ));

  return (
    <div
      className={collapsed ? "page_style_coll" : "page_style"}
      style={{ overflow: "hidden" }}
    >
      <div className={`box_shadow ${styles.two_d_head_container}`}>
        <ThaiTwoDHeader />
        <p>{selectText}</p>
        <Dropdown width={"25rem"} title={selectText} list={list} />
      </div>
      {table1 && <ThaiTwoDTable mainData={resultList} text={selectText} />}
      {table2 && <ThaiTwoDTable2 mainData={resultList} text={selectText} />}
      {table3 && (
        <ThaiTable3
          mainData={
            selectText.includes("3d") ? threeDReportHistory : twoDReportHistory
          }
          text={selectText}
        />
      )}
    </div>
  );
}

export default ThaiTwoD12am;
