import { DrawableMass } from "./drawable-mass";

export class DrawableProjectile extends DrawableMass {


    protected drawInternal(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, 2 * Math.PI)
        ctx.fillStyle = "white"
        ctx.fill();
    }

}