import p5 from 'p5';

type Props = {
  x: number;
  y: number;
  framesToStop: number;
  framesToShoot: number;
  framesToHappy: number;
  speed: number;
};

export class NPC {
  x: number;
  y: number;
  radius: number;
  framesToStop: number;
  framesToShoot: number;
  framesToHappy: number;
  speed: number;

  constructor(props: Props) {
    this.x = props.x;
    this.y = props.y;
    this.framesToStop = props.framesToStop;
    this.framesToShoot = props.framesToShoot;
    this.framesToHappy = props.framesToHappy;
    this.speed = props.speed;
    this.radius = 50;
  }

  isHit(p: p5): boolean {
    return p.dist(p.mouseX, p.mouseY, this.x, this.y) < this.radius;
  }

  draw(p: p5, lostCb: () => void) {
    p.push();
    p.noStroke();
    p.translate(this.x, this.y);

    let fillColor: string = 'blue';

    if (this.framesToHappy > 0) {
      if (this.framesToStop > 0) {
        fillColor = 'blue';
        this.x += this.speed;
        this.y = p.constrain(this.y + p.random(-1, 1), 10, p.height - 10);
        this.framesToStop -= 1;
      } else if (this.framesToShoot > 0) {
        fillColor = 'red';
        this.framesToShoot -= 1;
      } else {
        lostCb();
      }

      if (this.isHit(p)) {
        fillColor = 'green';
        this.framesToHappy -= 1;
      }
    } else {
      fillColor = 'yellow';
    }

    p.fill(fillColor);
    p.circle(0, 0, this.radius);
    p.pop();
  }
}
