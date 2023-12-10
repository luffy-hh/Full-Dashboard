import React from "react";
import PlayerTop from "./PlayerTop";
import Players from "./Players";

function AllPlayer({ showAns, data }) {
  console.log(data && data, "from all");
  const updateData = data[0]?.players.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        position: { top: "-8rem", right: `calc(75vw - 65vw)` },
      };
    } else if (index === 1) {
      return { ...item, position: { top: "7rem", right: `calc(75vw - 78vw)` } };
    } else if (index === 2) {
      return {
        ...item,
        position: { bottom: "-7rem", right: `calc(75vw - 60vw)` },
      };
    } else if (index === 3) {
      return {
        ...item,
        position: { bottom: "-7rem", left: `calc(75vw - 60vw)` },
      };
    } else if (index === 4) {
      return { ...item, position: { top: "7rem", left: `calc(75vw - 78vw)` } };
    } else if (index === 5) {
      return { ...item, position: { top: "-8rem", left: `calc(75vw - 65vw)` } };
    } else {
      return item;
    }
  });

  return (
    <>
      {updateData?.map((d, index) => {
        if (updateData) {
          if (index === 0 || index === 5) {
            return <PlayerTop data={d} showAns={showAns} />;
          } else {
            return <Players data={d} showAns={showAns} />;
          }
        } else {
          return;
        }
      })}
    </>
  );
}

export default AllPlayer;
