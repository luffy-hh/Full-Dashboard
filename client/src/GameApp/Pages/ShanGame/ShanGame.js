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

function ShanGame() {
  const { tableId } = useParams();
  const activeUser = tableId.slice(-6);

  const randomNumber = Math.floor(Math.random() * 10) + 1;

  const dispatch = useDispatch();

  const bettingTime = useSelector(selectBettingTime);
  const [mainObj, setMainObj] = useState([]);
  const [mainAmount, setMainAmount] = useState([]);
  const [cardHandling, setCardHandling] = useState(false);
  console.log(tableId.slice(0, tableId.length - 6));
  const [bankerAmt, setBankerAmt] = useState({});
  const [activePlayer, setActivePlayer] = useState({});
  const [allShowResult, setAllShowResult] = useState(false);

  const joinFun = () => {
    const socketJoin = io(
      `https://gamevegas.online/${tableId.slice(0, tableId.length - 6)}`
    );

    socketJoin.emit("userData", {
      userId: activeUser,
      tableId: tableId.slice(0, tableId.length - 6),
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

      let userIndex = players.findIndex(
        (player) => player.userId == activeUser
      );

      console.log(userIndex);

      // If the loginUser is found and not already at index 0, move it to index 0
      if (userIndex !== -1 && userIndex !== 0) {
        let removedUser = players.splice(userIndex, 1)[0]; // Get the removed user

        // Insert the removed loginUser at index 0
        players.unshift(removedUser);
      }

      setMainObj([...players]);
    });
  };

  console.log(mainObj, bankerAmt);

  useEffect(() => {
    // expfun();
    joinFun();
  }, [tableId]);

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
            tableId={`https://gamevegas.online/${tableId.slice(
              0,
              tableId.length - 6
            )}`}
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
          tableId={`https://gamevegas.online/${tableId.slice(
            0,
            tableId.length - 6
          )}`}
          userId={activeUser}
          setMainObj={setMainObj}
        />
      )}

      {activePlayer.player_role === "banker" ? (
        <BankerCatch
          tableId={`https://gamevegas.online/${tableId.slice(
            0,
            tableId.length - 6
          )}`}
          userId={activeUser}
          setMainObj={setMainObj}
          mainObj={mainObj}
          tableIdForMatch={`${tableId.slice(0, tableId.length - 6)}`}
          setAllShowResult={setAllShowResult}
        />
      ) : (
        <PlayerNextCard
          tableId={`https://gamevegas.online/${tableId.slice(
            0,
            tableId.length - 6
          )}`}
          userId={activeUser}
          setMainObj={setMainObj}
          mainObj={mainObj}
        />
      )}
    </div>
  );
}

export default ShanGame;
