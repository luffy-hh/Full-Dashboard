import React, { useState } from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectModalBankAcc,
  setModalBankAcc,
} from "../../Feactures/modalSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import {
  fetPostBankAcc,
  selectPostBankAccStatus,
  selectPostBankAcc,
} from "../../Feactures/bankApiSlice";
import { setShowDropDown } from "../../Feactures/ShowHideSlice";
import styles from "./CustomBox.module.css";
import Dropdown from "../Dropdown/Dropdown";
import UploadImg from "../UploadImg/UploadImg";

function BankAccBox({ bankName }) {
  const dispatch = useDispatch();
  const modalBankAcc = useSelector(selectModalBankAcc);
  const [selectBankName, setSelectBankName] = useState("Select Bank Name");
  const [bankNameData, setBankNameData] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postBankAccStatus = useSelector(selectPostBankAccStatus);
  const postBankAcc = useSelector(selectPostBankAcc);

  const hadnleData = (id, name) => {
    dispatch(setShowDropDown());
    setSelectBankName(name);
    setBankNameData(id);
  };

  const formData = new FormData();
  formData.append("bankNameData", bankNameData);
  formData.append("account_name", accountName);
  formData.append("account", accountNo);
  formData.append("description", description);
  formData.append("img", logo);

  const handleCancel = () => {
    dispatch(setModalBankAcc(false));
    dispatch(setModalBankAcc(false));
    setLogo(null);
    setDescription("");
    setAccountName("");
    setAccountNo("");
    setBankNameData("");
    setSelectBankName("Select Bank Name");
  };

  const handlePost = () => {
    if (bankNameData && accountName && accountNo && description && logo) {
      dispatch(fetPostBankAcc({ api: "bankAcc", formData, accessToken }));
    } else {
      alert("Fill All The Input Field");
    }
  };

  const bankList = bankName?.map((d) => (
    <li key={d._id} onClick={() => hadnleData(d._id, d.bankName)}>
      {d.bankName}
    </li>
  ));

  console.log(postBankAcc);

  return (
    <Modal
      title="Create Bank Account"
      open={modalBankAcc}
      onOk={() => handlePost()}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      width={700}
      okText={postBankAccStatus === "loading" ? "Loading" : "Submit"}
      className="modalStyle"
    >
      <form className={styles.bank_input}>
        <div>
          <label>Bank Name</label>

          <Dropdown width={"30rem"} title={selectBankName} list={bankList} />
        </div>

        <div>
          <label>Bank Account Name</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div>
          <label>Bank Account No</label>
          <input
            type="text"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default BankAccBox;
