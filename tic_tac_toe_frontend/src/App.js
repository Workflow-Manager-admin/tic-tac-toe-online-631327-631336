import React, { useState, useEffect } from 'react';
import './App.css';
import { calculateWinner, calculateAIMove } from './gameLogic';

// PUBLIC_INTERFACE
function App() {
  const [gameMode, setGameMode] = useState(null); // null, '2P', or 'AI'
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!xIsNext && gameMode === 'AI' && !gameOver) {
      // Add small delay for better UX
      const timeoutId = setTimeout(() => {
        handleAIMove();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [xIsNext, gameMode, gameOver]);

  const handleAIMove = () => {
    const aiMove = calculateAIMove(board);
    if (aiMove !== -1) {
      const newBoard = [...board];
      newBoard[aiMove] = 'O';
      setBoard(newBoard);
      setXIsNext(true);
      checkGameStatus(newBoard);
    }
  };

  const handleClick = (index) => {
    if (gameOver || board[index] || (!xIsNext && gameMode === 'AI')) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    checkGameStatus(newBoard);
  };

  const checkGameStatus = (currentBoard) => {
    const winner = calculateWinner(currentBoard);
    if (winner || currentBoard.every(cell => cell)) {
      setGameOver(true);
    }
  };

  const getStatus = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (board.every(cell => cell)) {
      return 'Draw!';
    }
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  const renderCell = (index) => {
    return (
      <button
        className={`cell ${board[index]?.toLowerCase()}`}
        onClick={() => handleClick(index)}
        disabled={gameOver}
      >
        {board[index]}
      </button>
    );
  };

  if (!gameMode) {
    return (
      <div className="App">
        <div className="game-container">
          <h1 style={{ color: 'var(--primary)' }}>Tic Tac Toe</h1>
          <div className="mode-selection">
            <button className="mode-button" onClick={() => setGameMode('2P')}>
              Two Players
            </button>
            <button className="mode-button" onClick={() => setGameMode('AI')}>
              vs AI
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="game-container">
        <h1 style={{ color: 'var(--primary)' }}>Tic Tac Toe</h1>
        <div className="status">{getStatus()}</div>
        <div className="board">
          {Array(9).fill(null).map((_, i) => (
            <React.Fragment key={i}>
              {renderCell(i)}
            </React.Fragment>
          ))}
        </div>
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
        <button 
          className="mode-button" 
          style={{ marginTop: '20px' }}
          onClick={() => {
            setGameMode(null);
            handleRestart();
          }}
        >
          Change Mode
        </button>
      </div>
    </div>
  );
}

export default App;
