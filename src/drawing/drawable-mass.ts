import { Point } from "./point";

export interface DrawInfo {
    pos: Point;
    r: number;
    theta: number;
}

export abstract class DrawableMass {

    public draw(ctx: CanvasRenderingContext2D, drawInfo: DrawInfo): void {

        ctx.save()
        ctx.translate(drawInfo.pos.x, drawInfo.pos.y)
        ctx.rotate(drawInfo.theta);
        
        this.drawInternal(ctx);
        ctx.restore();

    }

    protected drawInternal(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, 2*Math.PI)
        ctx.lineTo(0, 0);
        ctx.strokeStyle = "white"
        ctx.stroke();
    }
}