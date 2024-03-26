import "./style.css";
import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(screen.width, screen.height);
    p.background(0);
  };

  p.draw = () => {
    p.fill(255);
    p.circle(20, 20, 20);
  };
};

new p5(sketch);
