import { BaseDrawable } from "./base-drawable";
import { Point } from "./point";

export abstract class Line extends BaseDrawable {
  private start: Point;
  private end: Point;

  constructor(start: Point, end: Point) {
    super();
    this.start = start;
    this.end = end;
  }

  protected drawInternal(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  }
}
