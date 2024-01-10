import React from "react";
import { FaCopy } from "react-icons/fa";
import styles from "./CopyID.module.css";
import { message } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";

function CopyID({ id }) {
  const handleCopy = () => {
    // const copyContent = document.getElementById("textToCopy");
    // const textToCopy = copyContent.innerText;

    // navigator.clipboard.writeText(textToCopy);

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

        <CopyToClipboard text={id} onCopy={() => handleCopy()}>
          <span className={styles.copy_icon}>
            <FaCopy />
          </span>
        </CopyToClipboard>
      </td>
    </>
  );
}

export default CopyID;
