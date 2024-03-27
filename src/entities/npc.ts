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
  }

  isHit(p: p5): boolean {
    return (
      p.mouseIsPressed &&
      p.dist(p.mouseX, p.mouseY, this.x, this.y) < this.radius
    );
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

    if (this.isHit(p) && this.state !== NPCState.HAPPY) {
      this.framesToHappy -= 1;
      if (this.framesToHappy <= 0) {
        this.state = NPCState.HAPPY;
      }
    }

    let fillColor: string = '';

    if (this.state === NPCState.HAPPY) {
      fillColor = 'yellow';
      this.framesToDisappear -= 1;
      if (this.framesToDisappear <= 0) {
        this.state = NPCState.GONE;
      }
    } else if (this.state === NPCState.MOVING) {
      fillColor = 'blue';
      this.x += this.direction;
      this.y = p.constrain(this.y + p.random(-1, 1), 50, p.height - 400);
      this.framesToStop -= 1;
      if (this.framesToStop <= 0) {
        this.state = NPCState.STOPPED;
      }
    } else if (this.state === NPCState.STOPPED) {
      fillColor = 'red';
      this.framesToShoot -= 1;
      if (this.framesToShoot <= 0) {
        this.state = NPCState.SHOOTING;
      }
    } else if (this.state === NPCState.SHOOTING) {
      lostCb();
    }

    p.noStroke();
    p.fill(fillColor);
    p.circle(0, 0, this.radius);

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
