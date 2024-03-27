import p5 from 'p5';
import { NPC } from '../entities/npc';

type Props = {
  onGameLost: () => void;
  waterGunImg: p5.Image;
  crosshairImg: p5.Image;
};

const NPCs: NPC[] = [];
let frames: number = 0;
let spawnRate: number = 180;
let difficultyFactor: number = 0;

const addNPC = (npc: NPC) => {
  let i = 0;

  while (i < NPCs.length && !NPCs[i].isGone()) {
    i++;
  }

  if (i < NPCs.length) {
    NPCs[i] = npc;
  } else {
    NPCs.push(npc);
  }
};

export const draw = (p: p5, props: Props) => {
  p.push();
  p.background(0);
  p.cursor('none');

  frames += 1;

  if (frames >= spawnRate - difficultyFactor * 5) {
    const fromLeft = p.random() > 0.5;
    addNPC(
      new NPC({
        x: fromLeft ? 0 : p.width,
        y: p.random(50, p.height - 400),
        framesToStop: p.map(difficultyFactor, 0, 48, 300, 180),
        direction:
          (fromLeft ? 1 : -1) *
          p.random(1, 3) *
          p.map(difficultyFactor, 0, 48, 1, 2),
      }),
    );

    frames = 0;
    difficultyFactor += 1;
  }

  for (const NPC of NPCs) {
    NPC.draw(p, props.onGameLost);
  }

  p.imageMode(p.CENTER);
  p.image(props.waterGunImg, p.mouseX, p.height - 150);

  p.image(props.crosshairImg, p.mouseX, p.mouseY, 50, 50);

  p.pop();
};
