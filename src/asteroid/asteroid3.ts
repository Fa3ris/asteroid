import { Drawable } from "../drawing/drawable";
import { DrawableAsteroid } from "../drawing/drawable-asteroid";
import { Mass } from "../mass/mass";
import { ContextUpdatable } from "../update/context-updatable";
import random from 'random'

export class Asteroid3 implements Drawable, ContextUpdatable {
  private drawable: DrawableAsteroid;
  private mass: Mass;

  private static BASE_VARIATION: number = 0.5;
  private static DENSITY: number = 1; // kg per square pixel

  constructor() {
    // const m = getRandomIntInclusive(100, 5000);
    const m = random.normal(3000, 700)();
    const r = Math.sqrt(m / Asteroid3.DENSITY / Math.PI); // surface density = mass / area

    this.drawable = new DrawableAsteroid(this.generateShape(r));

    this.mass = new Mass(
      m,
      { x: getRandomIntInclusive(50, 350), y: getRandomIntInclusive(50, 350) },
      { x: getRandomArbitrary(-5, 5), y: getRandomArbitrary(-5, 5) },
      r,
      0,
      random.float(-2 * Math.PI / 3, 2 * Math.PI / 3)
    //   getRandomArbitrary(-2 * Math.PI, 2 * Math.PI)
    );
  }

  update(ctx: CanvasRenderingContext2D, elapsed: number): void {
    
    this.mass.update(ctx, elapsed);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.drawable.draw(ctx, this.mass.getDrawInfo());
  }

  private generateShape(r: number): number[] {
    const size: number = getRandomIntInclusive(14, 42);
    const noise: number = random.float(.1, .9)
    const shapeVariations: number[] = [];
    for (let i = 0; i < size; i++) {
      // this.radius + this.radius * this.noise
      shapeVariations.push(
        r +
          r *
            noise *
            random.float(
              -Asteroid3.BASE_VARIATION,
              Asteroid3.BASE_VARIATION
            )
      );
    }
    return shapeVariations;
  }
}

function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
