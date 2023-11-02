import React, { useState } from "react";
import { Modal } from "antd";
import {
  selectModalAccDepo,
  setModalAccDepo,
} from "../../Feactures/modalSlice";

import { selectlogInData } from "../../Feactures/apiSlice";

import {
  fetPostBankAcc,
  selectPostBankAccStatus,
} from "../../Feactures/bankApiSlice";

import { useSelector, useDispatch } from "react-redux";
import styles from "./CustomBox.module.css";

function DepositeAccBox({ bankNameArr }) {
  const modalDeposite = useSelector(selectModalAccDepo);
  const loading = useSelector(selectPostBankAccStatus);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const ownerId = logInData.user._id;
  const dispatch = useDispatch();
  const [bankName, setBankName] = useState("");
  const [accNo, setAccNo] = useState("");
  const [name, setName] = useState("");
  const [bankAcc, setBankAcc] = useState("");
  const [logo, setLogo] = useState(null);

  const bankList = bankNameArr?.map((d) => (
    <option key={d._id} value={d._id}>
      {d.name}
    </option>
  ));

  const formData = new FormData();
  formData.append("bankNameId", bankName);
  formData.append("account", accNo);
  formData.append("img", logo);
  formData.append("name", name);
  formData.append("account_name", bankAcc);
  formData.append("ownerId", ownerId);

  const handlePost = () => {
    dispatch(fetPostBankAcc({ api: "bankAcc", formData, accessToken }));
    if (loading === "succeeded") {
      dispatch(setModalAccDepo(false));
      setAccNo("");
      setBankAcc("");
      setBankName("");
      setLogo(null);
      setName("");
    }
  };
  return (
    <Modal
      title="Create Bank Account"
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
          <label>Bank Name</label>
          <select
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          >
            <option value="">Select Bank Name</option>
            {bankList}
          </select>
        </div>
        <div>
          <label>Bank Account No</label>
          <input
            type="text"
            value={accNo}
            onChange={(e) => setAccNo(e.target.value)}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Accout Name</label>
          <input
            type="text"
            value={bankAcc}
            onChange={(e) => setBankAcc(e.target.value)}
          />
        </div>

        <div>
          <label>Logo</label>
          <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
        </div>
      </form>
    </Modal>
  );
}

export default DepositeAccBox;
