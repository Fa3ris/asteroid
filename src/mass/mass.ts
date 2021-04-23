import { DrawInfo } from "../drawing/drawable-mass";
import { Point, Vector } from "../drawing/point";


export class Mass {

    private m: number;

    private pos: Point;
    private v: Vector;

    private r: number;
    private theta: number;
    private omega: number;


	public get $pos(): Point {
		return this.pos;
	}

	public get $m(): number {
		return this.m;
	}


	public get $v(): Vector {
		return this.v;
	}


	public get $r(): number {
		return this.r;
	}

 
	public get $theta(): number {
		return this.theta;
	}


	public get $omega(): number {
		return this.omega;
	}

    public getDrawInfo(): DrawInfo {
        return {
            pos: this.pos,
            r: this.r,
            theta: this.theta
        }
    }


	constructor($m: number, $pos: Point, $v: Vector, $r: number, $theta: number, $omega: number) {
		this.m = $m;
		this.pos = $pos;
		this.v = $v;
		this.r = $r;
		this.theta = $theta;
		this.omega = $omega;
	}

    public update(ctx: CanvasRenderingContext2D, elapsed: number): void {
        this.pos.x += this.v.x * elapsed;
        this.pos.y += this.v.y * elapsed;

        this.theta += this.omega * elapsed;
        this.theta %= (2*Math.PI);

        // left-most side exceeds right border
        if (this.pos.x - this.r > ctx.canvas.width) {
            // wrap to left border with only half right side showing
            this.pos.x = -this.r;
        }

        // right-most side exceeds left border
        if (this.pos.x + this.r < 0) {
            // wrap to right border with only half left side showing
            this.pos.x = ctx.canvas.width + this.r;
        }

        // upper-most side exceeds bottom border
        if (this.pos.y - this.r > ctx.canvas.height) {
            // wrap to top border with only half lower side showing
            this.pos.y = -this.r;
        }

        // lower-most side exceeds top border
        if (this.pos.y + this.r < 0) {
            // wrap to bottom border with only half uppder side showing
            this.pos.y = ctx.canvas.height + this.r
        }

    }

    public push(incidence: number, force: number, elapsed: number): void {
        this.v.x += elapsed * (Math.cos(incidence) * force) / this.m;
        this.v.y += elapsed * (Math.sin(incidence) * force) / this.m;
    }

    public twist(force: number, elapsed: number): void {
        this.omega += elapsed * force / this.m;
    }

    public speedNorm(): number {
        return Math.sqrt(Math.pow(this.v.x, 2) + Math.pow(this.v.y, 2));
    }

    public movementAngle(): number {
        return Math.atan2(this.v.y, this.v.x);
    }

}