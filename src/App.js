import './App.css'
import * as React from 'react'
import Menu from './Menu'
import GameOverMenu from './GameOverMenu'
import Game from './Game'

window.Buffer = window.Buffer || require('buffer').Buffer

const GameState = {
  Menu: 'Menu',
  Game: 'Game',
  GameOver: 'GameOver',
}

const App = () => {
  const [playerNftUrl, setPlayerNftUrl] = React.useState(
    'https://i.postimg.cc/hPTxj27d/flap.png'
  )
  const [currentGameState, setCurrentGameState] = React.useState(GameState.Menu)
  const [score, setScore] = React.useState(0)

  return (
    <div
      style={{
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
          playerNftUrl={playerNftUrl}
          onShowMenu={() => setCurrentGameState(GameState.Menu)}
          onPressStart={() => setCurrentGameState(GameState.Game)}
        />
      )}
    </div>
  )
}

export default App
