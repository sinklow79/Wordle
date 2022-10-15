import React, { memo } from "react";
import { ReactComponent as StatsSVG } from "./assets/graph.svg";
import { ReactComponent as HowToSVG } from "./assets/howTo.svg";
import styled from "styled-components";

const Navbar = memo(({ handleStatsClick, handleHowToClick }) => {
  return (
    <div className="w-full h-[65px] relative z-[900] bg-black flex justify-end items-center px-[20px] border-b">
      <span className="absolute left-1/2 -translate-x-1/2 text-3xl font-extrabold">
        Wordle
      </span>
      <StyledHowTo onClick={handleHowToClick} />
      <StyledStats onClick={handleStatsClick} />
    </div>
  );
});

const StyledHowTo = styled(HowToSVG)`
  width: 25px;
  height: 25px;
  fill: white;
  margin-right: 15px;
  cursor: pointer;
`;

const StyledStats = styled(StatsSVG)`
  font-size: 12px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  g {
    fill: white;
  }
`;

export default Navbar;
