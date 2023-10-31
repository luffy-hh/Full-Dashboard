import React, { useState } from "react";
import {
  selectModalCloseNo,
  setModalCloseNo,
  selectCloseNoData,
} from "../../Feactures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Switch } from "antd";
import {
  selectPatchCloseNoStatus,
  fetPatchCloseNo,
} from "../../Feactures/twoDapiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import styles from "./CustomBox.module.css";

function CloseNoBox() {
  const modalCloseNo = useSelector(selectModalCloseNo);
  const closeNoData = useSelector(selectCloseNoData);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const patchCloseNoStatus = useSelector(selectPatchCloseNoStatus);
  const dispatch = useDispatch();
  const [limitAmount, setLimitAmount] = useState(closeNoData?.limitAmount);
  const [isClose, setIsClose] = useState(closeNoData.status);

  const handleChnage = (checked) => {
    setIsClose(checked);
  };

  const patchData = {
    id: closeNoData?._id,
    status: isClose,
    limitAmount: limitAmount,
  };

  const handleSubmit = () => {
    dispatch(
      fetPatchCloseNo({ api: "lottery2dthai12", patchData, accessToken })
    );

    if (patchCloseNoStatus === "succeeded") {
      dispatch(setModalCloseNo(false));
    }
  };

  return (
    <Modal
      title={`Edit Number ${closeNoData.number}`}
      open={modalCloseNo}
      onOk={handleSubmit}
      onCancel={() => dispatch(setModalCloseNo(false))}
      cancelButtonProps={{ style: { display: "none" } }}
      width={600}
      okText={patchCloseNoStatus === "loading" ? "loading" : "Submit"}
      className="modalStyle"
    >
      <form className={styles.bank_input}>
        <div>
          <label>Status</label>
          <Switch checked={isClose} onChange={handleChnage} />
        </div>
        <div>
          <label>Limit Amount</label>
          <input
            disabled={!isClose}
            type="number"
            value={limitAmount}
            onChange={(e) => setLimitAmount(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
}

export default CloseNoBox;
