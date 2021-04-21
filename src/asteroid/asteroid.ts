import { BaseDrawable } from "../drawing/base-drawable";
import { COLOR } from "../drawing/color";
import { Point } from "../drawing/point";

export class Asteroid extends BaseDrawable {

    private radius: number;
    private position: Point;
    private segments: number

    constructor() {
        super();

        this.radius = 75;
        this.position = {x: 200, y: 200}
        this.segments = 15;
    }
    private setStyle(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = COLOR.WHITE;
    }


    protected drawInternal(ctx: CanvasRenderingContext2D): void {
        this.setStyle(ctx);
        ctx.translate(this.position.x, this.position.y);
        ctx.beginPath();
        // ctx.moveTo(this.radius + this.radius * .4 * (Math.random() - .5), 0);
        for (let index = 0; index < this.segments; index++) {
            ctx.rotate(2*Math.PI / this.segments);
            ctx.lineTo(this.radius + this.radius * .5 * (Math.random() - .5), 0)            
        }
        ctx.closePath();
        ctx.stroke();
    }

}