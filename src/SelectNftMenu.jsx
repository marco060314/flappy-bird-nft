import './App.css'
import * as React from 'react'
import { useAccount } from 'wagmi'

const SelectNftMenu = ({ onSelectNft }) => {
  const { address, isConnecting, isDisconnected } = useAccount()
  console.log(address + 'a:' + isConnecting + ' ' + isDisconnected)
  const [playerImage, setPlayerImage] = React.useState(
    'https://i.postimg.cc/Gp81LFNg/birdy.png'
  )
  const [playerNFTs, setPlayerNFT] = React.useState([])

  React.useEffect(() => {
    async function fetchNFTs() {
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          //"X-API-Key": "d0a4ff8d922e41e29454b86e0426d0f6",
        },
      }
      const res = await fetch(
        `https://api.opensea.io/api/v1/assets?owner=${address}&limit=30`,
        options
      )
      console.log(res)
      const nftData = await res.json()
      const nftImages = nftData.assets
        .map((nft) => nft.image_url)
        .filter(Boolean)

      setPlayerNFT(nftImages)
    }
    fetchNFTs()
  }, [address])

  const selectNFT = (nftImageUrl) => {
    setPlayerImage({ nftImageUrl })
    onSelectNft(nftImageUrl)
  }

  return (
    <div class="absolute bg-white m-auto top-0 bottom-0 right-0 left-0 w-3/5 h-4/5 flex flex-col rounded-3xl items-center justify-around drop-shadow-2xl">
      <h1 class="text-5xl">Menu --- Select your NFT</h1>
      <div class="overflow-scroll">
        {playerNFTs.map((nftImageUrl) => (
          <img
            onClick={() => selectNFT(nftImageUrl)}
            src={nftImageUrl}
            width="150"
            height="auto"
            alt="nfts"
          />
        ))}
        {playerNFTs.length === 0 && <h2>no nfts found</h2>}
      </div>
    </div>
  )
}

export default SelectNftMenu
