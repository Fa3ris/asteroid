import { CANVAS_H, CANVAS_W, COLOR, createCanvas2DContext, drawRect, OFFSET_CANVAS_X, OFFSET_CANVAS_Y } from "../drawing/draw";


const topleftX: number = OFFSET_CANVAS_X * 2 + CANVAS_W;
const leftPx: number = OFFSET_CANVAS_Y;

const ctx: CanvasRenderingContext2D = createCanvas2DContext("grid", topleftX, leftPx)

ctx.strokeStyle = COLOR.GHOST_WHITE;
ctx.lineWidth = .25;


for (let x = 0; x < CANVAS_W; x+=10) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, CANVAS_H);
    ctx.lineWidth = getYLineThickness(x);
    ctx.stroke();
}


for (let y = 0; y < CANVAS_H; y+=10) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(CANVAS_W, y);
    ctx.lineWidth = getXLineThickness(y);
    ctx.stroke();
    
}


function getXLineThickness(y: number): number {
    return getLineThickness(isMultipleOf(y, 50));
}

function getYLineThickness(x: number): number {
    return getLineThickness(isMultipleOf(x, 50));
}

function getLineThickness(predicate: boolean): number {
    return predicate ? .75 : .25;

}

function isMultipleOf(candidate: number, multiple: number): boolean {
    return candidate % multiple == 0;
}

