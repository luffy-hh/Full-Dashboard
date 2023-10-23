import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";

import { selectModalLucky, setModalLucky } from "../../Feactures/modalSlice";
import {
  selectLuckyCate,
  selectLuckyNo,
  setLuckyCate,
  setLuckyNo,
} from "../../Feactures/adminTwodSlice";

import styles from "./CustomBox.module.css";

function LuckyNoBox({ category, postFun, accessToken }) {
  const modalLucky = useSelector(selectModalLucky);
  const lukyCate = useSelector(selectLuckyCate);
  const luckyNo = useSelector(selectLuckyNo);

  const dispatch = useDispatch();

  const options = category?.map((d, i) => (
    <option key={i} value={d._id}>
      {d.subCatName}
    </option>
  ));

  const postData = { luckyNumber: luckyNo, subCatId: lukyCate };
  console.log(postData);

  const clickHandle = () => {
    dispatch(
      postFun({ api: "luckyNumbers", postData, accessToken: accessToken })
    );
    dispatch(setModalLucky(false));
  };

  return (
    <>
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
            <option value="">Choose 2D SubCategories</option>

            {options}
          </select>
          <input
            value={luckyNo}
            onChange={(e) => dispatch(setLuckyNo(e.target.value))}
            placeholder="Enter Lucky No"
          />
        </div>
      </Modal>
    </>
  );
}

export default LuckyNoBox;
