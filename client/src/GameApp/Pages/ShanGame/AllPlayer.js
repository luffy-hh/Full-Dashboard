import React, { useState } from "react";
import PlayerTop from "./PlayerTop";
import Players from "./Players";
import PullCard from "./PullCard/PullCard";
import { selectPullCard } from "../../../Feactures/shan";
import { useSelector } from "react-redux";

function AllPlayer({ data, number }) {
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

  //original
  // const accounts = data.map((item, index) => {
  //   if (index === 0) {
  //     return {
  //       ...item,
  //       position: { top: "-8rem", right: `calc(75vw - 65vw)` },
  //     };
  //   } else if (index === 1) {
  //     return {
  //       ...item,
  //       position: { top: "7rem", right: `calc(75vw - 78vw)` },
  //     };
  //   } else if (index === 2) {
  //     return {
  //       ...item,
  //       position: { bottom: "-7rem", right: `calc(75vw - 60vw)` },
  //     };
  //   } else if (index === 3) {
  //     return {
  //       ...item,
  //       position: { bottom: "-7rem", left: `calc(75vw - 60vw)` },
  //     };
  //   } else if (index === 4) {
  //     return {
  //       ...item,
  //       position: { top: "7rem", left: `calc(75vw - 78vw)` },
  //     };
  //   } else if (index === 5) {
  //     return {
  //       ...item,
  //       position: { top: "-8rem", left: `calc(75vw - 65vw)` },
  //     };
  //   } else {
  //     return item;
  //   }
  // });

  const shan = [
    {
      type: "club",
      name: "A",
      value: 1,
    },
    {
      type: "club",
      name: "2",
      value: 2,
    },
    {
      type: "club",
      name: "3",
      value: 3,
    },
    {
      type: "club",
      name: "4",
      value: 4,
    },
    {
      type: "club",
      name: "5",
      value: 5,
    },
    {
      type: "club",
      name: "6",
      value: 6,
    },
    {
      type: "club",
      name: "7",
      value: 7,
    },
    {
      type: "club",
      name: "8",
      value: 8,
    },
    {
      type: "club",
      name: "9",
      value: 9,
    },
    {
      type: "club",
      name: "10",
      value: 10,
    },
    {
      type: "club",
      name: "jack",
      value: 10,
    },
    {
      type: "club",
      name: "queen",
      value: 10,
    },
    {
      type: "club-king",
      name: "king",
      value: 10,
    },

    {
      type: "diamond",
      name: "A",
      value: 1,
    },
    {
      type: "diamond",
      name: "2",
      value: 2,
    },
    {
      type: "diamond",
      name: "3",
      value: 3,
    },
    {
      type: "diamond",
      name: "4",
      value: 4,
    },
    {
      type: "diamond",
      name: "5",
      value: 5,
    },
    {
      type: "diamond",
      name: "6",
      value: 6,
    },
    {
      type: "diamond",
      name: "7",
      value: 7,
    },
    {
      type: "diamond",
      name: "8",
      value: 8,
    },
    {
      type: "diamond",
      name: "9",
      value: 9,
    },
    {
      type: "diamond",
      name: "10",
      value: 10,
    },
    {
      type: "diamond",
      name: "jack",
      value: 10,
    },
    {
      type: "diamond",
      name: "queen",
      value: 10,
    },
    {
      type: "diamond",
      name: "king",
      value: 10,
    },

    {
      type: "heart",
      name: "A",
      value: 1,
    },
    {
      type: "heart",
      name: "2",
      value: 2,
    },
    {
      type: "heart",
      name: "3",
      value: 3,
    },
    {
      type: "heart",
      name: "4",
      value: 4,
    },
    {
      type: "heart",
      name: "5",
      value: 5,
    },
    {
      type: "heart",
      name: "6",
      value: 6,
    },
    {
      type: "heart",
      name: "7",
      value: 7,
    },
    {
      type: "heart",
      name: "8",
      value: 8,
    },
    {
      type: "heart",
      name: "9",
      value: 9,
    },
    {
      type: "heart",
      name: "10",
      value: 10,
    },
    {
      type: "heart",
      name: "jack",
      value: 10,
    },
    {
      type: "heart",
      name: "queen",
      value: 10,
    },
    {
      type: "heart",
      name: "king",
      value: 10,
    },

    {
      type: "spade",
      name: "A",
      value: 1,
    },
    {
      type: "spade",
      name: "2",
      value: 2,
    },
    {
      type: "spade",
      name: "3",
      value: 3,
    },
    {
      type: "spade",
      name: "4",
      value: 4,
    },
    {
      type: "spade",
      name: "5",
      value: 5,
    },
    {
      type: "spade",
      name: "6",
      value: 6,
    },
    {
      type: "spade",
      name: "7",
      value: 7,
    },
    {
      type: "spade",
      name: "8",
      value: 8,
    },
    {
      type: "spade",
      name: "9",
      value: 9,
    },
    {
      type: "spade",
      name: "10",
      value: 10,
    },
    {
      type: "spade",
      name: "jack",
      value: 10,
    },
    {
      type: "spade",
      name: "queen",
      value: 10,
    },
    {
      type: "spade",
      name: "king",
      value: 10,
    },
  ];

  // const shanArray = [];
  // const shanArrayValue = () => {
  //   let shanVal = Math.round(Math.random() * 51);
  //   if (shanArray.includes(shanVal)) {
  //     shanVal = Math.round(Math.random() * 51);
  //   } else {
  //     shanArray.push(shanVal);
  //   }
  // };

  // let i = 0;
  // while (i < 1) {
  //   shanArrayValue();
  //   if (shanArray.length === 27) {
  //     i++;
  //   }
  // }

  // accounts.forEach((acc, i) => acc.shan.push(shanArray[i]));
  // shanArray.splice(0, 9);
  // accounts.forEach((acc, i) => acc.shan.push(shanArray[i]));
  // shanArray.splice(0, 9);

  // accounts.forEach((acc) => acc.shanValue.push(shan[acc.shan[0]].value));
  // accounts.forEach((acc) => acc.shanValue.push(shan[acc.shan[1]].value));

  // accounts.forEach(
  //   (acc) => (acc.total = acc.shanValue.reduce((accr, val) => accr + val))
  // );
  // console.log(accounts);

  // accounts.forEach(
  //   (acc) => (acc.shanFinalValue = Number(acc.total.toString().slice(-1)))
  // );

  // for (let i = 0; i < accounts.length; i++) {
  //   if (accounts[i].shanFinalValue === 0) {
  //     accounts[i].speakValue = "Buu";
  //   } else if (accounts[i].shanFinalValue === 8) {
  //     accounts[i].speakValue = "8 Doo";
  //   } else if (accounts[i].shanFinalValue === 9) {
  //     accounts[i].speakValue = "9 Doo";
  //   } else {
  //     accounts[i].speakValue = accounts[i].shanFinalValue;
  //   }
  // }

  // const [bankerObject] = accounts.filter((acc) => acc.player_roll === "banker");

  // for (let i = 0; i < accounts.length; i++) {
  //   if (accounts[i].hasOwnProperty("banker")) {
  //     continue;
  //   }
  //   if (accounts[i].shanFinalValue >= bankerObject.shanFinalValue) {
  //     accounts[i].result = "Win";
  //   } else {
  //     accounts[i].result = "Lose";
  //   }
  // }

  // //after action

  // const update = () => {
  //   accounts[2].total += number;

  //   accounts.forEach(
  //     (acc) => (acc.shanFinalValue = Number(acc.total.toString().slice(-1)))
  //   );

  //   for (let i = 0; i < accounts.length; i++) {
  //     if (accounts[i].shanFinalValue === 0) {
  //       accounts[i].speakValue = "Buu";
  //     } else if (accounts[i].shanFinalValue === 8) {
  //       accounts[i].speakValue = "8 Doo";
  //     } else if (accounts[i].shanFinalValue === 9) {
  //       accounts[i].speakValue = "9 Doo";
  //     } else {
  //       accounts[i].speakValue = accounts[i].shanFinalValue;
  //     }
  //   }

  //   const [bankerObject] = accounts.filter(
  //     (acc) => acc.player_roll === "banker"
  //   );

  //   for (let i = 0; i < accounts.length; i++) {
  //     if (accounts[i].hasOwnProperty("banker")) {
  //       continue;
  //     }
  //     if (accounts[i].shanFinalValue >= bankerObject.shanFinalValue) {
  //       accounts[i].result = "Win";
  //     } else {
  //       accounts[i].result = "Lose";
  //     }
  //   }
  // };

  return (
    <>
      {accounts?.map((d, index) => {
        if (accounts) {
          if (index === 0 || index === 5) {
            return <PlayerTop key={`player_${index}`} data={d} index={index} />;
          } else {
            return <Players key={`player_${index}`} data={d} index={index} />;
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
