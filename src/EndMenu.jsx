import "./App.css";
import kaboom from "kaboom";
import * as React from "react";
import SelectNftMenu from "./SelectNftMenu";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "flappy-bird-nft",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

//display score + high score
//play again button
//menu button(select nft/connect wallet)

const EndMenu = ({ score, highScore }) => {
  const [showEndMenu, setShowEndMenu] = React.useState(false);

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
      <h1 text-align="center">Game Over</h1>
      <h1>score: {score}</h1>
      <h1>high score: {highScore}</h1>
    </div>
  );
};

export default EndMenu;
