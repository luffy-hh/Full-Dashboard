import React, { useEffect, useState } from "react";
import styles from "./ShanGame.module.css";
import { useParams } from "react-router-dom";
import ShanPlay from "./ShanPlay";
function ShanGame() {
  // adding to create a component for each user
  const { tableId } = useParams();
  const [userIdArr, setUserIdArr] = useState([]);
  let activeUser;
  useEffect(() => {
    activeUser = tableId.slice(-6);
    setUserIdArr([...userIdArr, activeUser]);
  }, [tableId]);

  return (
    <>
      {userIdArr.map((userId, i) => {
        return (
          <ShanPlay
            tableId={tableId.slice(0, tableId.length - 6)}
            activeUser={userId}
          />
        );
      })}
    </>
  );
}

export default ShanGame;
