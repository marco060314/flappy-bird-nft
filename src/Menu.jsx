import './App.css'
import * as React from 'react'
import SelectNftMenu from './SelectNftMenu'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

const Menu = ({ playerNftUrl, setPlayerNftUrl, onPressStart }) => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [showSelectNftMenu, setShowSelectNftMenu] = React.useState(false)

  if (showSelectNftMenu) {
    return (
      <SelectNftMenu
        onSelectNft={(selectedNftUrl) => {
          setShowSelectNftMenu(false)
          setPlayerNftUrl(selectedNftUrl)
        }}
      />
    )
  }
  return (
    <div class="absolute bg-white m-auto top-0 bottom-0 right-0 left-0 w-3/5 h-4/5 flex flex-col rounded-3xl items-center justify-around drop-shadow-2xl">
      <div class="absolute top-5 right-5 h-auto w-auto ...">
        <ConnectButton />
      </div>
      <h1 class="text-5xl font-semibold">FLAPPY NFT</h1>
      <h3 class="text-xl ">space/click to jump</h3>

      <div class="flex flex-col bg-slate-200 rounded-2xl p-5 gap-3 drop-shadow-2xl">
        {!address && <h1>Connect Wallet to select NFT</h1>}
        {playerNftUrl && address && (
          <img
            class="w-16 md:w-48 lg:w-80 xl:w-120 aspect-square object-contain"
            src={playerNftUrl}
            alt="nfts"
          />
        )}
        {address && (
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-500 hover:border-black rounded-lg"
            onClick={() => setShowSelectNftMenu(true)}
          >
            select NFT
          </button>
        )}
      </div>
      {!address && (
        <button
          class="w-16 md:w-48 lg:w-80 xl:w-120 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-5 px-5 drop-shadow-2xl border border-blue-500 hover:border-black rounded-lg text-xl"
          onClick={() => onPressStart()}
        >
          Try playing without NFT
        </button>
      )}

      {address && (
        <button
          class="w-16 md:w-48 lg:w-80 xl:w-120 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-5 px-5 drop-shadow-2xl border border-blue-500 hover:border-black rounded-lg text-xl"
          onClick={() => onPressStart()}
        >
          start game
        </button>
      )}
    </div>
  )
}

export default Menu
