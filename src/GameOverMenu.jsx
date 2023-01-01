import './App.css'
import * as React from 'react'
import './Menu.jsx'

const GameOverMenu = ({ score, highScore, onShowMenu, onPressStart }) => {
  return (
    <div class="absolute bg-white m-auto top-0 bottom-0 right-0 left-0 w-3/5 h-4/5 flex flex-col rounded-3xl items-center justify-around drop-shadow-2xl">
      <h1 class="text-5xl font-semibold">Game Over</h1>
      <h1 class="text-3xl font-semibold">Score: {score}</h1>
      <h1 class="text-3xl font-semibold">High Score: {highScore}</h1>
      <button
        class="w-16 md:w-48 lg:w-80 xl:w-120 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-5 px-5 drop-shadow-2xl border border-blue-500 hover:border-black rounded-lg text-xl"
        onClick={onPressStart}
      >
        Play Again
      </button>
      <button
        class="w-16 md:w-48 lg:w-80 xl:w-120 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-5 px-5 drop-shadow-2xl border border-blue-500 hover:border-black rounded-lg text-xl"
        onClick={onShowMenu}
      >
        Go Back to Main Menu
      </button>
    </div>
  )
}

export default GameOverMenu
