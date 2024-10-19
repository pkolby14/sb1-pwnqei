export interface PuzzlePiece {
  shape: [number, number];
  position: {
    row: number;
    col: number;
  };
}