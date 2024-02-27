import React, { useEffect, useState } from "react";
import styles from "./ShanGame.module.css";
import DumyCard from "./DumyCard";
import BettingAmount from "./BettingAmount";
import { io } from "socket.io-client";

import { useParams } from "react-router-dom";
import { selectBettingTime, selectPullCard } from "../../../Feactures/shan";
import { useSelector, useDispatch } from "react-redux";
import AllPlayer from "./AllPlayer";
import BankerCatch from "./BankerCatch";
import PlayerNextCard from "./PlayerNextCard";
import ShowCard from "./ShowCard/ShowCard";

function ShanPlay({ tableId, activeUser }) {
  // adding to create a component for each user
  //   const { tableId } = useParams();
  //   const [userIdArr, setUserIdArr] = useState([]);
  //   let activeUser;
  //   useEffect(() => {
  //     activeUser = tableId.slice(-6);
  //   }, [tableId]);

  const randomNumber = Math.floor(Math.random() * 10) + 1;

  const dispatch = useDispatch();

  const bettingTime = useSelector(selectBettingTime);
  const [mainObj, setMainObj] = useState([]);
  const [mainAmount, setMainAmount] = useState([]);
  const [cardHandling, setCardHandling] = useState(false);
  console.log(tableId, activeUser);
  const [bankerAmt, setBankerAmt] = useState({});
  const [activePlayer, setActivePlayer] = useState({});
  const [allShowResult, setAllShowResult] = useState(false);

  const socketJoin = io(`https://gamevegas.online/${tableId}`);

  socketJoin.emit("userData", {
    userId: activeUser,
    tableId: tableId,
  });

  socketJoin.on("dataFromServer", (data) => {
    console.log(data);

    setMainAmount([data.message.max_amt, data.message.min_amt]);

    let getBankerAmt = data.message.tableArr.find(
      (d) => d.player_role === "banker"
    );

    let activePlayers = data.message.tableArr.find(
      (d) => d.userId === activeUser
    );
    setActivePlayer(activePlayers);
    setBankerAmt(getBankerAmt);

    let players = data.message.tableArr; //player Array

    let userIndex = players.findIndex((player) => player.userId === activeUser);

    console.log(userIndex);

    // If the loginUser is found and not already at index 0, move it to index 0
    if (userIndex !== -1 && userIndex !== 0) {
      let removedUser = players.splice(userIndex, 1)[0]; // Get the removed user

      // Insert the removed loginUser at index 0
      players.unshift(removedUser);
    }

    setMainObj([...players]);
  });

  console.log(mainObj, bankerAmt);

  // useEffect(() => {
  //   // expfun();
  //   joinFun();
  // }, [activeUser]);

  return (
    <div className={styles.shan_game}>
      <div className={styles.shan_table}>
        <img src="/shangame/lady/Girl.png" alt="lady" className={styles.lady} />

        {mainObj.length > 0 && (
          <DumyCard
            mainObj={mainObj}
            setMainObj={setMainObj}
            cardHandling={cardHandling}
            counts={mainObj.length}
            setCardHandling={setCardHandling}
            number={randomNumber}
            socketJoin={socketJoin}
          />
        )}

        {mainObj.length > 0 && (
          <AllPlayer
            data={mainObj}
            number={randomNumber}
            bank_amt={bankerAmt?.bank_amt}
            allShowResult={allShowResult}
          />
        )}
      </div>

      {activePlayer.player_role === "player" && bettingTime && (
        <BettingAmount
          mainAmount={mainAmount}
          socket={socketJoin}
          userId={activeUser}
          setMainObj={setMainObj}
        />
      )}

      {activePlayer.player_role === "banker" ? (
        <BankerCatch
          socket={socketJoin}
          userId={activeUser}
          setMainObj={setMainObj}
          mainObj={mainObj}
          tableIdForMatch={`${tableId}`}
          setAllShowResult={setAllShowResult}
        />
      ) : (
        <PlayerNextCard
          socket={socketJoin}
          userId={activeUser}
          setMainObj={setMainObj}
          mainObj={mainObj}
        />
      )}
    </div>
  );
}

export default ShanPlay;
