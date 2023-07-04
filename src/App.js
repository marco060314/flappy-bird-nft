import './App.css'
import * as React from 'react'
import Menu from './Menu'
import GameOverMenu from './GameOverMenu'
import Game from './Game'
import Background from './sprites/bg.png'

window.Buffer = window.Buffer || require('buffer').Buffer

const GameState = {
  Menu: 'Menu',
  Game: 'Game',
  GameOver: 'GameOver',
}

const App = () => {
  const [playerNftUrl, setPlayerNftUrl] = React.useState(
    'https://flappy-bird-nft.vercel.app/flap.png'
  )
  const [currentGameState, setCurrentGameState] = React.useState(GameState.Menu)
  const [score, setScore] = React.useState(0)

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${Background})`,
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
        <div class="p-6 absolute m-50 top-0 bottom-0 right-0 left-0 items-center justify-center flex">
          <GameOverMenu
            score={score}
            playerNftUrl={playerNftUrl}
            onShowMenu={() => setCurrentGameState(GameState.Menu)}
            onPressStart={() => setCurrentGameState(GameState.Game)}
          />
        </div>
      )}
    </div>
  )
}

export default App
