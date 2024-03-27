import p5 from 'p5';

type Props = {
  x: number;
  y: number;
  direction: number;
  framesToStop: number;
  framesToShoot: number;
  framesToHappy: number;
};

export class NPC {
  x: number;
  y: number;
  direction: number;
  radius: number;
  framesToStop: number;
  framesToShoot: number;
  framesToHappy: number;

  constructor(props: Props) {
    this.x = props.x;
    this.y = props.y;
    this.direction = props.direction;
    this.framesToStop = props.framesToStop;
    this.framesToShoot = props.framesToShoot;
    this.framesToHappy = props.framesToHappy;
    this.radius = 50;
  }

  isHit(p: p5): boolean {
    return (
      p.mouseIsPressed &&
      p.dist(p.mouseX, p.mouseY, this.x, this.y) < this.radius
    );
  }

  draw(p: p5, lostCb: () => void) {
    p.push();
    p.translate(this.x, this.y);

    let fillColor: string = 'blue';

    if (this.framesToHappy > 0) {
      if (this.framesToStop > 0) {
        fillColor = 'blue';
        this.x += this.direction;
        this.y = p.constrain(this.y + p.random(-1, 1), 50, p.height - 400);
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
