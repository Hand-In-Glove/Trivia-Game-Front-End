import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import css from "../../styles/Results.module.css";

// import Modal from '../../components/modules/Modals';
import Button from "../../components/elements/Buttons";
import LoadingMessage from '../../components/elements/LoadingMessage';

import socket from "../../utils/socket";

const Results = () => {
  const router = useRouter();
  const { pin } = router.query;

  const [answer, setAnswer] = useState(null);
  const [players, setPlayers] = useState({ winners: [], losers: [] });
  const [isHost, setIsHost] = useState(false);
  const [leaderboard, setLeaderboard] = useState(null);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  const startNextRound = () => socket.emit("host-next-round", { pin })

  useEffect(() => {
    socket.emit('get-results', { pin });

    socket.on("send-results", ({ results, host }) => {
      const { correctAnswer, correctPlayers, incorrectPlayers } = results
      setAnswer(correctAnswer)
      setPlayers({ winners: correctPlayers, losers: incorrectPlayers });
      setIsHost(host === socket.id);
    });

    socket.on("send-final-results", ({ results, host }) => {
      console.log('FINAL')
      setLeaderboard(results);
      setIsHost(host === socket.id);
    });

    socket.on("starting-next-round", () => {
      setShowLoadingMessage(true);
      setTimeout(() => {
        router.push({
          pathname: "/game",
          query: { pin },
        });
      }, 4000)
    })
  }, []);

  return (
    <main className={css.main}>
      <h1 className={css.title}>Results</h1>
      {isHost && !showLoadingMessage && !leaderboard && <Button text="Next Round" handleClick={startNextRound} />}
      {showLoadingMessage && <LoadingMessage text="Next round starting" />}
      {leaderboard ? 
      (<ul className={css.playerList}>
        {leaderboard.map((player, i) => {
          return player.isHost ? (
            <div className={css.hostName} key={i}>
              {`${player.username} (Host)     Score: ${player.score}`}
            </div>
          ) : (
            <div className={css.playerName} key={i}>
              {`${player.username}     Score: ${player.score}`}
            </div>
          );
        })}
      </ul>)
      :(<ul className={css.playerList}>
        <h2>Answer: {answer}</h2>
        <h3>Winners:</h3>
        {players.winners.map((player, i) => {
          return player.isHost ? (
            <div className={css.hostName} key={i}>
              {`${player.username} (Host)`}
            </div>
          ) : (
            <div className={css.playerName} key={i}>
              {`${player.username}`}
            </div>
          );
        })}
        <h3>Losers:</h3>
        {players.losers.map((player, i) => {
          return player.isHost ? (
            <div className={css.hostName} key={i}>
              {`${player.username} (Host)`}
            </div>
          ) : (
            <div className={css.playerName} key={i}>
              {`${player.username}`}
            </div>
          );
        })}
      </ul>)}
    </main>
  );
};

export default Results;
