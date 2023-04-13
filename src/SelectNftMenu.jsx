import './App.css'
import * as React from 'react'
import { useAccount } from 'wagmi'

const SelectNftMenu = ({ onSelectNft }) => {
  const { address } = useAccount()
  const [playerNFTs, setPlayerNFTs] = React.useState([])

  React.useEffect(() => {
    async function fetchNFTs() {
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
      const res = await fetch(
        `https://api.opensea.io/api/v1/assets?owner=${address}&limit=30`,
        options
      )
      const nftData = await res.json()
      const nftImages = nftData.assets
        .map((nft) => nft.image_url)
        .filter(Boolean)

      setPlayerNFTs(nftImages)
    }
    fetchNFTs()
  }, [address])

  const selectNFT = (nftImageUrl) => {
    onSelectNft(nftImageUrl)
  }

  return (
    <div class="absolute bg-white m-auto top-0 bottom-0 right-0 left-0 w-3/5 h-4/5 flex flex-col rounded-3xl items-center justify-top drop-shadow-2xl p-10 space-y-8">
      <h1 class="text-5xl font-semibold">Select your NFT</h1>
      <div class="overflow-auto flex flex-wrap justify-center item-start">
        {playerNFTs.map((nftImageUrl) => (
          <img
            onClick={() => selectNFT(nftImageUrl)}
            src={nftImageUrl}
            width="150"
            height="auto"
            alt="nfts"
            class="m-3 hover:opacity-70 duration-300"
          />
        ))}
        {playerNFTs.length === 0 && <h2>no nfts found</h2>}
      </div>
    </div>
  )
}

export default SelectNftMenu
