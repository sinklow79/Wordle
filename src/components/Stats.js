import React from "react";
import { memo } from "react";
import styled from "styled-components";

const Stats = memo(({ openStats, handleStatsClick, reset, playerStats }) => {
  const widthCalculator = (win, totalWin) => {
    if (!totalWin || !win) return 0;
    const res = Math.floor((win * 100) / totalWin);
    return res;
  };

  const width1 = widthCalculator(playerStats.wonRow[0], playerStats.won);
  const width2 = widthCalculator(playerStats.wonRow[1], playerStats.won);
  const width3 = widthCalculator(playerStats.wonRow[2], playerStats.won);
  const width4 = widthCalculator(playerStats.wonRow[3], playerStats.won);
  const width5 = widthCalculator(playerStats.wonRow[4], playerStats.won);
  const width6 = widthCalculator(playerStats.wonRow[5], playerStats.won);

  return (
    <Section openStats={openStats}>
      <SectionBackground onClick={() => handleStatsClick()}></SectionBackground>
      <SectionContainer>
        <StatsSSContainer>
          <h2>YOUR STATISTICS</h2>
          <StatsContainer>
            <div>
              <StatsNumber>{playerStats.played}</StatsNumber>
              <StatsDescription>Played</StatsDescription>
            </div>
            <div>
              <StatsNumber>{playerStats.won}</StatsNumber>
              <StatsDescription>Won</StatsDescription>
            </div>
            <div>
              <StatsNumber>
                {widthCalculator(playerStats.won, playerStats.played)}
              </StatsNumber>
              <StatsDescription>Win %</StatsDescription>
            </div>
          </StatsContainer>
          <h2>GUESS DISTRIBUTION</h2>
          <GuessDistributionContainer>
            <GDGraphContainer>
              <span>1</span>
              <span
                style={{
                  width: width1 <= 7 ? "7%" : width1 + "%",
                  justifyContent: `${
                    widthCalculator(playerStats.wonRow[0], playerStats.won) <= 7
                      ? "center"
                      : "flex-end"
                  }`,
                }}
              >
                {playerStats.wonRow[0]}
              </span>
            </GDGraphContainer>
            <GDGraphContainer>
              <span>2</span>
              <span
                style={{
                  width: width2 <= 7 ? "7%" : width2 + "%",
                  justifyContent: `${
                    widthCalculator(playerStats.wonRow[1], playerStats.won) <= 7
                      ? "center"
                      : "flex-end"
                  }`,
                }}
              >
                {playerStats.wonRow[1]}
              </span>
            </GDGraphContainer>
            <GDGraphContainer>
              <span>3</span>
              <span
                style={{
                  width: width3 <= 7 ? "7%" : width3 + "%",
                  justifyContent:
                    widthCalculator(playerStats.wonRow[2], playerStats.won) <= 7
                      ? "center"
                      : "flex-end",
                }}
              >
                {playerStats.wonRow[2]}
              </span>
            </GDGraphContainer>
            <GDGraphContainer>
              <span>4</span>
              <span
                style={{
                  width: width4 <= 7 ? "7%" : width4 + "%",
                  justifyContent: `${
                    widthCalculator(playerStats.wonRow[3], playerStats.won) <= 7
                      ? "center"
                      : "flex-end"
                  }`,
                }}
              >
                {playerStats.wonRow[3]}
              </span>
            </GDGraphContainer>
            <GDGraphContainer>
              <span>5</span>
              <span
                style={{
                  width: width5 <= 7 ? "7%" : width5 + "%",
                  justifyContent: `${
                    widthCalculator(playerStats.wonRow[4], playerStats.won) <= 7
                      ? "center"
                      : "flex-end"
                  }`,
                }}
              >
                {playerStats.wonRow[4]}
              </span>
            </GDGraphContainer>
            <GDGraphContainer>
              <span>6</span>
              <span
                style={{
                  width: width6 <= 7 ? "7%" : width6 + "%",
                  justifyContent:
                    widthCalculator(playerStats.wonRow[5], playerStats.won) <= 7
                      ? "center"
                      : "flex-end",
                }}
              >
                {playerStats.wonRow[5]}
              </span>
            </GDGraphContainer>
          </GuessDistributionContainer>
          <Button onClick={() => reset()}>Play again</Button>
        </StatsSSContainer>
      </SectionContainer>
    </Section>
  );
});

const Section = styled.div`
  position: fixed;
  top: -130%;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;

  animation: ${(props) =>
    props.openStats.clicked
      ? props.openStats.show
        ? "onEnter 300ms ease forwards"
        : "onExit 300ms ease forwards"
      : ""};

  @keyframes onEnter {
    to {
      top: 0;
    }
  }
  @keyframes onExit {
    from {
      top: 0;
    }
    to {
      top: -130%;
    }
  }
`;

const SectionBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  z-index: 1000;
`;

const SectionContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #121213;
  width: calc(90%);
  max-width: 450px;
  padding: 2.5rem;
  z-index: 1001;
  border-radius: 8px;
`;
//text-center text-[14.5px] font-bold
const StatsSSContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  h2 {
    text-align: center;
    font-size: 14.5px;
    font-weight: bold;
  }
`;
const Button = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: 8px 18px 12px;
  border-radius: 0.375rem;
  background-color: #538d4e;
  cursor: pointer;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 30px;
  text-align: center;
  margin-bottom: 20px;
`;
const StatsNumber = styled.p`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: -10px;
`;
const StatsDescription = styled.p`
  font-size: 12px;
`;
const GuessDistributionContainer = styled.div`
  display: grid;
  row-gap: 4px;
  margin-top: 10px;
`;
//flex gap-x-[8px] text-[10px] font-extrabold
const GDGraphContainer = styled.div`
  display: flex;
  column-gap: 8px;
  font-size: 10px;
  font-weight: 900;
  //"py-[1px] w-[8px]
  & span:first-of-type {
    width: 8px;
    padding: 1px 0;
  }
  //"bg-[#3a3a3c] px-[8px] py-[1px] flex justify-center"
  & span:last-of-type {
    background-color: #3a3a3c;
    padding: 1px 8px;
    display: flex;
    justify-content: center;
  }
`;
export default Stats;
