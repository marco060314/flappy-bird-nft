import './App.css'
import * as React from 'react'
import './Menu.jsx'
import { db } from './firebase.js'
import { ref, set, get } from 'firebase/database'
import { useAccount } from 'wagmi'
import Leaderboard from './Leaderboard'
import { useEffect } from 'react'

const GameOverMenu = ({ playerNftUrl, score, onShowMenu, onPressStart }) => {
  const [isHighScore, setIsHighScore] = React.useState(null)
  const { address } = useAccount()

  useEffect(() => {
    const playerRef = ref(db, 'leaderboard/' + address)
    get(playerRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().score < score) {
            set(playerRef, {
              address: address,
              score: score,
              nfturl: playerNftUrl,
            })
            setIsHighScore(true)
          }
        } else {
          set(playerRef, {
            address: address,
            score: score,
            nfturl: playerNftUrl,
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [address, playerNftUrl, score])

  return (
    <div class="p-6 bg-white m-50 flex flex-col rounded-3xl items-center justify-around drop-shadow-2xl space-y-5">
      <h1 class="font-semibold text-4xl lg:text-7xl xl:text-7xl md:text-7xl">
        Game Over
      </h1>
      <div class="space-y-3 flex-col flex items-center">
        {isHighScore && (
          <h1 class="font-semibold text-xl lg:text-5xl xl:text-5xl md:text-5xl">
            New High Score:
          </h1>
        )}
        {!isHighScore && (
          <h1 class=" font-semibold text-xl lg:text-5xl xl:text-5xl md:text-5xl">
            Score:
          </h1>
        )}
        <h1
          class={`text-2xl lg:text-6xl xl:text-6xl md:text-6xl  font-bold ${
            isHighScore ? 'text-green-500 text-xl' : ''
          }`}
        >
          {score}
        </h1>
      </div>
      <Leaderboard address={address} />

      <div class="space-x-3 flex flex-row">
        <button
          class="w-36 md:w-48 lg:w-64 xl:w-64 bg-gray-500 hover:bg-gray-700 text-white font-semibold drop-shadow-2xl border border-blue-500 hover:border-black rounded-lg text-md lg:text-xl xl:text-xl md:text-xl"
          onClick={onShowMenu}
        >
          Main Menu
        </button>
        <button
          class=" w-36 md:w-48 lg:w-64 xl:w-64 bg-blue-500 hover:bg-blue-700 text-white font-semibold drop-shadow-2xl border border-blue-500 hover:border-black rounded-lg text-md lg:text-xl xl:text-xl md:text-xl"
          onClick={onPressStart}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

export default GameOverMenu
