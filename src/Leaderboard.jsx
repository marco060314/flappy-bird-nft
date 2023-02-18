import './App.css'
import * as React from 'react'
import './Menu.jsx'
import { db } from './firebase.js'
import {
  getDatabase,
  get,
  ref,
  set,
  query,
  orderByChild,
  onValue,
} from 'firebase/database'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'

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
  console.log('playerrank', playerRank)
  console.log(leaderboard)
  return (
    <div class="">
      <h1 class="text-center text-3xl font-semibold py-1">Leaderboard</h1>
      <div class="flex-row flex justify-between border px-2">
        <p class="font-semibold">Rank</p>
        <p class="font-semibold">Address</p>
        <p class="font-semibold">Score</p>
        <p class="font-semibold">NFT</p>
      </div>
      {leaderboard.slice(0, 2).map((player, index) =>
        player.address === address ? (
          <div
            key={player.address}
            class="items-center px-3 text-center gap-x-10 text-xl flex-row flex justify-between border-2 border-black font-bold"
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
        ) : (
          <div
            key={player.address}
            class="items-center px-3 text-center gap-x-10 text-xl flex-row flex justify-between border"
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
        )
      )}
      {playerRank > 1 && (
        <div
          key={leaderboard[playerRank].address}
          class="items-center px-3 text-center gap-x-10 text-xl flex-row flex justify-between border"
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
