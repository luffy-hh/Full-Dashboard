import React, { useState } from "react";
import styles from "../CustomBox.module.css";
import {
  selectModalEditCom,
  setModalEditCom,
} from "../../../Feactures/modalSlice";
import { selectCommisionId } from "../../../Feactures/modalSlice";
import {
  fetchPatchCommision,
  selectEditCommision,
  selectEditCommisionStatus,
} from "../../../Feactures/apiSlice";

import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";

function EditCommisionBox({ masterId, accessToken }) {
  const modalEditCom = useSelector(selectModalEditCom);
  const dispatch = useDispatch();
  const commisionId = useSelector(selectCommisionId);

  const [commision, setCommision] = useState("");
  const [mainComposition, setMainComposition] = useState("");
  const [otherCom, setOtherCom] = useState("");

  const editCommision = useSelector(selectEditCommision);
  const editCommisionStatus = useSelector(selectEditCommisionStatus);

  console.log(masterId, editCommision && editCommision);

  const patchData = {
    comession: Number(commision),
    mainCompensation: Number(mainComposition),
    subCatIdToUpdate: commisionId._id,
    otherCompensation: Number(otherCom),
  };

  const handlePost = () => {
    dispatch(
      fetchPatchCommision({
        api: `mastersubcatstatus/${masterId}`,
        patchData,
        accessToken: accessToken,
      })
    );

    if (editCommision.status === "Success") {
      setCommision("");
      setMainComposition("");
      setOtherCom("");
      dispatch(setModalEditCom(false));
    }
  };
  return (
    <Modal
      title={`Edit ${commisionId.subCatName}`}
      open={modalEditCom}
      onOk={() => handlePost()}
      onCancel={() => dispatch(setModalEditCom(false))}
      cancelButtonProps={{ style: { display: "none" } }}
      width={600}
      okText={editCommisionStatus === "loading" ? "Loading" : "Submit"}
      className="modalStyle"
    >
      <form className={styles.bank_input}>
        <div>
          <label>Commision</label>
          <input
            type="text"
            value={commision}
            onChange={(e) => setCommision(e.target.value)}
          />
        </div>
        <div>
          <label>MainCompensation</label>
          <input
            type="text"
            value={mainComposition}
            onChange={(e) => setMainComposition(e.target.value)}
          />
        </div>
        <div>
          <label>Other Compensation</label>
          <input
            type="text"
            value={otherCom}
            onChange={(e) => setOtherCom(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
}

export default EditCommisionBox;
