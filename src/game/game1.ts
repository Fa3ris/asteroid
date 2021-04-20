import { BaseDrawable } from "../drawing/base-drawable";
import { COLOR } from "../drawing/color";

export class Game1 {

    private ctx: CanvasRenderingContext2D;
    private rect: Rect;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.rect = new Rect();
        this.frame();
    }

    frame() {

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        this.update();
        this.draw();
        setInterval(() => this.frame(), 1000.0 / 60.0);
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
        this.w = 10;
        this.h = 10;

        this.ySpeed = .02;
        this.xSpeed = .02;
    }
    protected setStyle(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = COLOR.RED;
    }

    protected drawInternal(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();
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
        if (this.x <= 0 || this.x >= ctx.canvas.width) {
            this.x = (this.x + ctx.canvas.width) % ctx.canvas.width;
        }

    }

}