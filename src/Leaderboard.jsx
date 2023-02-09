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

const Leaderboard = ({}) => {
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
  return (
    <div class="">
      <h1 class="text-4xl font-semibold">Leaderboard</h1>
      <div class="flex-row flex justify-between border">
        <p class="font-semibold">Rank</p>
        <p class="font-semibold">Address</p>
        <p class="font-semibold">Score</p>
        <p class="font-semibold">NFT</p>
      </div>
      {leaderboard.map((player, index) => (
        <div key={player.address} class="flex-row flex justify-between border">
          <p>{index + 1}</p>
          <p>
            {player.address.slice(0, 4)}....{player.address.slice(-4)}
          </p>
          <p>{player.score}</p>
          <img
            class="h-10 w-10 object-contain"
            src={player.nfturl}
            alt="nfts"
          />
        </div>
      ))}
    </div>
  )
}

export default Leaderboard
