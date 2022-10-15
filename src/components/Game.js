import React, { useReducer, useEffect, useCallback, useState } from "react";
import Keyboard from "./Keyboard";
import Board from "./Board";
import { generateWordSet } from "./words";
import Navbar from "./Navbar";
import styled from "styled-components";
import Stats from "./Stats";
import HowTo from "./HowTo";

const initialState = {
  board: new Array(6).fill([]).map(() => new Array(5).fill("")),
  pos: {
    row: 0,
    col: 0,
  },
  word: "",
  wordSet: new Set(),
};

function reducer(state, action) {
  const newBoard = [...state.board];
  const newPos = {
    row: state.pos.row,
    col: state.pos.col,
  };
  switch (action.type) {
    case "updateBoard":
      newBoard[state.pos.row][state.pos.col] = action.val;
      newPos.col++;
      return { ...state, board: newBoard, pos: { ...newPos } };
    case "enter":
      newPos.row++;
      newPos.col = 0;
      return { ...state, pos: { ...newPos } };
    case "delete":
      newBoard[state.pos.row][state.pos.col - 1] = "";
      newPos.col--;
      return { ...state, board: newBoard, pos: { ...newPos } };
    case "updateWord":
      return { ...state, word: action.word, wordSet: action.wordSet };
    case "reset":
      return {
        ...initialState,
        board: new Array(6).fill([]).map(() => new Array(5).fill("")),
      };
    default:
      throw new Error();
  }
}

const Game = () => {
  const [{ board, pos, word, wordSet }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [existence, setExistence] = useState(null);
  const [notEnough, setNotEnough] = useState(false);
  const [gameStatus, setgameStatus] = useState({
    won: false,
    over: false,
  });
  const [playerStats, setPlayerStats] = useState({
    played: 0,
    won: 0,
    wonRow: [0, 0, 0, 0, 0, 0],
  });
  const [openStats, setOpenStats] = useState({
    clicked: false,
    show: false,
    count: 0,
  });

  const [usedLetters, setUsedLetters] = useState({
    correct: new Set(),
    present: new Set(),
    absent: new Set(),
  });

  const [openHowTo, setOpenHowTo] = useState(true);

  const handleKeyboardClick = (val) => {
    if (gameStatus.over) return;
    if (pos.col === 5) return;
    dispatch({ type: "updateBoard", val: val });
  };

  const handleEnterClick = () => {
    if (gameStatus.over) return;
    if (pos.col !== 5) {
      setNotEnough(true);
      return;
    }
    const writtenWord = board[pos.row].join("").toLowerCase();
    if (wordSet.has(writtenWord)) {
      dispatch({ type: "enter" });
      let newCorrect = new Set(usedLetters.correct);
      let newPresent = new Set(usedLetters.present);
      let newAbsent = new Set(usedLetters.absent);
      for (let i = 0; i < 5; i++) {
        if (writtenWord[i] === word[i]) {
          newCorrect.add(writtenWord[i].toUpperCase());
        } else if (word.includes(writtenWord[i])) {
          newPresent.add(writtenWord[i].toUpperCase());
        } else {
          newAbsent.add(writtenWord[i].toUpperCase());
        }
      }
      setUsedLetters({
        correct: newCorrect,
        present: newPresent,
        absent: newAbsent,
      });
      if (writtenWord === word) {
        setgameStatus({
          win: true,
          over: true,
        });
        playerStats.wonRow[pos.row]++;
        setPlayerStats({
          played: playerStats.played + 1,
          won: playerStats.won + 1,
          wonRow: [...playerStats.wonRow],
        });
        localStorage.setItem("played", JSON.stringify(playerStats.played + 1));
        localStorage.setItem("won", JSON.stringify(playerStats.won + 1));
        localStorage.setItem("wonRow", JSON.stringify(playerStats.wonRow));
      } else if (pos.row === 5) {
        setgameStatus({
          win: false,
          over: true,
        });
        setPlayerStats({
          ...playerStats,
          played: playerStats.played + 1,
        });
        localStorage.setItem("played", JSON.stringify(playerStats.played + 1));
        localStorage.setItem("won", JSON.stringify(playerStats.won));
        localStorage.setItem("wonRow", JSON.stringify(playerStats.wonRow));
      }
    } else {
      setExistence(true);
    }
  };

  const handleDeleteClick = useCallback(() => {
    if (gameStatus.over) return;
    if (pos.col === 0) return;
    dispatch({ type: "delete" });
  }, [dispatch, pos.col, gameStatus.over]);

  useEffect(() => {
    // PLAYER STATS

    let played = JSON.parse(localStorage.getItem("played"));
    let won = JSON.parse(localStorage.getItem("won"));
    let wonRow = JSON.parse(localStorage.getItem("wonRow"));
    if (played) {
      setPlayerStats({
        played: played,
        won: won,
        wonRow: wonRow,
      });
    } else {
      localStorage.setItem("played", JSON.stringify(0));
      localStorage.setItem("won", JSON.stringify(0));
      localStorage.setItem("wonRow", JSON.stringify([0, 0, 0, 0, 0, 0]));
    }
  }, []);

  useEffect(() => {
    if (!word) {
      generateWordSet().then(({ wordSet, word }) => {
        dispatch({ type: "updateWord", word: word, wordSet: wordSet });
      });
    }
  }, [word]);

  useEffect(() => {
    let existenceInterval;
    if (existence) {
      existenceInterval = setInterval(() => {
        setExistence(null);
      }, 2500);
    }
    return () => clearInterval(existenceInterval);
  }, [existence]);

  useEffect(() => {
    let notEnoughInterval;
    if (notEnough) {
      notEnoughInterval = setInterval(() => {
        setNotEnough(null);
      }, 250);
    }
    return () => clearInterval(notEnoughInterval);
  }, [notEnough]);

  useEffect(() => {
    let statsInterval;
    if (gameStatus.over && !openStats.count) {
      statsInterval = setInterval(() => {
        setOpenStats({
          clicked: true,
          show: true,
          count: 1,
        });
      }, 2800);
    }
    return () => clearInterval(statsInterval);
  }, [gameStatus.over, openStats.count]);

  const handleStatsClick = () => {
    setOpenStats({ ...openStats, clicked: true, show: !openStats.show });
  };
  const reset = useCallback(() => {
    dispatch({ type: "reset" });
    setExistence(null);
    setNotEnough(false);
    setgameStatus({
      won: false,
      over: false,
    });
    setOpenStats({
      clicked: true,
      show: false,
      count: 0,
    });
    setUsedLetters({
      correct: new Set(),
      present: new Set(),
      absent: new Set(),
    });
  }, [dispatch]);

  const handleHowToClick = () => setOpenHowTo(!openHowTo);
  console.log(word);

  return (
    <>
      <HowTo handleClick={handleHowToClick} open={openHowTo} />
      <Stats
        handleStatsClick={handleStatsClick}
        openStats={openStats}
        reset={reset}
        playerStats={playerStats}
      />
      <Navbar
        handleStatsClick={handleStatsClick}
        handleHowToClick={handleHowToClick}
      />
      <GameContainer>
        {existence && (
          <div className="absolute top-[5px] z-[900] left-1/2 -translate-x-1/2 px-[18px] py-[10px] bg-white rounded-md text-black">
            not in word list
          </div>
        )}
        {gameStatus.win && <GameWin>Congratulations, you won!</GameWin>}
        {gameStatus.over && !gameStatus.win && (
          <div className="absolute z-[900] top-[5px] left-1/2 -translate-x-1/2 px-[18px] py-[10px] bg-[#3a3a3c] rounded-md font-extrabold text-[14px] tracking-[1px]">
            {word.toUpperCase()}
          </div>
        )}

        <Board
          board={board}
          boardRow={pos.row}
          word={word}
          notEnough={notEnough}
          existence={existence}
        />
        <Keyboard
          handleKeyboardClick={handleKeyboardClick}
          handleEnterClick={handleEnterClick}
          handleDeleteClick={handleDeleteClick}
          usedLetters={usedLetters}
        />
      </GameContainer>
    </>
  );
};

const GameContainer = styled.div`
  max-width: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-content: space-between;
  margin: 0 auto;
  height: calc(100% - 65px);
  padding: 0 16px;
`;

const GameWin = styled.div`
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 18px;
  background-color: #538d4e;
  border-radius: 0.375rem;
  z-index: 900;
  animation: appear 400ms ease 1600ms forwards;
  @keyframes appear {
    to {
      top: 5px;
    }
  }
`;

export default Game;
