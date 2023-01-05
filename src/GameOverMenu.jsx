import './App.css'
import * as React from 'react'
import './Menu.jsx'

const GameOverMenu = ({
  playerNftUrl,
  score,
  highScore,
  onShowMenu,
  onPressStart,
}) => {
  return (
    <div class="absolute bg-white m-auto top-0 bottom-0 right-0 left-0 w-3/5 h-4/5 flex flex-col rounded-3xl items-center justify-around drop-shadow-2xl">
      <h1 class="text-6xl font-semibold">Game Over</h1>
      <div class="space-y-3 flex-col flex items-center">
        <h1 class="text-4xl font-semibold">Score: {score}</h1>
        <h1 class="text-4xl font-semibold">High Score: {highScore}</h1>
      </div>
      <div class="flex flex-col bg-slate-200 rounded-2xl p-5 gap-3 drop-shadow-2xl">
        <img
          class="w-16 md:w-48 lg:w-80 xl:w-120 aspect-square object-contain"
          src={playerNftUrl}
          alt="nfts"
        />
      </div>
      <div class="space-x-3">
        <button
          class="w-16 md:w-48 lg:w-80 xl:w-120 bg-gray-500 hover:bg-gray-700 text-white font-semibold py-5 px-5 drop-shadow-2xl border border-blue-500 hover:border-black rounded-lg text-xl"
          onClick={onShowMenu}
        >
          Go Back to Main Menu
        </button>
        <button
          class="w-16 md:w-48 lg:w-80 xl:w-120 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-5 px-5 drop-shadow-2xl border border-blue-500 hover:border-black rounded-lg text-xl"
          onClick={onPressStart}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

export default GameOverMenu
