import './style.css';
import p5 from 'p5';
import { draw as drawMenu } from './states/menu';
import { draw as drawPlaying } from './states/playing';
import playButtonUrl from '/play-button.png';
import waterGunUrl from '/water-gun.png';
import crosshairUrl from '/crosshair.png';

enum GameState {
  MENU = 'menu',
  PLAYING = 'playing',
  GAME_OVER = 'game over',
}

const sketch = (p: p5) => {
  let currentState: GameState = GameState.MENU;
  let playButtonImg: p5.Image;
  let waterGunImg: p5.Image;
  let crosshairImg: p5.Image;

  p.preload = () => {
    playButtonImg = p.loadImage(playButtonUrl);
    waterGunImg = p.loadImage(waterGunUrl);
    crosshairImg = p.loadImage(crosshairUrl);
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
          currentState = GameState.PLAYING;
        },
        playButtonImg,
      });
    } else if (currentState === GameState.PLAYING) {
      drawPlaying(p, {
        onGameLost: () => {
          currentState = GameState.GAME_OVER;
        },
        waterGunImg,
        crosshairImg,
      });
    } else if (currentState === GameState.GAME_OVER) {
    }
  };
};

new p5(sketch);
