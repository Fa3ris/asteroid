import { Line } from "./line";
import { Point } from "./point";
import { StrokeStyle, STROKE_STYLE_DEFAULT } from "./stroke-style";

export class StyledLine extends Line {
  private style: StrokeStyle;

  constructor(start: Point, end: Point, style?: StrokeStyle) {
    super(start, end);
    this.style = style || STROKE_STYLE_DEFAULT;
  }

  protected setStyle(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = this.style.strokeWidth;
    ctx.strokeStyle = this.style.strokeColor;
  }
}
