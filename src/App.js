import "./App.css";
import kaboom from "kaboom";
import * as React from "react";
import Menu from "./Menu";
import GameOverMenu from "./GameOverMenu";
import Game from "./Game"

const GameState = {
  Menu: "Menu",
  Game: "Game",
  GameOver: "GameOver",
};
const App = () => {
  const [playerNftUrl, setPlayerNftUrl] = React.useState(
    "https://i.postimg.cc/Bnw0fYh1/pipe.png"
  );
  const canvasRef = React.useRef(null);
  const [currentGameState, setCurrentGameState] = React.useState(
    GameState.Menu
  );
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);
  const onGameOver = (newScore) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
    console.log("called");
    setCurrentGameState(GameState.GameOver);
  };
  return (
    <>
    {currentGameState === GameState.Game && (
      <Game playerNftUrl={playerNftUrl} />//score={() => setScore()}/>  <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />
    )}
      {currentGameState === GameState.Menu && (
        <Menu
          playerNftUrl={playerNftUrl}
          setPlayerNftUrl={(nftUrl) => setPlayerNftUrl(nftUrl)}
        />
      )}
      {currentGameState === GameState.GameOver && (
        <GameOverMenu
          score={score}
          highScore={highScore}
          onShowMenu={() => setCurrentGameState(GameState.Menu)}
        />
      )}
    </>
  );
};

export default App;
