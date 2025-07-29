// Check for a winner
export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// AI move calculation
export const calculateAIMove = (squares) => {
  // First try to win
  const move = findWinningMove(squares, 'O');
  if (move !== -1) return move;

  // Then block player's winning move
  const blockingMove = findWinningMove(squares, 'X');
  if (blockingMove !== -1) return blockingMove;

  // Take center if available
  if (!squares[4]) return 4;

  // Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => !squares[i]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available space
  const availableSpaces = squares.map((square, i) => !square ? i : null).filter(i => i !== null);
  return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
};

// Helper function to find winning move
const findWinningMove = (squares, player) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const squares_copy = [...squares];
    if (!squares_copy[a] && squares_copy[b] === player && squares_copy[c] === player) return a;
    if (squares_copy[a] === player && !squares_copy[b] && squares_copy[c] === player) return b;
    if (squares_copy[a] === player && squares_copy[b] === player && !squares_copy[c]) return c;
  }
  return -1;
};
