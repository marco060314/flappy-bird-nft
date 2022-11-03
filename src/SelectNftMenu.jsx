import "./App.css";
import * as React from "react";
import { useAccount } from "wagmi";

const SelectNftMenu = ({ onSelectNft }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log(address + "a:" + isConnecting + " " + isDisconnected);
  const [playerImage, setPlayerImage] = React.useState(
    "https://i.postimg.cc/Gp81LFNg/birdy.png"
  );
  const [playerNFTs, setPlayerNFT] = React.useState([]);

  React.useEffect(() => {
    async function fetchNFTs() {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-Key": "d0a4ff8d922e41e29454b86e0426d0f6",
        },
      };
      const res = await fetch(
        `https://api.opensea.io/api/v1/assets?owner=${address}&limit=30`,
        options
      );
      const nftData = await res.json();
      const nftImages = nftData.assets
        .map((nft) => nft.image_url)
        .filter(Boolean);

      setPlayerNFT(nftImages);
    }
    fetchNFTs();
  }, [address]);

  const selectNFT = (nftImageUrl) => {
    setPlayerImage({ nftImageUrl });
    onSelectNft(nftImageUrl);
  };

  return (
    <div
      id="box1"
      class="a"
      style={{
        backgroundColor: "white",
        position: "absolute",
        margin: "auto",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: "60%",
        height: "80%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 text-align="center">menu --- select your NFT</h1>
      <div style={{ overflowY: "scroll" }}>
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
  );
};

export default SelectNftMenu;
