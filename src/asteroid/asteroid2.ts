import { BaseDrawable } from "../drawing/base-drawable";
import { COLOR } from "../drawing/color";
import { Point } from "../drawing/point";
import { ContextUpdatable } from "../update/context-updatable";

export class Asteroid2 extends BaseDrawable implements ContextUpdatable {

    private radius: number;
    private position: Point;
    // private segments: number;
    private noise: number;
    private shapeVariations: number[];
    private angle: number;
    private angularSpeed: number;

    constructor() {
        super();

        this.radius = getRandomIntInclusive(50, 100);
        this.position = {
            x: getRandomIntInclusive(100, 300),
            y: getRandomIntInclusive(100, 300)}
        // this.segments = 15;
        const baseNoise: number = .7
        this.noise = getRandomArbitrary(-baseNoise, baseNoise)
        // this.noise = .7;
        this.angle = getRandomArbitrary(0, 2 * Math.PI);
        this.angularSpeed = (Math.PI / 3) * getRandomArbitrary(-.5, .5)

        const size: number = getRandomIntInclusive(14, 42);
        const baseVariation: number = .5;
        this.shapeVariations = [];
        for (let i = 0; i < size; i++) {
            this.shapeVariations.push(getRandomArbitrary(-baseVariation, baseVariation));            
        }
    }
    update(ctx: CanvasRenderingContext2D, elapsed: number): void {
        this.angle = (this.angle + this.angularSpeed * elapsed) % (2 * Math.PI)
        // throw new Error("Method not implemented.");
    }

    private setStyle(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = COLOR.WHITE;
    }


    protected drawInternal(ctx: CanvasRenderingContext2D): void {
        this.setStyle(ctx);
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.angle)
        ctx.beginPath();
        // ctx.moveTo(this.radius + this.radius * .4 * (Math.random() - .5), 0);
        for (let index = 0; index < this.shapeVariations.length; index++) {
            ctx.rotate( 2*Math.PI / this.shapeVariations.length);
            ctx.lineTo(this.radius + this.radius * this.noise * this.shapeVariations[index], 0)            
        }
        ctx.closePath();
        ctx.stroke();
    }

}


// On renvoie un entier aléatoire entre une valeur min (incluse)
// et une valeur max (incluse).
// Attention : si on utilisait Math.round(), on aurait une distribution
// non uniforme !
function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// On renvoie un nombre aléatoire entre une valeur min (incluse)
// et une valeur max (exclue)
function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}