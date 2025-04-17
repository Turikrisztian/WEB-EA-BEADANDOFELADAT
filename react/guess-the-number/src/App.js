const { useState } = React;

function GuessTheNumber() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  function handleGuess() {
    const num = parseInt(guess);
    if (isNaN(num)) {
      setMessage("Adj meg egy számot!");
      return;
    }

    if (num === target) {
      setMessage("Gratulálok! Eltaláltad!");
    } else if (num < target) {
      setMessage("Túl alacsony!");
    } else {
      setMessage("Túl magas!");
    }
  }

  function resetGame() {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
  }

  return (
    <div>
      <h2>Számkitaláló játék (1–100)</h2>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Tippelj egy számot!"
      />
      <button onClick={handleGuess}>Tippelés</button>
      <button onClick={resetGame}>Új játék</button>
      <p>{message}</p>
    </div>
  );
}

// Ha külön futtatod Babel-lel:
const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<GuessTheNumber />);
