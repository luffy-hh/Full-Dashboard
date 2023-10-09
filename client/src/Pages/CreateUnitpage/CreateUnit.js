import React from "react";
import styles from "./CreateUnit.module.css";

import CreateUnitForm from "./CreateUnitForm";

function CreateUnit() {
  return (
    <div className={styles.createUnitPage}>
      <CreateUnitForm />
    </div>
  );
}

export default CreateUnit;
