import React, { memo } from "react";
import styled from 'styled-components'

const Tile = memo(
  ({ val, handleKeyboardClick, handleDeleteClick, handleEnterClick }) => {
    // const renderCounter = useRef(0);
    // renderCounter.current++;
    // console.log(val + " - " + renderCounter.current);


    const handleClick = () => {
      if (val === "ENTER") handleEnterClick();
      else if (val === "DELETE") handleDeleteClick();
      else handleKeyboardClick(val);
    };

    return (
      <TileContainer
        onClick={handleClick}
        val={val === "ENTER" ? 'big' : val ==="DELETE" ? 'big' : ""}
      >
        {val}
      </TileContainer>
    );
  }
);

const TileContainer = styled.div`
    flex: 1;
    background-color: #3a3a3c;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-weight: 700;
    height: 58px;
    
    font-size: ${props => props.val === 'big' ? '10px' : '14px'};
    padding: 0 ${props => props.val === 'big' ? "5px" : "0"};
    @media (min-width: 600px) {
        font-size: ${props => props.val === 'big' ? '10px' : '14px'};
        width: ${props => props.val === "big" ? "66px" : "43px"};
        flex: initial;
        padding: 0;
    }
`

export default Tile;
