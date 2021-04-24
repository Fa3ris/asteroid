import { DrawableMass } from "./drawable-mass";
import { Point } from "./point";

export class DrawableShip extends DrawableMass {


    private backRight: Point;
    private front: Point;
    private backLeft: Point;
    
    constructor(radius: number, halfAngle: number) {
        super();
        this.front = {x: radius, y: 0}
        this.backRight = {
            x: Math.cos(Math.PI - halfAngle) * radius,
            y: Math.sin(Math.PI - halfAngle) * radius,
        }
        this.backLeft = {
            x: Math.cos(Math.PI + halfAngle) * radius,
            y: Math.sin(Math.PI + halfAngle) * radius,
          };
    }

    protected drawInternal(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();
        ctx.moveTo(this.front.x, this.front.y);
        ctx.lineTo(this.backRight.x, this.backRight.y);
        ctx.lineTo(this.backLeft.x, this.backLeft.y);

        ctx.closePath();

        ctx.fillStyle = "yellow";
        ctx.fill();
    }

}