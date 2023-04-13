import './App.css'
import * as React from 'react'
import './Menu.jsx'
import { db } from './firebase.js'
import { ref, query, orderByChild, onValue } from 'firebase/database'
import { useEffect } from 'react'
import { useEnsName } from 'wagmi'

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
      <table class="table-auto">
        <thead class="flex-row flex border-2 px-2">
          <th class="font-semibold">Rank</th>
          <th class="font-semibold">Address</th>
          <th class="font-semibold">Score</th>
          <th class="font-semibold">NFT</th>
        </thead>
        {leaderboard.slice(0, MAX_LEADERBOARD_SCORES).map((player, index) => (
          <LeaderboardItem
            player={player}
            isCurrentPlayer={player.address === address}
            rank={index + 1}
          />
        ))}
        {playerRank > MAX_LEADERBOARD_SCORES - 1 && (
          <LeaderboardItem
            player={leaderboard[playerRank]}
            isCurrentPlayer={true}
            rank={playerRank + 1}
          />
        )}
      </table>
    </div>
  )
}

export default Leaderboard

const LeaderboardItem = ({ player, isCurrentPlayer, rank }) => {
  const { data: ensName } = useEnsName({ address: player.address })
  console.log(ensName)

  return (
    <tr
      key={player.address}
      class={`items-center pl-3 text-center gap-x-10 text-xl flex-row flex border-slate-200 border-x-2 border-b-2 ${
        isCurrentPlayer ? ' font-bold bg-slate-200' : ''
      }`}
    >
      <td>{rank}</td>
      <td>
        {ensName
          ? ensName
          : `${player.address.slice(0, 4)}....${player.address.slice(-4)}`}
        {}
      </td>
      <td>{player.score}</td>
      <td>
        <img class="h-14 w-14 object-contain" src={player.nfturl} alt="nfts" />
      </td>
    </tr>
  )
}
