const { useState } = React;

function RockPaperScissors() {
  const choices = ['Kő', 'Papír', 'Olló'];
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');

  function play(choice) {
    const computer = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(computer);

    if (choice === computer) {
      setResult('Döntetlen!');
    } else if (
      (choice === 'Kő' && computer === 'Olló') ||
      (choice === 'Papír' && computer === 'Kő') ||
      (choice === 'Olló' && computer === 'Papír')
    ) {
      setResult('Nyertél!');
    } else {
      setResult('Vesztettél!');
    }
  }

  return (
    <div>
      <h2>Kő-Papír-Olló játék</h2>
      <div>
        {choices.map((choice, index) => (
          <button key={index} onClick={() => play(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <p><strong>Te választottad:</strong> {playerChoice}</p>
      <p><strong>Számítógép választása:</strong> {computerChoice}</p>
      <h3><strong>Eredmény:</strong> {result}</h3>
    </div>
  );
}

// Ha külön fájlban futtatod 
const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<RockPaperScissors />);
