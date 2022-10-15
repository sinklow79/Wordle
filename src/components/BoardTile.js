import React, { memo, useRef } from "react";
import styled, { keyframes, css } from "styled-components";

const BoardTile = memo(({ bgColor, val, col, rot }) => {
  const renderCounter = useRef(0);
  renderCounter.current++;
  //   console.log(val + " ~ " + renderCounter.current);
  return (
    <Tile col={col} rot={rot} bgColor={bgColor} val={val}>
      <Letter col={col} rot={rot}>
        {val}
      </Letter>
    </Tile>
  );
});

const Letter = styled.div`
  animation: ${(props) =>
    props.rot && `rot 400ms ${props.col * 400 + "ms"} linear forwards`};
  @keyframes rot {
    from {
      transform: rotateX(0);
    }
    to {
      transform: rotateX(-180deg);
    }
  }
`;

const bg = (bgColor) => keyframes`
    to {
        background-color: ${bgColor};
        border-color: ${bgColor}
    }
`;

const scale = keyframes`
    0% {
        transform: scale(1);
    }
    10% {
        transform: scale(.8);
    }
    90% {
        transform: scale(1.04);
    }
    100% {
        transform: scale(1);
    }
`;

const bgAnimation = (props) => css`
  animation: flip 400ms ${props.col * 400}ms linear forwards,
    ${bg(props.bgColor)} 400ms ${props.col * 400}ms linear forwards;
`;

const scaleAnimation = () => css`
  animation: ${scale} 250ms ease forwards;
`;

const Tile = styled.div`
  ${(props) => props.val && scaleAnimation}
  ${(props) => props.rot && bgAnimation(props)};
  @keyframes flip {
    from {
      transform: rotateX(0deg);
    }
    to {
      transform: rotateX(180deg);
    }
  }
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  border: 1px solid rgba(255, 255, 255, 0.55);
  font-size: 32px;
  font-weight: 700;
  &::before {
    content: "";
    display: inline-block;
    padding-bottom: 100%;
  }
`;

export default BoardTile;
