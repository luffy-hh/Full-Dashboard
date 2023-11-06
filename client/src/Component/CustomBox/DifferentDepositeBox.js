import React, { useState } from "react";
import { Modal } from "antd";
import {
  selectModalDiffDepo,
  setModalDifDepo,
} from "../../Feactures/modalSlice";
import {
  selectPostBankTypeStatus,
  fetPostBankType,
} from "../../Feactures/bankApiSlice";
import { setShowDropDown } from "../../Feactures/ShowHideSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CustomBox.module.css";
import Dropdown from "../Dropdown/Dropdown";

function DifferentDepositeBox({ allBankArr }) {
  const modalDeposite = useSelector(selectModalDiffDepo);
  const dispatch = useDispatch();
  const [bankCatData, setBankCatData] = useState("");
  const [bankTypeName, setBankTypeName] = useState("");
  const [selectBankType, setSelectBankType] = useState(
    "Select Bank Categories"
  );

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postBankTypeStatus = useSelector(selectPostBankTypeStatus);

  const hadleData = (id, name) => {
    setBankCatData(id);
    setSelectBankType(name);
    dispatch(setShowDropDown());
  };

  const bankList = allBankArr?.map((d) => (
    <li key={d._id} onClick={() => hadleData(d._id, d.bankCatName)}>
      {d.bankCatName}
    </li>
  ));

  const postData = {
    bankCatData,
    bankTypeName,
  };

  const handlePost = () => {
    dispatch(fetPostBankType({ api: "banktype", postData, accessToken }));
    if (postBankTypeStatus === "succeeded") {
      dispatch(setModalDifDepo(false));
      setBankTypeName("");
      setBankCatData("");
      setBankCatData("Select Bank Categories");
    }
  };
  return (
    <Modal
      title="Create Bank Type"
      open={modalDeposite}
      onOk={() => handlePost()}
      onCancel={() => dispatch(setModalDifDepo(false))}
      cancelButtonProps={{ style: { display: "none" } }}
      width={600}
      okText={postBankTypeStatus === "loading" ? "loading" : "Submit"}
      className="modalStyle"
    >
      <form className={styles.bank_input}>
        <div>
          <label>Bank Category</label>

          <Dropdown width={"30rem"} title={selectBankType} list={bankList} />
        </div>
        <div>
          <label>Bank Type</label>
          <input
            type="text"
            value={bankTypeName}
            onChange={(e) => setBankTypeName(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
}

export default DifferentDepositeBox;
