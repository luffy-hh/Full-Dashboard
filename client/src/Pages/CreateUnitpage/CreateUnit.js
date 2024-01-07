import React from "react";
import styles from "./CreateUnit.module.css";
import { selectCollapsed } from "../../Feactures/modalSlice";

import CreateUnitForm from "./CreateUnitForm";
import { useSelector } from "react-redux";

function CreateUnit() {
  const collapsed = useSelector(selectCollapsed);
  return (
    <div className={collapsed ? styles.createUnit_coll : styles.createUnitPage}>
      <CreateUnitForm />
    </div>
  );
}

export default CreateUnit;
