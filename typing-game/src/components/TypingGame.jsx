import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import "./TypingGame.css";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const TypingGame = () => {
  const [paragraph, setParagraph] = useState(
    "What is the brain? The brain is a complex organ that controls thought, memory, emotion, touch, motor skills, vision, breathing, temperature, hunger and every process that regulates our body. Together, the brain and spinal cord that extends from it make up the central nervous system, or CNS. What is the brain made of? Weighing about 3 pounds in the average adult, the brain is about 60% fat. The remaining 40% is a combination of water, protein, carbohydrates and salts. The brain itself is a not a muscle. It contains blood vessels and nerves, including neurons and glial cells."
  );
  const [typed, setTyped] = useState("");
  const [time, setTime] = useState(60);
  const [focused, setFocused] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const paragraphRef = useRef(null);
  const typingRef = useRef(null);
  // const currentCharRef = useRef(null);

  const fetchParagraph = async () => {
    try {
        const res = await axios.get("http://metaphorpsum.com/paragraphs/2/4");
        setParagraph(res.data)
    } catch (error) {
        
    }
  };

  const handlePaste = async (e) => {
    e.preventDefault();
    const text = await navigator.clipboard.readText();
    setParagraph(text);
    handleReset();
  };

  const handleReset = () => {
    setTime(60);
    setTyped("");
    setStartGame(false);
    setConfetti(false);
  };

  const handleTyping = (e) => {
    // Move screen to current typing position
    // let pos = currentCharRef.current.offsetTop - 200;
    // window.scrollTo(0, pos < 0 ? 0 : pos);
    if (time > 0 && startGame) {
      setTyped(e.target.value);
    }
    if (startGame === false && e.target.value.length === 1) {
      setTyped(e.target.value);
      setStartGame(true);
    } else if (e.target.value === paragraph) {
      setConfetti(true);
      setStartGame(false);
    }
  };

  useEffect(() => {
    let interval = null;
    if (startGame) {
      interval =
        time > 0 &&
        setInterval(() => {
          setTime((time) => time - 1);
        }, 1000);
      if (time === 0) setStartGame(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [time, startGame]);

  return (
    <>
      {confetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          recycle={false}
        />
      )}
      {/* <div className="game-tip">
            Click on the paragraph and start typing.
            <br/>
            <br/>
            You can erase mistakes or go backwards by pressing backspace.
        </div> */}
        <div>
        <h2 className="heading">Typing Speed Test</h2>
        </div>
      <div className="typing-game-container">
        <div
          className={`typing-game${
            paragraph === typed
              ? " winner"
              : time === 0
              ? " time-out"
              : time <= 10
              ? " time-running-out"
              : focused
              ? " focused"
              : ""
          }`}
        >
          <div className="game-data">
            {" "}
            <div>
              Mistakes:{" "}
              <strong>
                {
                  paragraph
                    .slice(0, typed.length)
                    .split("")
                    .filter((letter, index) => typed.charAt(index) !== letter)
                    .length
                }
              </strong>
            </div>
            <div title="Word per minute">
              {/* Calculate word per minute */}
              WPM: <strong>{typed.split(" ").length}</strong>
            </div>
            <div title="Character per minute">
              CPM: <strong>{typed.split("").length}</strong>
            </div>
            <div>
              Time Left:{" "}
              <strong className={`${time === 0 ? "text-danger" : ""}`}>
                {time}s
              </strong>
            </div>
          </div>
          <p ref={paragraphRef} onClick={() => typingRef.current.focus()}>
            {paragraph
              .slice(0, typed.length)
              .split("")
              .map((letter, index) => (
                // Check if the letter is the same as the typed letter
                <span
                  key={index}
                  className={
                    typed.charAt(index) === letter ? "correct" : "incorrect"
                  }
                >
                  {letter}
                </span>
              ))}
            <span
              className={`${focused ? "current-character" : ""}`}
              // ref={currentCharRef}
            >
              {paragraph.slice(typed.length, typed.length + 1)}
            </span>
            {paragraph.slice(typed.length + 1)}
          </p>
          {time > 0 && (
            <input
              ref={typingRef}
              type="text"
              className="hidden"
              value={typed}
              maxLength={paragraph.length}
              onFocus={(e) => {
                setFocused(true);
                typingRef.current.selectionEnd = typed.length;
              }}
              onBlur={() => setFocused(false)}
              onChange={handleTyping}
            />
          )}
          <div className="game-info">
            <div className="btn" onClick={fetchParagraph}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                <path
                  fillRule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                />
              </svg>
              Update
            </div>
            <div className="btn" onClick={handlePaste}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
              Paste
            </div>
            <div className="btn" onClick={handleReset}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
              </svg>
              Reset
            </div>
          </div>
        </div>
      </div>
      <div className="info">
        <h3>For more projects, follow me on:</h3>
        <div className="icons">
          <a
            href="https://www.linkedin.com/in/duryab-khan-876819265/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} color="black" />
          </a>

          <a
            href="https://github.com/devduryab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} color="black" />
          </a>
        </div>
        <p className="name">Duryab Khan</p>
      </div>
    </>
  );
};

export default TypingGame;
