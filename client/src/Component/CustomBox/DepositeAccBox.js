import React, { useState } from "react";
import { Modal } from "antd";
import {
  selectModalAccDepo,
  setModalAccDepo,
} from "../../Feactures/modalSlice";

import { selectlogInData } from "../../Feactures/apiSlice";

import {
  fetPostBankName,
  selectPostBankNameStatus,
} from "../../Feactures/bankApiSlice";

import { setShowDropDown } from "../../Feactures/ShowHideSlice";

import { useSelector, useDispatch } from "react-redux";
import styles from "./CustomBox.module.css";
import Dropdown from "../Dropdown/Dropdown";
import UploadImg from "../UploadImg/UploadImg";

function DepositeAccBox({ bankNameArr }) {
  const modalDeposite = useSelector(selectModalAccDepo);
  const loading = useSelector(selectPostBankNameStatus);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  const dispatch = useDispatch();
  const [bankType, setBankType] = useState("");
  const [bankName, setBankName] = useState("");

  const [logo, setLogo] = useState(null);
  const [selectBankType, setSelectBankType] = useState("Select Bank Type");

  const hadnleData = (id, name) => {
    setSelectBankType(name);
    setBankType(id);
    dispatch(setShowDropDown());
  };

  const bankList = bankNameArr?.map((d) => (
    <li key={d._id} onClick={() => hadnleData(d._id, d.bankTypeName)}>
      {d.bankTypeName}
    </li>
  ));

  const formData = new FormData();
  formData.append("bankType", bankType);
  formData.append("bankName", bankName);
  formData.append("img", logo);

  const handlePost = () => {
    dispatch(fetPostBankName({ api: "bankName", formData, accessToken }));

    if (loading === "succeeded") {
      dispatch(setModalAccDepo(false));
      setSelectBankType("Select Bank Type");
      setBankType("");
      setLogo(null);
      setBankName("");
    }
  };
  return (
    <Modal
      title="Create Bank Name"
      open={modalDeposite}
      onOk={() => handlePost()}
      onCancel={() => dispatch(setModalAccDepo(false))}
      cancelButtonProps={{ style: { display: "none" } }}
      width={600}
      okText={loading === "loading" ? "loading" : "Submit"}
      className="modalStyle"
    >
      <form className={styles.bank_input}>
        <div>
          <label>Bank Type</label>

          <Dropdown width={"30rem"} title={selectBankType} list={bankList} />
        </div>

        <div>
          <label>Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>

        <div>
          <label>Logo</label>
          <UploadImg setFile={setLogo} />
        </div>
      </form>
    </Modal>
  );
}

export default DepositeAccBox;
