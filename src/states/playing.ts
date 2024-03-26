import p5 from 'p5';
import { NPC } from '../entities/npc';

type Props = {
  onGameLost: () => void;
  waterGunImg: p5.Image;
  crosshairImg: p5.Image;
};

const NPCs: NPC[] = [];
let frames: number = 0;
let spawnRate: number = 240;

export const draw = (p: p5, props: Props) => {
  p.push();
  p.background(0);

  frames += 1;

  if (frames === spawnRate) {
    const npc = new NPC({
      x: 0,
      y: p.random(10, p.height - 10),
      framesToStop: spawnRate,
      framesToShoot: 60,
      framesToHappy: 60,
      speed: p.random(1, 5),
    });
    NPCs.push(npc);
    spawnRate -= 5;
    frames = 0;
  }

  for (const NPC of NPCs) {
    NPC.draw(p, props.onGameLost);
  }

  p.imageMode(p.CENTER);
  p.image(props.waterGunImg, p.mouseX, p.height - 150);

  p.image(props.crosshairImg, p.mouseX, p.mouseY, 50, 50);

  p.pop();
};
