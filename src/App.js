import './App.css';
import kaboom from "kaboom"
import * as React from "react"

const App = () => {
  const canvasRef = React.useRef(null)

	// just make sure this is only run once on mount so your game state is not messed up
	React.useEffect(() => {

		const k = kaboom({
			// if you don't want to import to the global namespace
			global: false,
			// if you don't want kaboom to create a canvas and insert under document.body
			//canvas: canvasRef.current, 
      width: 1920,
      height:960, 
      canvas: canvasRef.current,  
		})

    k.loadSprite("birdy", "https://kaboomjs.com/sprites/apple.png");
    k.loadSprite("bg", "https://kaboomjs.com/sprites/apple.png");
    k.loadSprite("pipe", "https://kaboomjs.com/sprites/apple.png");
    //k.loadSound("wooosh", "sprites/wooosh.mp3");
    
    k.scene("game", () => {
        
      k.add([
        k.sprite("bg", {width:k.width(),height:k.height()})
        ]);
        let score = 0;
        const scoreText = k.add([
          k.text(score, {size:50})
        ]);
    
        const player = k.add([
          k.sprite("birdy"),
          k.scale(2),
          k.pos(80,40),
          k.area(),
          k.body(),
        ]);
    
        k.onKeyPress("space", () =>{
          //k.play("wooosh");
          player.jump(400);
        });
    
        const PIPE_GAP = 120;
        function producePipes(){
            const offset = k.rand(-50,50);
    
            k.add([
              k.sprite("pipe"),
              k.pos(k.width(), k.height()/2 + offset + PIPE_GAP/2),
                "pipe",
                k.area(),
                {passed: false}
            ]);
    
            k.add([
              k.sprite("pipe", {flipY: true}),
              k.pos(k.width(), k.height()/2 + offset - PIPE_GAP/2),
              k.origin("botleft"),
                "pipe",
                k.area()
            ]);
        }
    
        player.onUpdate(() => {
            if (player.pos.y > k.height() + 30 || player.pos.y < -30) {
              k.go("gameover", score);
            }
        });
        k.onUpdate("pipe", (pipe) => {
            pipe.move(-160, 0);
    
            if (pipe.passed === false && pipe.pos.x < player.pos.x) {
                pipe.passed = true;
                score += 1;
                scoreText.text = score;
            }
        });
    
        player.collides("pipe", () => {
            k.go("gameover", score);
        });
        
        k.loop(1.5, () => {
            producePipes();
        });
        
    });
    
    
    k.scene("gameover", (score) => {
        let highScore = 0;
        if (score > highScore) {
            highScore = score;
        }
        k.add([
            k.text(
                "game over! \n" 
                + "score: " + score 
                + "\nhigh score: " + highScore,
                {size: 45}
            )
        ]);
    
        k.onKeyPress("space", () => {
            k.go("game");
        });
    });
    
    
    k.go("game")

		// write all your kaboom code here

	}, [])
  return <canvas ref={canvasRef} ></canvas>
	
  return (
    <div className="App">
      <header className="App-header">
        <h1>flappybird nft</h1>
      </header>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
  
}

export default App;