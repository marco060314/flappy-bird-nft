import './App.css';
import kaboom from "kaboom"
import * as React from "react"



const App = () => {
  const canvasRef = React.useRef(null)
  const [playerImage, setPlayerImage] = React.useState("https://i.postimg.cc/Gp81LFNg/birdy.png")
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

    k.loadSprite("player", playerImage);
    k.loadSprite("bg", "https://i.postimg.cc/L8sp7KVp/bg.png");
    k.loadSprite("pipe", "https://i.postimg.cc/Bnw0fYh1/pipe.png");
    //k.loadSound("wooosh", "sprites/wooosh.mp3");
    k.scene("menu", () => {
      
      
      k.add([
        k.sprite("bg", {width:k.width(),height:k.height()}),
        
        k.text(
            "Flappy bird NFT \n press space to start game",
            {size: 45}
        )
      ]);
      const btn = k.add([
        k.text("collect wallet"),
        k.pos(k.vec2(200, 300)),
        k.area({ cursor: "pointer", }),
        k.scale(1),
        k.origin("center"),
      ])
      k.onKeyPress("space", () =>{
        k.go("game")
      })
    })
    k.scene("game", () => {
      k.onKeyPress("k", () =>{
        setPlayerImage("https://i.postimg.cc/RZwwJfgS/png-clipart-sprite-animation-2d-computer-graphics-game-character-sprite-game-chibi.png")
      }
      );
        
      k.add([
        k.sprite("bg", {width:k.width(),height:k.height()})
        ]);
        let score = 0;
        const scoreText = k.add([
          k.text(score, {size:50})
        ]);
    
        const player = k.add([
          k.sprite("player"),
          k.scale(4),
          k.pos(80,40),
          k.area(),   
          k.body(),
        ]);
    
        k.onKeyPress("space", () =>{
          //k.play("wooosh");
          player.jump(400);
          
        });
    
        const PIPE_GAP = 150;
        function producePipes(){
            const offset = k.rand(-250,250);
    
            k.add([
              k.sprite("pipe"),
              k.pos(k.width(), k.height()/2 + offset + PIPE_GAP/2),
              k.scale(3, 4),
                "pipe",
                k.area(),
                {passed: false}
            ]);
    
            k.add([
              k.sprite("pipe", {flipY: true}),
              k.pos(k.width(), k.height()/2 + offset - PIPE_GAP/2),
              k.scale(3, 4),
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
        
        k.loop(2, () => {
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
    
    
    k.go("menu")

		// write all your kaboom code here

	}, [playerImage])
  return (
        <canvas ref={canvasRef} ></canvas>

  );

}

export default App;
