import React from 'react';
import { PuzzlePiece } from '../types';

interface GameBoardProps {
  date: Date;
  solution: PuzzlePiece[];
}

const GameBoard: React.FC<GameBoardProps> = ({ date, solution }) => {
  const boardSize = 7;
  const cellSize = 40;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Game Board</h2>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${boardSize}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: boardSize * boardSize }).map((_, index) => {
          const row = Math.floor(index / boardSize);
          const col = index % boardSize;
          const piece = solution.find(p => p.position.row === row && p.position.col === col);

          return (
            <div
              key={index}
              className={`flex items-center justify-center border ${
                piece ? 'bg-blue-200' : 'bg-gray-100'
              }`}
              style={{ width: cellSize, height: cellSize }}
            >
              {row === 0 && col === 0 && (
                <span className="text-sm font-bold">{formatDate(date)}</span>
              )}
              {piece && (
                <span className="text-xs">{`${piece.shape[0]}x${piece.shape[1]}`}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;