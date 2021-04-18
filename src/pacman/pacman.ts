import { Drawable } from "../drawing/drawable";
import { Point } from "../drawing/point";

export class Pacman implements Drawable {
  private _open: number;

  private openState: OpenState;
  get open(): number {
    return this._open;
  }

  set open(open: number) {
    this._open = open;
  }

  constructor() {
    this._open = 0;
    this.openState = new Opener();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const origin: Point = { x: 200, y: 200 };

    const radius: number = 150;

    const topLeftX = origin.x - radius;
    const topLeftY = origin.y - radius;
    const diameter = 2 * radius;
    // const openness: number = Math.random() / 3;
    // this._open = Math.random() / 3;

    setInterval(() => {

    this.openState = this.openState.updateOpen(this);
      ctx.clearRect(topLeftX, topLeftY, diameter, diameter);
      ctx.beginPath();
      ctx.arc(
        origin.x,
        origin.y,
        radius,
        this._open * Math.PI,
        (2 - this._open) * Math.PI
      );
      ctx.lineTo(origin.x, origin.y);
      ctx.fillStyle = "yellow";
      ctx.fill();
    }, 200);
  }
}

interface OpenState {
  updateOpen(pacman: Pacman): OpenState;
}

class Opener implements OpenState {
  private threshold = 1 / 3;
  private step = 0.1;

  updateOpen(pacman: Pacman): OpenState {
    const previous = pacman.open;

    if (previous < this.threshold) {
      let next = previous + this.step;

      pacman.open = Math.min(next, this.threshold);
      return this;
    } else {
      return new Closer();
    }
  }
}

class Closer implements OpenState {
  private threshold = 0;
  private step = 0.1;

  updateOpen(pacman: Pacman): OpenState {
    const previous = pacman.open;

    if (previous > this.threshold) {
      let next = previous - this.step;

      pacman.open = Math.max(next, this.threshold);
      return this;
    } else {
      return new Opener();
    }
  }
}
