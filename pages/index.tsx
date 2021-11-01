import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

import Form from "../components/modules/Forms/FormWithLink";
import TextInput from "../components/elements/TextInputs";
import NumberInput from "../components/elements/NumberInputs";
import ExpandableSection from '../components/modules/ExpandableSection';

import socket from "../utils/socket";

export default function Home() {
  const [username, setUsername] = useState("");
  const [hostname, setHostname] = useState("");
  const [questions, setQuestions] = useState(1);
  const [gamePin, setGamePin] = useState<number|null>(null);

  useEffect(() => {
    console.log("SOCKET ID @ HOME: ", socket);
    socket.on("connect-test", (data) => console.log(data));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Amazing Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Totally Amazing Quiz</h1>
        <Image src={"/choose.png"} height={200} width={200} />
        <ExpandableSection title="Join A Game">
        <Form
          buttonValues={{
            text: "JOIN!",
            url: {
              pathname: "/lobby",
              query: {
                username,
                pin: gamePin && gamePin.toString(),
              },
            },
          }}
        >
          <TextInput
            label="Username"
            name="username"
            textState={username}
            handleChange={(e) => setUsername(e.target.value)}
          />
          <NumberInput
            label="Game Pin"
            name="game-pin"
            numberState={gamePin}
            handleChange={(e) => setGamePin(e.target.value)}
          />
        </Form>
        </ExpandableSection>
        <ExpandableSection title="Create a Game">
        <Form
          buttonValues={{
            text: "CREATE!",
            url: {
              pathname: "/lobby",
              query: {
                questions: questions.toString(),
                username: hostname,
              },
            },
          }}
        >
          <TextInput
            label="Username"
            name="username"
            textState={hostname}
            handleChange={(e) => setHostname(e.target.value)}
          />
          <NumberInput
            label="How many questions?"
            name="questions"
            numberState={questions}
            handleChange={(e) => setQuestions(e.target.value)}
            min={1}
            max={25}
          />
        </Form>
        </ExpandableSection>
      </main>
      {/* <footer className={styles.footer}>SD 2021</footer> */}
    </div>
  );
}
