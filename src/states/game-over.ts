import p5 from 'p5';

type Props = {
  onGameRestart: () => void;
  restartButtonImg: p5.Image;
  backgroundImg: p5.Image;
};

const checkRestartGame = (p: p5): boolean => {
  if (p.mouseIsPressed) {
    const x = p.mouseX - p.width / 2;
    const y = p.mouseY - p.height / 2;
    return p.dist(x, y, 0, 0) <= 100;
  }
  return false;
};

export const draw = (p: p5, props: Props) => {
  p.push();
  p.cursor(p.ARROW);
  p.background(255);
  p.image(props.backgroundImg, 0, 0, p.width, p.height);

  p.translate(p.width / 2, p.height / 2);
  p.imageMode(p.CENTER);
  p.image(props.restartButtonImg, 0, 0, 100, 100);

  if (checkRestartGame(p)) {
    props.onGameRestart();
  }

  p.pop();
};
