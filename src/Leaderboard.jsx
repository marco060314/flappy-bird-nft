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
  useEffect(() => {
    const leaderboardRef = query(ref(db, 'leaderboard'), orderByChild('score'))
    onValue(leaderboardRef, (snapshot) => {
      const data = snapshot.val()
      console.log(data)
    })
  })
  return (
    <div class="">
      <h1 class="text-6xl font-semibold">Leaderboard</h1>
    </div>
  )
}

export default Leaderboard
