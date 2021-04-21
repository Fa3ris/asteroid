import { BaseDrawable } from "../drawing/base-drawable";
import { COLOR } from "../drawing/color";

export class Game1 {

    private ctx: CanvasRenderingContext2D;
    private rect: Rect;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.rect = new Rect();
        window.requestAnimationFrame((time: number) => this.frame(time));
    }

    frame(time: number): void {

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        this.update();
        this.draw();
        window.requestAnimationFrame((time: number) => this.frame(time));
    }

    update() {
        this.rect.update(this.ctx);
    }

    draw() {
        this.rect.draw(this.ctx);
    }
}


class Rect extends BaseDrawable {

    private x;
    private y;
    private w;
    private h;
    private ySpeed;
    private xSpeed;

    constructor() {
        super();
        this.x = 40;
        this.y = 40;
        this.w = 20;
        this.h = 20;

        this.ySpeed = .2;
        this.xSpeed = -2;
    }
    private setStyle(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = COLOR.RED;
        ctx.lineWidth = 5;
        ctx.fillStyle = COLOR.WHITE
    }

    protected drawInternal(ctx: CanvasRenderingContext2D): void {
        this.setStyle(ctx);
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.stroke();
        ctx.fill();
    }

    public update(ctx: CanvasRenderingContext2D) {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.y + this.h > ctx.canvas.height) {

            this.y = ctx.canvas.height - this.h;
            this.ySpeed *= -1;
        }

        if (this.y < 0) {
            this.y = 0;
            this.ySpeed *= -1
        }
        if (this.x + this.w <= 0 || this.x >= ctx.canvas.width) {
            this.x = (this.x + ctx.canvas.width) % ctx.canvas.width;
        }

    }

}