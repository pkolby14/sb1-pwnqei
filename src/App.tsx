import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import PuzzlePieces from './components/PuzzlePieces';
import { generateSolution } from './utils/puzzleSolver';
import { PuzzlePiece } from './types';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [solution, setSolution] = useState<PuzzlePiece[]>([]);

  useEffect(() => {
    const newSolution = generateSolution(currentDate);
    setSolution(newSolution);
  }, [currentDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(new Date(event.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Daily Puzzle Solver</h1>
      <input
        type="date"
        onChange={handleDateChange}
        value={currentDate.toISOString().split('T')[0]}
        className="mb-4 p-2 border rounded"
      />
      <div className="flex flex-wrap justify-center gap-4">
        <GameBoard date={currentDate} solution={solution} />
        <PuzzlePieces pieces={solution} />
      </div>
    </div>
  );
}

export default App;