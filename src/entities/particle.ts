import p5 from 'p5';

export class Particle {
  pos: p5.Vector;
  vel: p5.Vector;
  acc: p5.Vector;
  r: number;
  lifetime: number;

  constructor(p: p5, x: number, y: number) {
    this.pos = p.createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(p.random(0.5, 2));
    this.acc = p.createVector(0, 0);
    this.r = 4;
    this.lifetime = 255;
  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force: p5.Vector) {
    this.acc.add(force);
  }

  edges(p: p5) {
    if (this.pos.y >= p.height - this.r) {
      this.pos.y = p.height - this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x >= p.width - this.r) {
      this.pos.x = p.width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.lifetime -= 5;
  }

  show(p: p5) {
    p.stroke(101, 201, 255, this.lifetime);
    p.strokeWeight(2);
    p.fill(101, 201, 255, this.lifetime);

    p.ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
