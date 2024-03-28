import p5 from 'p5';
import { Particle } from './particle';

export class Emitter {
  position: p5.Vector;
  particles: Particle[];

  constructor(p: p5, x: number, y: number) {
    this.position = p.createVector(x, y);
    this.particles = [];
  }

  updatePosition(x: number, y: number) {
    this.position.set(x, y);
  }

  emit(p: p5, num: number) {
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(p, this.position.x, this.position.y));
    }
  }

  update(p: p5) {
    for (let particle of this.particles) {
      let gravity = p.createVector(0, 0.2);
      particle.applyForce(gravity);
      particle.update();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
  }

  show(p: p5) {
    for (let particle of this.particles) {
      particle.show(p);
    }
  }
}
