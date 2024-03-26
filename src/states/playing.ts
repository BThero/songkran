import p5 from 'p5';

type Props = {
  onGameLost: () => void;
  waterGunImg: p5.Image;
  crosshairImg: p5.Image;
};

export const draw = (p: p5, props: Props) => {
  p.push();
  p.background(0);

  p.imageMode(p.CENTER);
  p.image(props.waterGunImg, p.mouseX, p.height - 150);

  p.image(props.crosshairImg, p.mouseX, p.mouseY, 50, 50);

  p.pop();
};
