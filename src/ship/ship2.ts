import random from "random";
import { Drawable } from "../drawing/drawable";
import { DrawableShip } from "../drawing/drawable-ship";
import { Point, Vector } from "../drawing/point";
import { ShipInput } from "../input/ship-input";
import { Mass } from "../mass/mass";
import { Projectile } from "../projectile/projectile";
import { ContextUpdatable } from "../update/context-updatable";

export class Ship2 implements Drawable, ContextUpdatable {

  private drawable: DrawableShip;
  private mass: Mass;
  private shipInput: ShipInput = new ShipInput();
  
  constructor() {

    const m = 10;
    const r = 10


    this.drawable = new DrawableShip(r, Math.PI / 4);
    this.mass = new Mass(
      m,
      { x: random.int(50, 350), y: random.int(50, 350) },
      { x: 0, y: 0 },
      r,
      0,
      0
      // random.float(-2 * Math.PI / 3, 2 * Math.PI / 3)
    );

  }

  public projectile(): Projectile {
    const pos: Point = {
      x: this.mass.$pos.x + this.mass.$r * Math.cos(this.mass.$theta),
      y: this.mass.$pos.y + this.mass.$r * Math.sin(this.mass.$theta) 
    }

    const v: Vector = {
      x: 100 * Math.cos(this.mass.$theta),
      y: 100 * Math.sin(this.mass.$theta)
    }
    
    return new Projectile(pos, v)
  }

  update(ctx: CanvasRenderingContext2D, elapsed: number): void {

    this.shipInput.update(this.mass, elapsed);
    // if (random.bernoulli(.05)()) {
    //   this.mass.push(this.mass.$theta, 3000, elapsed)
    // }

    // if (random.bernoulli(.05)()) {
    //   const force = random.float(0, 2*Math.PI) * 10 * (random.boolean() ? 1 : -1)
    //   this.mass.twist(force, elapsed)
    // }

    this.mass.update(ctx, elapsed);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.drawable.draw(ctx, this.mass.getDrawInfo());
  }

}

