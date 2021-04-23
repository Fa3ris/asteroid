import { DrawableMass } from "./drawable-mass";

export class DrawableAsteroid extends DrawableMass {

    private r: number;

    constructor(r: number) {
        super();
        this.r = r;
    }

    protected drawInternal(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, 2*Math.PI)
        ctx.lineTo(0, 0);
        ctx.strokeStyle = "white"
        ctx.stroke();
    }

}