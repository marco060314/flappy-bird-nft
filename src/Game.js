import './App.css'
import kaboom from 'kaboom'
import * as React from 'react'

const Game = ({ playerNftUrl, onGameOver }) => {
  const canvasRef = React.useRef(null)
  // just make sure this is only run once on mount so your game state is not messed up
  React.useEffect(() => {
    const k = kaboom({
      global: false,
      canvas: canvasRef.current,
    })

    k.loadSprite('player', playerNftUrl)
    k.loadSprite('bg', 'https://flappy-bird-nft.vercel.app/bg.png')
    k.loadSprite('pipe', 'https://flappy-bird-nft.vercel.app/pipe.png')
    k.scene('gameover', () => {
      k.add([k.sprite('bg', { width: k.width(), height: k.height() })])
    })
    k.scene('game', () => {
      k.add([k.sprite('bg', { width: k.width(), height: k.height() })])
      let kscore = 0
      const scoreText = k.add([
        k.text(kscore, { size: 50 }),
        k.pos(k.width() / 2, 30),
        k.z(10),
      ])

      const player = k.add([
        k.sprite('player', { width: 50, height: 50 }),
        k.pos(k.width() / 5, k.height() / 5),
        k.area(),
        k.body(),
      ])
      k.onKeyPress('space', () => {
        player.jump(400)
      })
      k.onMousePress(() => {
        player.jump(400)
      })
      k.onTouchStart(() => {
        player.jump(400)
      })

      const PIPE_GAP = 200
      function producePipes() {
        const offset = k.rand(-250, 250)

        k.add([
          k.sprite('pipe'),
          k.pos(k.width(), k.height() / 2 + offset + PIPE_GAP / 2),
          k.scale(3, 4),
          'pipe',
          k.area(),
          { passed: false },
        ])

        k.add([
          k.sprite('pipe', { flipY: true }),
          k.pos(k.width(), k.height() / 2 + offset - PIPE_GAP / 2),
          k.scale(3, 4),
          k.origin('botleft'),
          'pipe',
          k.area(),
        ])
      }

      player.onUpdate(() => {
        if (player.pos.y > k.height() + 30 || player.pos.y < -30) {
          k.go('gameover')
          onGameOver(kscore)
        }
      })
      k.onUpdate('pipe', (pipe) => {
        pipe.move(-160, 0)

        if (pipe.passed === false && pipe.pos.x < player.pos.x) {
          pipe.passed = true
          kscore += 1
          scoreText.text = kscore
        }
      })

      player.onCollide('pipe', () => {
        k.go('gameover')
        onGameOver(kscore)
      })

      k.loop(2, () => {
        producePipes()
      })
    })

    k.go('game')
  }, [playerNftUrl, onGameOver])
  return (
    <>
      <canvas ref={canvasRef} />
    </>
  )
}

export default Game
