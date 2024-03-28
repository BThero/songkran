import p5 from 'p5';

enum NPCState {
  MOVING,
  STOPPED,
  SHOOTING,
  HAPPY,
  GONE,
}

type Props = {
  x: number;
  y: number;
  direction: number;
  framesToStop: number;
  faces: {
    moving: p5.Image;
    stopped: p5.Image;
    happy: p5.Image;
  };
};

export class NPC {
  x: number;
  y: number;
  direction: number;
  radius: number;
  framesToStop: number;
  framesToShoot: number;
  framesToHappy: number;
  framesToDisappear: number;
  state: NPCState;
  faces: {
    moving: p5.Image;
    stopped: p5.Image;
    happy: p5.Image;
  };

  constructor(props: Props) {
    this.x = props.x;
    this.y = props.y;
    this.direction = props.direction;
    this.radius = 50;
    this.framesToStop = props.framesToStop;
    this.framesToShoot = 60;
    this.framesToHappy = 60;
    this.framesToDisappear = 300;
    this.state = NPCState.MOVING;
    this.faces = props.faces;
  }

  isHit(p: p5): boolean {
    if (
      p.mouseIsPressed &&
      p.dist(p.mouseX, p.mouseY, this.x, this.y) < this.radius
    ) {
      this.displayBubbles(p, p.mouseX - this.x, p.mouseY - this.y);
      return true;
    }
    return false;
  }

  displayBubbles(p: p5, centerX: number, centerY: number) {
    p.push();
    p.translate(centerX, centerY);
    for (let i = 0; i < 10; i++) {
      let offsetX = p.random(-this.radius, this.radius);
      let offsetY = p.random(-this.radius, this.radius);
      let bubbleX = offsetX;
      let bubbleY = offsetY;
      let bubbleSize = p.random(5, 15);

      p.fill(0, 0, 255, 100); // Blue color with transparency
      p.noStroke();
      p.ellipse(bubbleX, bubbleY, bubbleSize);
      console.log(bubbleX, bubbleY, centerX, centerY);
    }
    p.pop();
  }

  isGone(): boolean {
    return this.state === NPCState.GONE;
  }

  draw(p: p5, lostCb: () => void) {
    if (this.state === NPCState.GONE) {
      return;
    }

    p.push();
    p.translate(this.x, this.y);
    p.imageMode(p.CENTER);

    if (this.state === NPCState.HAPPY) {
      p.image(this.faces.happy, 0, 0, this.radius * 2, this.radius * 2);

      this.framesToDisappear -= 1;
      if (this.framesToDisappear <= 0) {
        this.state = NPCState.GONE;
      }
    } else if (this.state === NPCState.MOVING) {
      p.image(this.faces.moving, 0, 0, this.radius * 2, this.radius * 2);

      this.x += this.direction;
      this.y = p.constrain(this.y + p.random(-1, 1), 50, p.height - 400);
      this.framesToStop -= 1;
      if (this.framesToStop <= 0) {
        this.state = NPCState.STOPPED;
      }
    } else if (this.state === NPCState.STOPPED) {
      p.image(this.faces.stopped, 0, 0, this.radius * 2, this.radius * 2);

      this.framesToShoot -= 1;
      if (this.framesToShoot <= 0) {
        this.state = NPCState.SHOOTING;
      }
    } else if (this.state === NPCState.SHOOTING) {
      lostCb();
    }

    if (this.isHit(p) && this.state !== NPCState.HAPPY) {
      this.framesToHappy -= 1;
      if (this.framesToHappy <= 0) {
        this.state = NPCState.HAPPY;
      }
    }

    p.noStroke();

    p.stroke('white');
    p.fill('gray');
    p.rectMode(p.CORNER);
    p.rect(-this.radius, -this.radius - 10, this.radius * 2, 20);
    p.fill('yellow');
    p.rect(
      -this.radius,
      -this.radius - 10,
      p.map(this.framesToHappy, 0, 60, this.radius * 2, 0),
      20,
    );

    p.pop();
  }
}
