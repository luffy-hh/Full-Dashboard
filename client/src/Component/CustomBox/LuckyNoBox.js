import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";

import {
  selectModalLucky,
  setModalLucky,
  setModalError,
} from "../../Feactures/modalSlice";
import {
  selectLuckyCate,
  selectLuckyNo,
  setLuckyCate,
  setLuckyNo,
} from "../../Feactures/adminTwodSlice";

import styles from "./CustomBox.module.css";
import CustomBoxError from "./CustomBoxError";

function LuckyNoBox({ category, postFun, api, accessToken, lottery }) {
  const modalLucky = useSelector(selectModalLucky);
  const lukyCate = useSelector(selectLuckyCate);
  const luckyNo = useSelector(selectLuckyNo);
  const [otherConpensation, setOtherConpensation] = useState("");

  const dispatch = useDispatch();

  const options = category?.map((d, i) => (
    <option key={i} value={d._id}>
      {d.subCatName}
    </option>
  ));

  const postData = { number: luckyNo, subCatId: lukyCate };

  const clickHandle = () => {
    if (luckyNo && lukyCate) {
      dispatch(postFun({ api: api, postData, accessToken: accessToken }));
      dispatch(setModalLucky(false));
    } else {
      dispatch(setModalError(true));
      dispatch(setModalLucky(false));
    }
  };

  console.log(otherConpensation.split(","));

  return (
    <>
      <CustomBoxError
        message={"Error Fill All The Field"}
        closeFun={setModalLucky}
      />
      <Modal
        title="Create Lucky No"
        centered
        open={modalLucky}
        onOk={clickHandle}
        onCancel={() => dispatch(setModalLucky(false))}
        cancelButtonProps={{ style: { display: "none" } }}
        width={700}
        okText={"Save"}
        className="modalStyle"
      >
        <div className={`${styles.lucky_no}`}>
          <select
            value={lukyCate}
            onChange={(e) => dispatch(setLuckyCate(e.target.value))}
          >
            <option value="">Choose SubCategories</option>

            {options}
          </select>
          <input
            value={luckyNo}
            onChange={(e) => dispatch(setLuckyNo(e.target.value))}
            placeholder="Enter Lucky No"
          />
          {lottery === "3D" && (
            <input
              value={otherConpensation}
              onChange={(e) => setOtherConpensation(e.target.value)}
              placeholder="Enter other Compensation (eg. 300, 400, 555)"
            />
          )}
        </div>
      </Modal>
    </>
  );
}

export default LuckyNoBox;
