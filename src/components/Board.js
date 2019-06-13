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

  const els = Array(3).fill(null);
  return (
    <div>
      {els.map((_, rowIndex) => {
        return (
          <div className="board-row" key={rowIndex}>
            {els.map((_, colIndex) => {
              return renderSquare(colIndex + rowIndex * 3, props.winners);
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
