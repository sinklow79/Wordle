import React, { memo } from "react";
import { useMemo } from "react";
import styled, { css, keyframes } from "styled-components";

const Tile = memo(
  ({ val, handleKeyboardClick, handleDeleteClick, handleEnterClick, usedLetters }) => {
    // const renderCounter = useRef(0);
    // renderCounter.current++;
    // console.log(val + " - " + renderCounter.current);

    const handleClick = () => {
      if (val === "ENTER") handleEnterClick();
      else if (val === "DELETE") handleDeleteClick();
      else handleKeyboardClick(val);
    };

    const backgroundColor = useMemo(() => usedLetters.correct.has(val) ? "#538d4e" : usedLetters.present.has(val) ? "#b59f3b" : usedLetters.absent.has(val) ? "#3a3a3c" : "", [usedLetters, val])


    return (
      <TileContainer
        onClick={handleClick}
        val={val === "ENTER" ? "big" : val === "DELETE" ? "big" : ""}
        bg={backgroundColor}
      >
        {val}
      </TileContainer>
    );
  }
);

const bgKeyframes = (bgColor) => keyframes`
    to {
        background-color: ${bgColor};
        border-color: ${bgColor}
    }
`;

const bg = (props) => css`
  animation: ${bgKeyframes(props)} 400ms 1600ms linear forwards;
`

const TileContainer = styled.div`
  flex: 1;
  background-color: #616364;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-weight: 700;
  height: 58px;

  font-size: ${(props) => (props.val === "big" ? "10px" : "14px")};
  padding: 0 ${(props) => (props.val === "big" ? "5px" : "0")};
  @media (min-width: 600px) {
    font-size: ${(props) => (props.val === "big" ? "10px" : "14px")};
    width: ${(props) => (props.val === "big" ? "66px" : "43px")};
    flex: initial;
    padding: 0;
  }
  ${props => props.bg && bg(props.bg)};
`;

export default Tile;
