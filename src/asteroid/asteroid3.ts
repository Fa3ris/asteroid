import { Drawable } from "../drawing/drawable";
import { DrawableAsteroid } from "../drawing/drawable-asteroid";
import { Mass } from "../mass/mass";
import { ContextUpdatable } from "../update/context-updatable";

export class Asteroid3 implements Drawable, ContextUpdatable {

    private drawable: DrawableAsteroid;
    private mass: Mass;


	constructor() {

        const r = getRandomIntInclusive(10, 40)
		this.drawable = new DrawableAsteroid(r);
		this.mass = new Mass(
            getRandomIntInclusive(10, 50), 
            {x :getRandomIntInclusive(50, 350), y: getRandomIntInclusive(50, 350)},
            {x: getRandomArbitrary(-5, 5), y: getRandomArbitrary(-5, 5)},
            r,
            0,
            getRandomArbitrary(- 2*Math.PI, 2*Math.PI));
	}

    update(ctx: CanvasRenderingContext2D, elapsed: number): void {
        this.mass.update(ctx, elapsed);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.drawable.draw(ctx, this.mass.getDrawInfo());
    }

}

function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }