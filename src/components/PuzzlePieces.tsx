import React from 'react';
import { PuzzlePiece } from '../types';

interface PuzzlePiecesProps {
  pieces: PuzzlePiece[];
}

const PuzzlePieces: React.FC<PuzzlePiecesProps> = ({ pieces }) => {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Puzzle Pieces</h2>
      <div className="grid grid-cols-3 gap-2">
        {pieces.map((piece, index) => (
          <div
            key={index}
            className="bg-blue-200 p-2 rounded flex items-center justify-center"
            style={{
              width: piece.shape[1] * 20,
              height: piece.shape[0] * 20,
            }}
          >
            <span className="text-xs">{`${piece.shape[0]}x${piece.shape[1]}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzlePieces;