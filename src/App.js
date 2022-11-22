import "./App.css";
import kaboom from "kaboom";
import * as React from "react";
import Menu from "./Menu";
import GameOverMenu from "./GameOverMenu";

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
  var producePipeTime = 0;
  // just make sure this is only run once on mount so your game state is not messed up
  React.useEffect(() => {
    console.log("start of useeffect");
    const k = kaboom({
      // if you don't want to import to the global namespace
      global: false,
      // if you don't want kaboom to create a canvas and insert under document.body

      canvas: canvasRef.current,
    });
    k.destroyAll("player");
    k.destroyAll("pipe");
    k.loadSprite("player", playerNftUrl);
    k.loadSprite("bg", "https://i.postimg.cc/L8sp7KVp/bg.png");
    k.loadSprite("pipe", "https://i.postimg.cc/Bnw0fYh1/pipe.png");
    //k.loadSound("wooosh", "sprites/wooosh.mp3");
    k.scene("menu", () => {
      k.add([k.sprite("bg", { width: k.width(), height: k.height() })]);
      k.onKeyPress("space", () => {
        k.go("game");
        setCurrentGameState(GameState.Game);
      });
    });
    k.scene("game", () => {
      k.add([k.sprite("bg", { width: k.width(), height: k.height() })]);
      let kscore = 0;
      const scoreText = k.add([
        k.text(kscore, { size: 50 }),
        k.pos(k.width() / 2, 30),
        k.z(10),
      ]);

      const player = k.add([
        k.sprite("player", { width: 50, height: 50 }),
        k.pos(k.width() / 5, k.height() / 5),
        k.area(),
        k.body(),
      ]);
      k.highScore = 0;
      k.onKeyPress("space", () => {
        //k.play("wooosh");
        player.jump(400);
      });

      const PIPE_GAP = 150;
      function producePipes() {
        console.log(Date.now() - producePipeTime);
        if (Date.now() - producePipeTime < 1000) {
          return;
        }
        console.log("produce pipes", Date.now());
        producePipeTime = Date.now();
        const offset = k.rand(-250, 250);

        k.add([
          k.sprite("pipe"),
          k.pos(k.width(), k.height() / 2 + offset + PIPE_GAP / 2),
          k.scale(3, 4),
          "pipe",
          k.area(),
          { passed: false },
        ]);

        k.add([
          k.sprite("pipe", { flipY: true }),
          k.pos(k.width(), k.height() / 2 + offset - PIPE_GAP / 2),
          k.scale(3, 4),
          k.origin("botleft"),
          "pipe",
          k.area(),
        ]);
      }

      player.onUpdate(() => {
        if (player.pos.y > k.height() + 30 || player.pos.y < -30) {
          k.go("menu");
          console.log("gamestate");
          onGameOver(kscore);
        }
      });
      k.onUpdate("pipe", (pipe) => {
        pipe.move(-160, 0);

        if (pipe.passed === false && pipe.pos.x < player.pos.x) {
          pipe.passed = true;
          kscore += 1;
          scoreText.text = kscore;
        }
      });

      player.onCollide("pipe", () => {
        k.go("menu");
        console.log("collides");
        onGameOver(kscore);
      });

      k.loop(2, () => {
        producePipes();
      });
    });

    k.go("menu");
  }, [playerNftUrl]);
  console.log(currentGameState);
  return (
    <>
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
      <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />
    </>
  );
};

export default App;
