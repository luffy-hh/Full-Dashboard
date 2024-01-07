import React, { useState, useEffect } from "react";
import Container from "../../Component/Container";
import Button from "../../Component/Button";
import {
  fetchPatchMainUnit,
  selectlogInData,
  selectpatchMainUnitStatus,
  selectpatchMainUnitData,
  fetchMainUnit,
} from "../../Feactures/apiSlice";

import { useSelector, useDispatch } from "react-redux";
import styles from "./CreateUnit.module.css";
function CreateUnitForm() {
  const [newMainUnit, setNewMainUnit] = useState("");
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const patchMainUnitData = useSelector(selectpatchMainUnitData);
  const accessToken = logInData.token;
  const patchMainUnitStatus = useSelector(selectpatchMainUnitStatus);

  const patchData = { mainUnit: Number(newMainUnit), status: "in" };

  //  //patch main Unit update new Unit
  const addUnitHandle = (e) => {
    e.preventDefault();
    dispatch(fetchPatchMainUnit({ api: "mainunit", patchData, accessToken }));
    setNewMainUnit("");
  };

  useEffect(() => {
    dispatch(fetchMainUnit({ api: "mainunit", accessToken }));
  }, [patchMainUnitData]);

  return (
    <div className={styles.create_uint_page_container}>
      <h3>Create Unit</h3>
      <Container className={styles.form_container}>
        <form autoComplete="off">
          <div>
            <label>Unit Amount</label>
            <input
              type="number"
              value={newMainUnit}
              onChange={(e) => setNewMainUnit(e.target.value)}
              placeholder="Enter Unit Amount"
            />
          </div>
          <Button
            onClick={(e) => addUnitHandle(e)}
            className={styles.btn_create_unit}
          >
            {patchMainUnitStatus === "loading" ? "loading" : "Submit"}
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default CreateUnitForm;
