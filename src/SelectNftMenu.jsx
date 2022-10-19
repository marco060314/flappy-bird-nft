import "./App.css";
import kaboom from "kaboom";
import * as React from "react";
//steps:create a list
//iterate through data to get image_url
//append image_url to list
//display each image on list to user
//update styling
//allow for select images
const SelectNftMenu = ({ onSelectNft }) => {
  const [playerImage, setPlayerImage] = React.useState(
    "https://i.postimg.cc/Gp81LFNg/birdy.png"
  );
  const [playerNFTs, setPlayerNFT] = React.useState([]);
  React.useEffect(() => {
    async function fetchNFTs() {
      const address = "0x5b952e34c04E44fAF89Ca38Bca83d5a92d85A7E7";
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
  }, []);
  function selectNFT(nftImageUrl) {
    setPlayerImage({ nftImageUrl });

    onSelectNft(nftImageUrl);
  }

  return (
    <div
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
      </div>
    </div>
  );
};

export default SelectNftMenu;
