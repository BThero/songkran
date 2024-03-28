import p5 from 'p5';
import { NPC } from '../entities/npc';
import { Emitter } from '../entities/emitter';

type Props = {
  onGameLost: () => void;
  waterGunImg: p5.Image;
  backgroundImg: p5.Image;
  faces: Array<{
    moving: p5.Image;
    stopped: p5.Image;
    happy: p5.Image;
  }>;
};

let NPCs: NPC[] = [];
let frames: number = 0;
let spawnRate: number = 180;
let difficultyFactor: number = 0;
let emitter: Emitter;

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

export const reset = () => {
  NPCs = [];
  frames = 0;
  spawnRate = 180;
  difficultyFactor = 0;
};

export const draw = (p: p5, props: Props) => {
  p.push();
  p.image(props.backgroundImg, 0, 0, p.width, p.height);
  p.cursor('none');

  frames += 1;

  if (frames >= spawnRate - difficultyFactor * 5) {
    const fromLeft = p.random() > 0.5;
    const faceIndex = Math.floor(p.random() * props.faces.length);
    addNPC(
      new NPC({
        p,
        x: fromLeft ? 0 : p.width,
        y: p.random(50, p.height - 400),
        framesToStop: p.map(difficultyFactor, 0, 48, 300, 180),
        direction:
          (fromLeft ? 1 : -1) *
          p.random(1, 3) *
          p.map(difficultyFactor, 0, 48, 1, 2),
        faces: {
          moving: props.faces[faceIndex].moving,
          stopped: props.faces[faceIndex].stopped,
          happy: props.faces[faceIndex].happy,
        },
      }),
    );

    frames = 0;
    difficultyFactor += 1;
  }

  for (const NPC of NPCs) {
    NPC.draw(p, props.onGameLost);
  }

  if (!p.mouseIsPressed || !emitter) {
    emitter = new Emitter(p, p.mouseX, p.mouseY);
  } else {
    p.push();
    emitter.updatePosition(p.mouseX, p.mouseY);
    emitter.emit(p, 4);
    emitter.show(p);
    emitter.update(p);
    p.pop();
  }

  p.imageMode(p.CENTER);
  p.image(props.waterGunImg, p.mouseX, p.height - 150);

  p.ellipseMode(p.CENTER);
  p.strokeWeight(3);
  p.stroke(255);
  p.fill(101, 201, 255);
  p.circle(p.mouseX, p.mouseY, 25);

  p.pop();
};
