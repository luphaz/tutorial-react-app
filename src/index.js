import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
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
                return this.renderSquare(colIndex + rowIndex * 3);
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          position: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      sortIsAsc: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares, position: i }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      // If you want your history to be cleaned whenever you get back in time adapt also handleClick/history
      // history: this.state.history.slice(0, step + 1),
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      const position = getPosition(step.position);
      const positionText = position ? `(${position[0]}, ${position[1]})` : "";
      const isMoveSelected = step.position === current.position;

      return (
        <li key={move}>
          <button
            className={isMoveSelected ? "selected" : ""}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
          {positionText}
        </li>
      );
    });

    const status = winner
      ? "Winner: " + winner
      : "Next player: " + (this.state.xIsNext ? "X" : "O");
    const sortStatus = this.state.sortIsAsc
      ? "Toggle sort to desc"
      : "Toggle sort to asc";

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button
            onClick={() => this.setState({ sortIsAsc: !this.state.sortIsAsc })}
          >
            {sortStatus}
          </button>
          <ol>{this.state.sortIsAsc ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getPosition(i) {
  const positions = [
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3]
  ];

  return positions[i];
}
