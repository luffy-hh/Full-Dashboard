import React, { useState } from "react";
import { Modal } from "antd";
import {
  selectModalDeposite,
  setModalDeposite,
} from "../../Feactures/modalSlice";
import {
  fetPostBankType,
  selectPostBankTypeStatus,
} from "../../Feactures/bankApiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CustomBox.module.css";

function CreateDepositeBox() {
  const [bankName, setBankName] = useState("");
  const modalDeposite = useSelector(selectModalDeposite);
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postBankTypeStatus = useSelector(selectPostBankTypeStatus);

  const handleSubmit = () => {
    dispatch(
      fetPostBankType({
        api: "banktype",
        postData: { name: bankName },
        accessToken,
      })
    );

    dispatch(setModalDeposite(postBankTypeStatus === "succeeded" && false));
  };

  return (
    <Modal
      title="Create Bank Type"
      open={modalDeposite}
      onOk={handleSubmit}
      onCancel={() => dispatch(setModalDeposite(false))}
      cancelButtonProps={{ style: { display: "none" } }}
      width={600}
      okText={postBankTypeStatus === "loading" ? "loading" : "Submit"}
      className="modalStyle"
    >
      <form className={styles.bank_input}>
        <div>
          <label>Bank Type</label>
          <input
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
}

export default CreateDepositeBox;
