import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i, winners) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
        className={
          winners.indexOf(i) >= 0 ? "square square-selected" : "square"
        }
      />
    );
  }

  render() {
    const els = Array(3).fill(null);
    return (
      <div>
        {els.map((_, rowIndex) => {
          return (
            <div className="board-row" key={rowIndex}>
              {els.map((_, colIndex) => {
                return this.renderSquare(
                  colIndex + rowIndex * 3,
                  this.props.winners
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Board;
