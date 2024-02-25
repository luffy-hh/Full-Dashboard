import React, { useState } from "react";
import PlayerTop from "./PlayerTop";
import Players from "./Players";
import PullCard from "./PullCard/PullCard";
import { selectPullCard } from "../../../Feactures/shan";
import { useSelector } from "react-redux";

function AllPlayer({ data, number, bank_amt, allShowResult }) {
  const pullCard = useSelector(selectPullCard);

  const accounts = data.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        // position: { top: "-8rem", right: `calc(75vw - 65vw)` },
        position: { bottom: "-7rem", right: `calc(75vw - 60vw)` },
      };
    } else if (index === 1) {
      return {
        ...item,
        position: { top: "-8rem", right: `calc(75vw - 65vw)` },
        // position: { top: "7rem", right: `calc(75vw - 78vw)` },
      };
    } else if (index === 2) {
      return {
        ...item,
        // position: { top: "-8rem", right: `calc(75vw - 65vw)` },
        position: { top: "7rem", right: `calc(75vw - 78vw)` },
      };
    } else if (index === 3) {
      return {
        ...item,
        position: { bottom: "-7rem", left: `calc(75vw - 60vw)` },
      };
    } else if (index === 4) {
      return {
        ...item,
        position: { top: "7rem", left: `calc(75vw - 78vw)` },
      };
    } else if (index === 5) {
      return {
        ...item,
        position: { top: "-8rem", left: `calc(75vw - 65vw)` },
      };
    } else {
      return item;
    }
  });

  return (
    <>
      {accounts?.map((d, index) => {
        if (accounts) {
          if (index === 1 || index === 5) {
            return (
              <PlayerTop
                key={`player_${index}`}
                data={d}
                index={index}
                bank_amt={bank_amt}
                allShowResult={allShowResult}
              />
            );
          } else {
            return (
              <Players
                key={`player_${index}`}
                data={d}
                index={index}
                bank_amt={bank_amt}
                allShowResult={allShowResult}
              />
            );
          }
        } else {
          return;
        }
      })}

      {/* {pullCard && <PullCard update={update} />} */}
    </>
  );
}

export default AllPlayer;
