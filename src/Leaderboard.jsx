import './App.css'
import * as React from 'react'
import './Menu.jsx'
import { db } from './firebase.js'
import { ref, query, orderByChild, onValue } from 'firebase/database'
import { useEffect } from 'react'

const MAX_LEADERBOARD_SCORES = 5

const Leaderboard = ({ address }) => {
  const [leaderboard, setLeaderboard] = React.useState([])

  useEffect(() => {
    const leaderboardRef = query(ref(db, 'leaderboard'), orderByChild('score'))

    onValue(leaderboardRef, (snapshot) => {
      const sortedLeaderboard = []
      snapshot.forEach(function (child) {
        sortedLeaderboard.unshift(child.val())
      })
      setLeaderboard(sortedLeaderboard)
    })
  }, [])

  const playerRank = leaderboard.findIndex(
    (player) => player.address === address
  )

  return (
    <div class="">
      <h1 class="text-center text-4xl font-semibold py-3">Leaderboard</h1>
      <div class="flex-row flex justify-between border-2 px-2">
        <p class="font-semibold">Rank</p>
        <p class="font-semibold">Address</p>
        <p class="font-semibold">Score</p>
        <p class="font-semibold">NFT</p>
      </div>
      {leaderboard.slice(0, MAX_LEADERBOARD_SCORES).map((player, index) => (
        <div
          key={player.address}
          class={`items-center pl-3 text-center gap-x-10 text-xl flex-row flex justify-between border-slate-200 border-x-2 border-b-2 ${
            player.address === address ? ' font-bold bg-slate-200' : ''
          }`}
        >
          <p>{index + 1}</p>
          <p>
            {player.address.slice(0, 4)}....{player.address.slice(-4)}
          </p>
          <p>{player.score}</p>
          <img
            class="h-14 w-14 object-contain"
            src={player.nfturl}
            alt="nfts"
          />
        </div>
      ))}
      {playerRank > MAX_LEADERBOARD_SCORES - 1 && (
        <div
          key={leaderboard[playerRank].address}
          class="items-center pl-3 text-center gap-x-10 text-xl flex-row flex justify-between border-slate-200 border-x-2 border-b-2 font-bold bg-slate-200"
        >
          <p>{playerRank + 1}</p>
          <p>
            {leaderboard[playerRank].address.slice(0, 4)}....
            {leaderboard[playerRank].address.slice(-4)}
          </p>
          <p>{leaderboard[playerRank].score}</p>
          <img
            class="h-14 w-14 object-contain"
            src={leaderboard[playerRank].nfturl}
            alt="nfts"
          />
        </div>
      )}
    </div>
  )
}

export default Leaderboard
