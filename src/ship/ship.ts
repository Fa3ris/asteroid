import { BaseDrawable } from "../drawing/base-drawable";
import { Point } from "../drawing/point";

export class Ship extends BaseDrawable {
  // private setStyle(ctx: CanvasRenderingContext2D): void {}

  private origin: Point;
  private radius: number;
  private halfAngle: number;
  private rotation: number;
  private xFactor: number;
  private yFactor: number;
  private step: number

  constructor() {
    super();
    this.origin = { x: 200, y: 200 };
    this.radius = 10;
    this.halfAngle = Math.PI / 4;
    this.rotation = Math.PI / 2;
    this.xFactor = 1;
    this.yFactor = 1;
    this.step = 50;
  }

  protected drawInternal(ctx: CanvasRenderingContext2D): void {
    setInterval(() => {

      // this.setStyle(ctx);
      ctx.clearRect(
        this.origin.x - this.radius,
        this.origin.y - this.radius,
        2 * this.radius,
        2 * this.radius
      );


    const displaceX = this.step * this.xFactor
      this.origin.x += Math.random() * displaceX;

      if (this.origin.x < this.radius) {
        this.origin.x = this.radius;
        this.xFactor *= -1;
      } else if (this.origin.x > ctx.canvas.width - this.radius) {
        this.origin.x = ctx.canvas.width - this.radius;
        this.xFactor *= -1;
      }
  
      const displaceY = this.step * this.xFactor;

      this.origin.y += Math.random() * displaceY;

      if (this.origin.y < this.radius) {
        this.origin.y = this.radius;
        this.yFactor *= -1;
      } else if (this.origin.y > ctx.canvas.height - this.radius) {
        this.origin.y = ctx.canvas.height - this.radius;
        this.yFactor *= -1;
      }

      this.rotation = Math.PI * 2 * Math.random();

      const backRight: Point = {
        x: Math.cos(Math.PI - this.halfAngle) * this.radius,
        y: Math.sin(Math.PI - this.halfAngle) * this.radius,
      };

      const backLeft: Point = {
        x: Math.cos(Math.PI + this.halfAngle) * this.radius,
        y: Math.sin(Math.PI + this.halfAngle) * this.radius,
      };

      ctx.save();
      ctx.translate(this.origin.x, this.origin.y);
      ctx.rotate(this.rotation);
      

      ctx.beginPath();
      ctx.moveTo(this.radius, 0);
      ctx.lineTo(backRight.x, backRight.y);
      ctx.lineTo(backLeft.x, backLeft.y);

      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.restore();
    }, 100);
  }
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function randBool(): boolean {
  return Math.random() < 0.5;
}
