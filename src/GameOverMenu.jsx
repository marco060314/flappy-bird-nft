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
    <div class="absolute bg-white m-auto top-0 bottom-0 right-0 left-0 w-4/5 h-5/6 flex flex-col rounded-3xl items-center justify-around drop-shadow-2xl lg:w-3/5 xl:w-3/5 md:-3/5">
      <h1 class="font-semibold text-s lg:text-5xl xl:text-5xl md:text-5xl">
        Game Over
      </h1>
      <div class="space-y-3 flex-col flex items-center">
        {isHighScore && (
          <h1 class="font-semibold text-s lg:text-5xl xl:text-5xl md:text-5xl">
            New High Score:
          </h1>
        )}
        {!isHighScore && (
          <h1 class=" font-semibold text-s lg:text-5xl xl:text-5xl md:text-5xl">
            Score:
          </h1>
        )}
        <h1
          class={`text-xl lg:text-6xl xl:text-6xl md:text-6xl  font-bold ${
            isHighScore ? 'text-green-500 text-xl' : ''
          }`}
        >
          {score}
        </h1>
      </div>
      <Leaderboard address={address} />

      <div class="space-x-3">
        <button
          class="w-16 md:w-48 lg:w-80 xl:w-120 bg-gray-500 hover:bg-gray-700 text-white font-semibold py-5 px-5 drop-shadow-2xl border border-blue-500 hover:border-black rounded-lg text-s lg:text-xl xl:text-xl md:text-xl"
          onClick={onShowMenu}
        >
          Main Menu
        </button>
        <button
          class="w-16 md:w-48 lg:w-80 xl:w-120 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-5 px-5 drop-shadow-2xl border border-blue-500 hover:border-black rounded-lg text-s lg:text-xl xl:text-xl md:text-xl"
          onClick={onPressStart}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

export default GameOverMenu
