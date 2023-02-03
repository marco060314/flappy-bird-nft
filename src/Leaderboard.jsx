import './App.css'
import * as React from 'react'
import './Menu.jsx'
import { db } from './firebase.js'
import {
  getDatabase,
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
      const data = snapshot.val()
      console.log(data)
      setLeaderboard(Object.values(data))
    })
  }, [])
  console.log(leaderboard)
  return (
    <div class="">
      <h1 class="text-6xl font-semibold">Leaderboard</h1>
      {leaderboard.map((player, index) => (
        <div class="flex-row flex">
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
