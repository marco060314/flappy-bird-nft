import "./App.css";
import * as React from "react";
import SelectNftMenu from "./SelectNftMenu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Game from "./Game"

const Menu = ({ playerNftUrl, setPlayerNftUrl }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [showSelectNftMenu, setShowSelectNftMenu] = React.useState(false);
  const [showGame, setShowGame] = React.useState(false);
  if (showGame){
    return (
      <Game playerNftUrl={playerNftUrl}/>
    )
  }
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
      <button class="button button2"
      onClick={() => setShowGame(true)}>start game</button>
      <h1>PRESS SPACE TO PLAY</h1>
    </div>
  );
};

export default Menu;
