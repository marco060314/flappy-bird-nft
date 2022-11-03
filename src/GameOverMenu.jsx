import "./App.css";
import * as React from "react";
import "./Menu.jsx";

const GameOverMenu = ({ score, highScore, onShowMenu }) => {
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
      <h1 text-align="center">Game Over</h1>
      <h1>score: {score}</h1>
      <h1>high score: {highScore}</h1>
      <h3>Press space to play again</h3>
      <button class="button button2" onClick={onShowMenu}>
        Go Back to Main Menu
      </button>
    </div>
  );
};

export default GameOverMenu;
