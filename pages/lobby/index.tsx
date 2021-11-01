import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import css from "../../styles/Lobby.module.css";

import Button from "../../components/elements/Buttons";
import LoadingMessage from "../../components/elements/LoadingMessage";
import Modal from '../../components/modules/Modals';

import socket from "../../utils/socket";

const Lobby = () => {
  const router = useRouter();
  const [playerList, setPlayerList] = useState([]);
  const [pin, setPin] = useState(null);
  const [showStartingMessage, setShowStartingMessage] = useState(false);
  const [gameExists, setGameExists] = useState(true);

  const joinGame = (pin, username) =>
    socket.emit("join-game", { pin, username });

  const createGame = (username, gameData = {}) =>
    socket.emit("create-game", { username, gameData });

  const startGame = () => socket.emit("host-start");

  useEffect(() => {
    console.log("SOCKET ID @ LOBBY: ", socket);

    const { username, pin, questions } = router.query;
    if (pin) {
      joinGame(pin, username);
    }
    if (questions) {
      createGame(username, { rounds: questions });
    }

    socket.on("share-pin", ({ pin }) => {
      console.log(pin);
      setPin(pin);
    });
    socket.on("player-joined", ({ players }) => setPlayerList(players));
    socket.on("host-starting", ({ gamePin }) => {
      setShowStartingMessage(true);
      setTimeout(() => {
        router.push({
          pathname: "/game",
          query: {
            pin: gamePin,
          },
        });
      }, 4000);
    });
    socket.on("no-game-found", () => setGameExists(false));
  }, []);

  return (
    <main className={css.main}>
      <h1 className={css.title}>LOBBY {pin && `Pin: ${pin}`}</h1>
      {pin && !showStartingMessage && (
        <Button text="Start Game" handleClick={startGame} />
      )}
      {showStartingMessage && (
        <LoadingMessage text="Host is starting the game soon" />
      )}
      <ul className={css.playerList}>
        <h3>Who's in the game?:</h3>
        {playerList.map((player, i) => {
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
      </ul>
      {!gameExists &&
      <Modal
        text="Sorry, no game found"
        hasBtn={true}
        isLink={true}
        btnData={{
          text: 'OK',
          url: '/',
        }}
      />}
    </main>
  );
};

export default Lobby;
