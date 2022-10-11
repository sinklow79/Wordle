import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import Tile from "./Tile";

const Keyboard = ({
  handleKeyboardClick,
  handleEnterClick,
  handleDeleteClick,
}) => {
  const keyboardSetup = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
  ];

  const handleKeydown = useCallback(
    (e) => {
      const pressedKey = e.key.toUpperCase();
      if (pressedKey === "ENTER") handleEnterClick();
      else if (pressedKey === "BACKSPACE") handleDeleteClick();
      else if (/^[A-Z]$/.test(pressedKey)) handleKeyboardClick(pressedKey);
    },
    [handleDeleteClick, handleEnterClick, handleKeyboardClick]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  });

  return (
    <KeyboardContainer>
      {keyboardSetup.map((arr, idx) => (
        <KeyboardRow key={idx + arr[0]}>
          {arr.map((val) => (
            <Tile
              handleKeyboardClick={handleKeyboardClick}
              handleEnterClick={handleEnterClick}
              handleDeleteClick={handleDeleteClick}
              key={val}
              val={val}
            />
          ))}
        </KeyboardRow>
      ))}
    </KeyboardContainer>
  );
};

const KeyboardContainer = styled.div`
  min-height: calc(calc(58px * 3) + 14px);
`;
const KeyboardRow = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  column-gap: 7px;
  justify-content: center;
`;

export default Keyboard;
