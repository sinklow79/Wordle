import React, {memo, useCallback} from "react";
import BoardTile from "./BoardTile";
import styled from 'styled-components'

const Board = memo(({ board, boardRow, word, notEnough, existence }) => {

  const bgColorCalculator = useCallback((valCol, val) => {
    if (word[valCol] === val) return "#538d4e";
    if (word.includes(val)) return "#b59f3b"
    else return "#3a3a3c";
  }, [word])

  return (
    <BoardContainer>
      <BoardRow className="board-row" >
        {board.map((arr, row) =>
        <BoardCol key={row} className={` ${notEnough ? boardRow === row  ? "animate-shake" : "" : ""} ${existence ? boardRow === row  ? "animate-shake" : "" : ""}`}>
          {
            arr.map((str, col) => (
              <BoardTile key={`${row}|${col}`} val={str} bgColor={boardRow > row ? bgColorCalculator(col, str.toLowerCase()) : "" } col={col} rot={boardRow > row} />
            ))
          }
        </BoardCol>
        )}
      </BoardRow>
    </BoardContainer>
  );
});

const BoardContainer = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center;
  flex-grow: 1;
  height: max-content;
`
const BoardRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  row-gap: 7px;
  max-height: 409px;
  max-width: 338px;
`
const BoardCol = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 7px;
  height: 100%;
  flex-grow: 1;
`

export default Board;
