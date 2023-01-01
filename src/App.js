import './App.css'
import kaboom from 'kaboom'
import * as React from 'react'
import Menu from './Menu'
import GameOverMenu from './GameOverMenu'
import Game from './Game'

const GameState = {
  Menu: 'Menu',
  Game: 'Game',
  GameOver: 'GameOver',
}
const App = () => {
  const [playerNftUrl, setPlayerNftUrl] = React.useState(
    'https://i.postimg.cc/Bnw0fYh1/pipe.png'
  )
  const canvasRef = React.useRef(null)
  const [currentGameState, setCurrentGameState] = React.useState(GameState.Menu)
  const [score, setScore] = React.useState(0)
  const [highScore, setHighScore] = React.useState(0)
  return (
    <div
      style={{
        //backgroundColor: 'black',
        //display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url(https://i.postimg.cc/L8sp7KVp/bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    >
      {currentGameState === GameState.Game && (
        <Game
          playerNftUrl={playerNftUrl}
          onGameOver={(newScore) => {
            setScore(newScore)
            if (newScore > highScore) {
              setHighScore(newScore)
            }
            setCurrentGameState(GameState.GameOver)
          }}
        />
      )}
      {currentGameState === GameState.Menu && (
        <Menu
          playerNftUrl={playerNftUrl}
          setPlayerNftUrl={(nftUrl) => setPlayerNftUrl(nftUrl)}
          onPressStart={() => {
            setCurrentGameState(GameState.Game)
          }}
        />
      )}
      {currentGameState === GameState.GameOver && (
        <GameOverMenu
          score={score}
          highScore={highScore}
          onShowMenu={() => setCurrentGameState(GameState.Menu)}
          onPressStart={() => setCurrentGameState(GameState.Game)}
        />
      )}
    </div>
  )
}

export default App
