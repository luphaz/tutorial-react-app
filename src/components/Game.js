import React, { useState } from "react";
import Board from "./Board";

function Game(props) {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      position: null
    }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [sortIsAsc, setSortIsAsc] = useState(true);

  function handleClick(i) {
    const shrinkedHistory = history.slice(0, stepNumber + 1);
    const current = shrinkedHistory[shrinkedHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    setHistory(shrinkedHistory.concat([{ squares, position: i }]));
    setStepNumber(shrinkedHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    // If you want your history to be cleaned whenever you get back in time adapt also handleClick/history
    // setHistory(history.slice(0, step + 1))
  }

  const current = history[stepNumber];
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
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
        {positionText}
      </li>
    );
  });

  const status = winner
    ? "Winner: " + winner.icon
    : "Next player: " + (xIsNext ? "X" : "O");
  const sortStatus = sortIsAsc ? "Toggle sort to desc" : "Toggle sort to asc";

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          winners={winner ? winner.lines : []}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => setSortIsAsc(!sortIsAsc)}>{sortStatus}</button>
        <ol>{sortIsAsc ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}

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
      return { icon: squares[a], lines: [a, b, c] };
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

export default Game;
