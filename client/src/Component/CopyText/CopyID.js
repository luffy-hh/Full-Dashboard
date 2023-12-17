import React from "react";
import { FaCopy } from "react-icons/fa";
import styles from "./CopyID.module.css";
import { message } from "antd";

function CopyID({ id }) {
  const handleCopy = () => {
    const copyContent = document.getElementById("textToCopy");
    const textToCopy = copyContent.innerText;

    navigator.clipboard.writeText(textToCopy);
    success();
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "ID Copied Successfully",
    });
  };
  return (
    <>
      {contextHolder}

      <td className={styles.copy_id_td}>
        <span id="textToCopy">{id}</span>

        <span className={styles.copy_icon} onClick={handleCopy}>
          <FaCopy />
        </span>
      </td>
    </>
  );
}

export default CopyID;
