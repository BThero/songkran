import p5 from "p5";

type Props = {
  onGameStart: () => void;
  playButtonImg: p5.Image;
};

const checkStartGame = (p: p5): boolean => {
  if (p.mouseIsPressed) {
    const x = p.mouseX - p.width / 2;
    const y = p.mouseY - p.height / 2;
    return p.dist(x, y, 0, 0) <= 100;
  }
  return false;
};

export const draw = (p: p5, props: Props) => {
  p.push();
  p.background(0);

  p.translate(p.width / 2, p.height / 2);
  p.imageMode(p.CENTER);
  p.image(props.playButtonImg, 0, 0, 100, 100);

  if (checkStartGame(p)) {
    props.onGameStart();
  }

  p.pop();
};
