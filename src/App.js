import "./App.css";
import { FaHandRock, FaHandPaper, FaHandScissors} from "react-icons/fa";
import { useState } from "react";

const actions = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],

};

function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}

function calculateWinner(action1, action2) {
  if (action1 === action2) {
    return 0;
  } else if (actions[action1].includes(action2)) {
    return -1;
  } else if (actions[action2].includes(action1)) {
    return 1;
  }

  
  return null;
}

function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,

  };
  const Icon = icons[action];
  return <Icon {...props} />;
}

function Player({ name = "Player", score = 0, action = "rock" }) {
  return (
    <div className="player">
      <div className="score">{`${name}: ${score}`}</div>
      <div className="action">
        {action && <ActionIcon action={action} size={60} />}
      </div>
    </div>
  );
}

function ActionButton({ action = "rock", onActionSelected }) {
  return (
    <button className="round-btn" onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={20} />
    </button>
  );
}

function ShowWinner({winner = 0}) {
  const text = {
    "-1": "Você Ganhou!",
    0: "Empate",
    1: "Você Perdeu!",
  };

  return (
    <h2>{text[winner]}</h2>
  )
}

function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();

    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 1) {
      setComputerScore(computerScore + 1);
    }
  };

  const resetGame = () => {
    setPlayerAction("");
    setComputerAction("");
    setPlayerScore(0);
    setComputerScore(0);
    setWinner(0);
  };

  return (
    <div className="center">
      <h1>Pedra Papel Tesoura</h1>
      <div>
        <div className="container">
          <Player name="Jogador" score={playerScore} action={playerAction} />
          <Player
            name="Computador"
            score={computerScore}
            action={computerAction}
          />
        </div>
        <div>
          <ActionButton action="rock" onActionSelected={onActionSelected} />
          <ActionButton action="paper" onActionSelected={onActionSelected} />
          <ActionButton action="scissors" onActionSelected={onActionSelected} />

        </div>
        <ShowWinner winner={winner} />
        <button className="btn-jogar-novamente" onClick={resetGame}>Jogar Novamente</button>
      </div>
    </div>
  );
}

export default App;