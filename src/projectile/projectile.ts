import { Drawable } from "../drawing/drawable";
import { DrawableProjectile } from "../drawing/drawable-projectile";
import { Point, Vector } from "../drawing/point";
import { Mass } from "../mass/mass";
import { ContextUpdatable } from "../update/context-updatable";

export class Projectile implements Drawable, ContextUpdatable {
  private drawable: DrawableProjectile = new DrawableProjectile();
  private mass: Mass;

  private lifetime: number = 5;

  public get $lifetime(): number {
    return this.lifetime;
  }

  constructor(pos: Point, v: Vector) {
    this.mass = new Mass(10, pos, v, 10, 0, 0);
  }

  update(ctx: CanvasRenderingContext2D, elapsed: number): void {
    this.lifetime -= elapsed;
    this.mass.update(ctx, elapsed);
  }
  draw(ctx: CanvasRenderingContext2D): void {
    this.drawable.draw(ctx, this.mass.getDrawInfo());
  }
}
