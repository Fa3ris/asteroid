import random from "random";
import { Drawable } from "../drawing/drawable";
import { DrawableShip } from "../drawing/drawable-ship";
import { Mass } from "../mass/mass";
import { ContextUpdatable } from "../update/context-updatable";

export class Ship2 implements Drawable, ContextUpdatable {

  private drawable: DrawableShip;
  private mass: Mass;
  
  constructor() {

    const m = 10;
    const r = 10


    this.drawable = new DrawableShip(r, Math.PI / 4);
    this.mass = new Mass(
      m,
      { x: random.int(50, 350), y: random.int(50, 350) },
      { x: random.int(-5, 5), y: random.int(-5, 5) },
      r,
      0,
      random.float(-2 * Math.PI / 3, 2 * Math.PI / 3)
    );

  }

  update(ctx: CanvasRenderingContext2D, elapsed: number): void {
    this.mass.update(ctx, elapsed);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.drawable.draw(ctx, this.mass.getDrawInfo());
  }

}

