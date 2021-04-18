import { Drawable } from "./drawable";

export abstract class BaseDrawable implements Drawable {
    public draw(ctx: CanvasRenderingContext2D): void {
      ctx.save();
      this.setStyle(ctx);
      this.drawInternal(ctx);
      ctx.restore();
    }
  
    protected abstract setStyle(ctx: CanvasRenderingContext2D): void;
    protected abstract drawInternal(ctx: CanvasRenderingContext2D): void;
}