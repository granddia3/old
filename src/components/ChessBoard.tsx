import React, { useState } from 'react';
import './chess.css';

const INITIAL_BOARD = [
  ["r","n","b","q","k","b","n","r"],
  ["p","p","p","p","p","p","p","p"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["P","P","P","P","P","P","P","P"],
  ["R","N","B","Q","K","B","N","R"],
];

const PIECE_UNICODE: Record<string, string> = {
  K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙",
  k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟"
};

function isWhite(piece: string) {
  return piece && piece.toUpperCase() === piece;
}
function isBlack(piece: string) {
  return piece && piece.toLowerCase() === piece;
}

export default function ChessBoard() {
  const [board, setBoard] = useState(JSON.parse(JSON.stringify(INITIAL_BOARD)));
  const [selected, setSelected] = useState<{row: number, col: number} | null>(null);
  const [turn, setTurn] = useState<'white' | 'black'>('white');

  function handleSquareClick(row: number, col: number) {
    const piece = board[row][col];
    const isOwn = turn === 'white' ? isWhite(piece) : isBlack(piece);

    if (selected) {
      // Moving phase - only simple move, no validation
      const from = selected;
      const fromPiece = board[from.row][from.col];
      if (fromPiece && ((turn === 'white' && isWhite(fromPiece)) || (turn === 'black' && isBlack(fromPiece)))) {
        // Make the move
        const newBoard = board.map(arr => arr.slice());
        newBoard[row][col] = fromPiece;
        newBoard[from.row][from.col] = "";
        setBoard(newBoard);
        setTurn(turn === 'white' ? 'black' : 'white');
      }
      setSelected(null);
    } else if (piece && isOwn) {
      setSelected({row, col});
    }
  }

  return (
    <div style={{marginTop: '2rem'}}>
      <h2 style={{marginBottom: '1rem'}}>{turn.charAt(0).toUpperCase() + turn.slice(1)}'s turn</h2>
      <div id="chessboard">
        {board.map((rowArr, rowIdx) =>
          rowArr.map((cell, colIdx) => {
            const selectedClass = selected && selected.row === rowIdx && selected.col === colIdx ? 'selected' : '';
            const colorClass = (rowIdx + colIdx) % 2 === 0 ? 'light' : 'dark';
            return (
              <div
                className={`square ${colorClass} ${selectedClass}`}
                key={rowIdx + '-' + colIdx}
                onClick={() => handleSquareClick(rowIdx, colIdx)}
              >
                {PIECE_UNICODE[cell] || ''}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
