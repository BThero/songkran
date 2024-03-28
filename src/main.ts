import './style.css';
import p5 from 'p5';
import * as Tone from 'tone';

import { draw as drawMenu } from './states/menu';
import { draw as drawPlaying, reset as resetGame } from './states/playing';
import { draw as drawGameOver } from './states/game-over';

import playButtonUrl from '/play-button.png';
import waterGunUrl from '/water-gun.png';
import startBannerUrl from '/start-banner.png';

import jackieHappyUrl from '/jackie-happy.png';
import jackieMovingUrl from '/jackie-moving.png';
import jackieStoppedUrl from '/jackie-stopped.png';

import tamdoHappyUrl from '/tamdo-happy.png';
import tamdoMovingUrl from '/tamdo-moving.png';
import tamdoStoppedUrl from '/tamdo-stopped.png';

import ivanHappyUrl from '/ivan-happy.png';
import ivanMovingUrl from '/ivan-moving.png';
import ivanStoppedUrl from '/ivan-stopped.png';

import tonyHappyUrl from '/tony-happy.png';
import tonyMovingUrl from '/tony-moving.png';
import tonyStoppedUrl from '/tony-stopped.png';

import yinHappyUrl from '/yin-happy.png';
import yinMovingUrl from '/yin-moving.png';
import yinStoppedUrl from '/yin-stopped.png';

import gelHappyUrl from '/gel-happy.png';
import gelMovingUrl from '/gel-moving.png';
import gelStoppedUrl from '/gel-stopped.png';

import playBackgroundUrl from '/play-background.png';
import gameOverBackgroundUrl from '/game-over-background.png';

import waterGunShootUrl from '/water-gun-shoot.mp3';

enum GameState {
  MENU = 'menu',
  PLAYING = 'playing',
  GAME_OVER = 'game over',
}

const sketch = (p: p5) => {
  let currentState: GameState = GameState.MENU;
  let playButtonImg: p5.Image;
  let waterGunImg: p5.Image;
  let startBannerImg: p5.Image;
  let faces: Array<{
    moving: p5.Image;
    stopped: p5.Image;
    happy: p5.Image;
  }>;
  let playBackgroundImg: p5.Image;
  let gameOverBackgroundImg: p5.Image;
  let player: Tone.Player;

  p.preload = () => {
    startBannerImg = p.loadImage(startBannerUrl);
    playButtonImg = p.loadImage(playButtonUrl);
    waterGunImg = p.loadImage(waterGunUrl);
    playBackgroundImg = p.loadImage(playBackgroundUrl);
    faces = [
      {
        moving: p.loadImage(jackieMovingUrl),
        stopped: p.loadImage(jackieStoppedUrl),
        happy: p.loadImage(jackieHappyUrl),
      },
      {
        moving: p.loadImage(tamdoMovingUrl),
        stopped: p.loadImage(tamdoStoppedUrl),
        happy: p.loadImage(tamdoHappyUrl),
      },
      {
        moving: p.loadImage(ivanMovingUrl),
        stopped: p.loadImage(ivanStoppedUrl),
        happy: p.loadImage(ivanHappyUrl),
      },
      {
        moving: p.loadImage(tonyMovingUrl),
        stopped: p.loadImage(tonyStoppedUrl),
        happy: p.loadImage(tonyHappyUrl),
      },
      {
        moving: p.loadImage(yinMovingUrl),
        stopped: p.loadImage(yinStoppedUrl),
        happy: p.loadImage(yinHappyUrl),
      },
      {
        moving: p.loadImage(gelMovingUrl),
        stopped: p.loadImage(gelStoppedUrl),
        happy: p.loadImage(gelHappyUrl),
      },
    ];
    gameOverBackgroundImg = p.loadImage(gameOverBackgroundUrl);
    player = new Tone.Player({
      url: waterGunShootUrl,
      loop: true,
    }).toDestination();
  };

  p.setup = () => {
    p.createCanvas(screen.width, screen.height);
    p.background(0);
  };

  p.draw = () => {
    p.clear();

    if (currentState === GameState.MENU) {
      drawMenu(p, {
        onGameStart: () => {
          resetGame();
          currentState = GameState.PLAYING;
        },
        startBannerImg,
        playButtonImg,
      });
    } else if (currentState === GameState.PLAYING) {
      drawPlaying(p, {
        onGameLost: () => {
          currentState = GameState.GAME_OVER;
        },
        waterGunImg,
        faces,
        backgroundImg: playBackgroundImg,
      });
    } else if (currentState === GameState.GAME_OVER) {
      drawGameOver(p, {
        onGameRestart: () => {
          resetGame();
          currentState = GameState.PLAYING;
        },
        restartButtonImg: playButtonImg,
        backgroundImg: gameOverBackgroundImg,
      });
    }
  };

  p.mousePressed = () => {
    player.start();
  };

  p.mouseReleased = () => {
    player.stop();
  };
};

new p5(sketch);
