import React from "react";
import Square from "./Square";

function Board(props) {
  function renderSquare(i, winners) {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        key={i}
        className={
          winners.indexOf(i) >= 0 ? "square square-selected" : "square"
        }
      />
    );
  }

  const rows = [...Array(3)];
  const cols = rows;

  return (
    <div>
      {rows.map((_, rowIndex) => {
        return (
          <div className="board-row" key={rowIndex}>
            {cols.map((_, colIndex) => {
              return renderSquare(colIndex + rowIndex * 3, props.winners);
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
