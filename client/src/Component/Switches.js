import React from "react";
import { Switch, Space } from "antd";
import { useDispatch } from "react-redux";
import { showInputFun } from "../Feactures/AllUserPageSlice";

import styles from "./SwitchesGroup.module.css";

function Switches({ data }) {
  const dispatch = useDispatch();

  return (
    <Space direction="vertical" className={styles.switch_btn_container}>
      <lable className={styles.switch_lable}>{data.title}</lable>
      <Switch
        checkedChildren="On"
        unCheckedChildren="Off"
        onChange={() => dispatch(showInputFun({ title: data.title }))}
        style={{ backgroundColor: data.active ? "#1d4ed8" : "#dc2626" }}
      />
    </Space>
  );
}

export default Switches;
