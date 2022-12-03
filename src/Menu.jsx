import './App.css'
import * as React from 'react'
import SelectNftMenu from './SelectNftMenu'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Game from './Game'

const Menu = ({ playerNftUrl, setPlayerNftUrl, onPressStart }) => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [showSelectNftMenu, setShowSelectNftMenu] = React.useState(false)

  if (showSelectNftMenu) {
    return (
      <SelectNftMenu
        onSelectNft={(selectedNftUrl) => {
          console.log(selectedNftUrl)
          setShowSelectNftMenu(false)
          setPlayerNftUrl(selectedNftUrl)
        }}
      />
    )
  }
  return (
    <div
      style={{
        borderRadius: '25px',
        textAlign: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        margin: 'auto',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '60%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        //backgroundImage: 'url(https://i.postimg.cc/L8sp7KVp/bg.png)',
      }}
    >
      <h1 text-align="center">menu --- select your NFT</h1>
      {address && (
        <button
          class="button button2"
          onClick={() => setShowSelectNftMenu(true)}
        >
          select NFT
        </button>
      )}
      <ConnectButton />
      <h3>Current NFT</h3>
      {playerNftUrl && (
        <img
          class="center"
          src={playerNftUrl}
          width="50"
          height="50"
          alt="nfts"
        />
      )}
      <button class="button button2" onClick={onPressStart}>
        start game
      </button>
    </div>
  )
}

export default Menu
