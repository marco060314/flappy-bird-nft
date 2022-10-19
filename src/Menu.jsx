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
//steps:create a list
//iterate through data to get image_url
//append image_url to list
//display each image on list to user
//update styling
//allow for select images
const Menu = ({ playerNftUrl, setPlayerNftUrl }) => {
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
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
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
          <button onClick={() => setShowSelectNftMenu(true)}>select NFT</button>
          <ConnectButton />
          {playerNftUrl && (
            <img src={playerNftUrl} width="150" height="auto" alt="nfts" />
          )}
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Menu;
