import React from "react";
import styled from "styled-components";

const HowTo = ({ handleClick, open }) => {
  return (
    <Section open={open}>
      <Background onClick={() => handleClick()} />
      <Container>
        <Title>How To Play</Title>
        <Caption>Guess the Wordle in 6 tries.</Caption>
        <ul>
          <li>Each guess must be a valid 5-letter word.</li>
          <li>
            The color of the tiles will change to show how close your guess was
            to the word.
          </li>
        </ul>
        <H3Title>Examples</H3Title>
        <Row>
          <Tile open={open} bg="#538d4e">
            <span>W</span>
          </Tile>
          <Tile>E</Tile>
          <Tile>A</Tile>
          <Tile>R</Tile>
          <Tile>Y</Tile>
        </Row>
        <Explanation>
          <span>W</span> is in the word and in the correct spot.
        </Explanation>
        <Row>
          <Tile>P</Tile>
          <Tile open={open} bg="#b59f3b">
            <span>I</span>
          </Tile>
          <Tile>L</Tile>
          <Tile>L</Tile>
          <Tile>S</Tile>
        </Row>
        <Explanation>
          <span>I</span> is in the word but in the wrong spot.
        </Explanation>
        <Row>
          <Tile>V</Tile>
          <Tile>A</Tile>
          <Tile>G</Tile>
          <Tile open={open} bg="#3a3a3c">
            <span>U</span>
          </Tile>
          <Tile>E</Tile>
        </Row>
        <Explanation>
          <span>U</span> is not in the word in any spot.
        </Explanation>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  animation: ${(props) => (props.open ? "open" : "close")} 300ms ease forwards;

  @keyframes open {
    0% {
      top: -130%;
      z-index: -1;
    }
    100% {
      top: 0;
    }
  }
  @keyframes close {
    from {
      top: 0;
    }
    to {
      top: -130%;
    }
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
`;
const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: #121213;
  padding: 32px;
  max-width: 450px;
  width: calc(100% - 32px);
  overflow-y: auto;
  border-radius: 8px;
  max-height: 100%;

  ul {
    list-style: initial;
    padding-inline-start: 20px;
    margin: 20px 0;
  }
`;
const Title = styled.h2`
  font-size: 28px;
  font-weight: 00;
  margin-top: 20px;
  margin-bottom: 4px;
`;
const H3Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
`;
const Caption = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
`;
const Explanation = styled.p`
  font-size: 14px;
  margin-bottom: 20px;

  span {
    font-size: 16px;
    font-weight: 900;
  }
`;
const Row = styled.div`
  display: flex;
  margin: 4px 0;
`;
const Tile = styled.div`
  width: 35px;
  height: 35px;
  border: 1px solid
    ${(props) => (props.bg ? props.bg : "rgba(255, 255, 255, .55)")};
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: ${(props) => props.bg};
  animation: ${(props) => props.open && "flip 400ms 300ms linear forwards"};
  @keyframes flip {
    from {
      transform: rotateX(0deg);
    }
    to {
      transform: rotateX(180deg);
    }
  }

  span {
    animation: ${(props) => props.open && "rot 400ms 300ms ease forwards"};
    @keyframes rot {
      from {
        transform: rotateX(0);
      }
      to {
        transform: rotateX(-180deg);
      }
    }
  }
`;

export default HowTo;
