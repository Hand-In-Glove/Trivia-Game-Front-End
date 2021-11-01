import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import socket from '../../utils/socket';

import GameDisplay from '../../components/modules/GameDisplay'

import css from '../../styles/Game.module.css'

// const question = {"question":"In the webcomic Homestuck, the first character introduced is Dave Strider.","choices":["True","False", "Third", "Fourth"],"correctAnswer":"False"}

export default function Game() {
  const router = useRouter();
  const { pin } = router.query; 
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [round, setRound] = useState(null);

  const answerQuestion = (answer) => {
    setSelectedAnswer(answer);
    socket.emit("player-answer", { answer, pin });
  }

  useEffect(() => {
    socket.emit('get-question', { pin });
    socket.on('sent-question', ({ question, round }) => {
      setQuestion(question);
      setRound(round);
    });
    socket.on('round-over', () => {
      router.push({
        pathname: "/results",
        query: { pin },
      })
    })
    // socket.on('game-over', () => {
    //   router.push({
    //     pathname: "/results",
    //     query: { pin },
    //   })
    // })
  },[]);

  return (
  <article className={css.main}>
    {!question && <h1>Loading Screen</h1>}
    {question && !selectedAnswer && (
    <>
      <h1>Round: {round}</h1>
      <GameDisplay question={question} selectAnswer={answerQuestion} />
    </>
    )}
    {selectedAnswer && (
    <>
      <h1>Waiting for others...</h1>
      <h2>You chose: {selectedAnswer}</h2>
    </>
    )}
  </article>
  );
}
