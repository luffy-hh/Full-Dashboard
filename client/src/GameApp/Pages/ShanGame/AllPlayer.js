import React from "react";
import PlayerTop from "./PlayerTop";
import Players from "./Players";

const userPost = [
  { top: "-8rem", right: `calc(75vw - 65vw)` },
  { top: "7rem", right: `calc(75vw - 78vw)` },
  { bottom: "-7rem", right: `calc(75vw - 60vw)` },

  { bottom: "-7rem", left: `calc(75vw - 60vw)` },
  { top: "7rem", left: `calc(75vw - 78vw)` },
  { top: "-8rem", left: `calc(75vw - 65vw)` },
];

function AllPlayer({ showAns }) {
  return (
    <>
      {userPost.map((d, index) => {
        if (index === 0 || index === userPost.length - 1) {
          return <PlayerTop data={d} showAns={showAns} />;
        } else {
          return <Players data={d} showAns={showAns} />;
        }
      })}
    </>
  );
}

export default AllPlayer;
