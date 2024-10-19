import { PuzzlePiece } from '../types';

const pieces: [number, number][] = [
  [3, 3], [3, 2], [2, 2], [2, 2], [2, 1], [2, 1], [1, 1]
];

export function generateSolution(date: Date): PuzzlePiece[] {
  const seed = date.getTime();
  const shuffledPieces = shufflePieces(pieces, seed);
  const board = Array(7).fill(null).map(() => Array(7).fill(false));
  board[0][0] = true; // Reserve space for the date

  const solution: PuzzlePiece[] = [];

  for (const [height, width] of shuffledPieces) {
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 7; col++) {
        if (canPlacePiece(board, row, col, height, width)) {
          placePiece(board, row, col, height, width);
          solution.push({
            shape: [height, width],
            position: { row, col },
          });
          break;
        }
      }
      if (solution.length === shuffledPieces.length) break;
    }
  }

  return solution;
}

function shufflePieces(pieces: [number, number][], seed: number): [number, number][] {
  const shuffled = [...pieces];
  let currentIndex = shuffled.length;
  let temporaryValue, randomIndex;

  // Simple random number generator using the seed
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  while (0 !== currentIndex) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }

  return shuffled;
}

function canPlacePiece(board: boolean[][], row: number, col: number, height: number, width: number): boolean {
  if (row + height > 7 || col + width > 7) return false;

  for (let i = row; i < row + height; i++) {
    for (let j = col; j < col + width; j++) {
      if (board[i][j]) return false;
    }
  }

  return true;
}

function placePiece(board: boolean[][], row: number, col: number, height: number, width: number): void {
  for (let i = row; i < row + height; i++) {
    for (let j = col; j < col + width; j++) {
      board[i][j] = true;
    }
  }
}