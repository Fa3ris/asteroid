import { DrawableMass, DrawInfo } from "./drawable-mass";

export class DrawableAsteroid extends DrawableMass {

    private shapeVariations: number[];

    constructor(shapeVariations: number[]) {
        super();
        this.shapeVariations = shapeVariations;
    }

    protected drawInternal(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();

        for (const shape of this.shapeVariations) {
            ctx.rotate(2*Math.PI / this.shapeVariations.length);
            ctx.lineTo(shape, 0);
        }
        ctx.closePath();
        // ctx.lineTo(0, 0);
        ctx.strokeStyle = "white"
        ctx.stroke();
    }

}