import "./App.css";
import * as React from "react";
import SelectNftMenu from "./SelectNftMenu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Menu = ({ playerNftUrl, setPlayerNftUrl }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [showSelectNftMenu, setShowSelectNftMenu] = React.useState(false);
  if (showSelectNftMenu) {
    return (
      <SelectNftMenu
        onSelectNft={(selectedNftUrl) => {
          console.log(selectedNftUrl);
          setShowSelectNftMenu(false);
          setPlayerNftUrl(selectedNftUrl);
        }}
      />
    );
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
      {address && (
        <button onClick={() => setShowSelectNftMenu(true)}>select NFT</button>
      )}
      <ConnectButton />
      {playerNftUrl && (
        <img src={playerNftUrl} width="150" height="auto" alt="nfts" />
      )}
    </div>
  );
};

export default Menu;
