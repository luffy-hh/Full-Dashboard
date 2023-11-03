import React, { useState } from "react";
import { Modal } from "antd";
import {
  selectModalDiffDepo,
  setModalDifDepo,
} from "../../Feactures/modalSlice";
import {
  fetPostBankName,
  selectPostBankNameStatus,
} from "../../Feactures/bankApiSlice";
import { setShowDropDown } from "../../Feactures/ShowHideSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CustomBox.module.css";
import Dropdown from "../Dropdown/Dropdown";
import UploadImg from "../UploadImg/UploadImg";

function DifferentDepositeBox({ allBankArr }) {
  const modalDeposite = useSelector(selectModalDiffDepo);
  const dispatch = useDispatch();
  const [bankType, setBankType] = useState("");
  const [selectBankType, setSelectBankType] = useState("Select Bank Type");
  const [bankName, setBankName] = useState("");
  const [logo, setLogo] = useState(null);

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postBankNameStatus = useSelector(selectPostBankNameStatus);

  const hadleData = (id, name) => {
    setBankType(id);
    setSelectBankType(name);
    dispatch(setShowDropDown());
  };

  const bankList = allBankArr?.map((d) => (
    <li key={d._id} onClick={() => hadleData(d._id, d.name)}>
      {d.name}
    </li>
  ));

  const formData = new FormData();
  formData.append("bankTypeId", bankType);
  formData.append("name", bankName);
  formData.append("img", logo);

  const handlePost = () => {
    dispatch(fetPostBankName({ api: "bankName", formData, accessToken }));

    if (postBankNameStatus === "succeeded") {
      dispatch(setModalDifDepo(false));
      setBankType("");
      setBankName("");
      setLogo("");
    }
  };
  return (
    <Modal
      title="Create Bank Name"
      open={modalDeposite}
      onOk={() => handlePost()}
      onCancel={() => dispatch(setModalDifDepo(false))}
      cancelButtonProps={{ style: { display: "none" } }}
      width={600}
      okText={postBankNameStatus === "loading" ? "loading" : "Submit"}
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

export default DifferentDepositeBox;
