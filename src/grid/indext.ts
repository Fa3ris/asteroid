import {
  CANVAS_H,
  CANVAS_W,
  COLOR,
  createCanvas2DContext,
  OFFSET_CANVAS_X,
  OFFSET_CANVAS_Y,
} from "../drawing/draw";

const topleftX: number = OFFSET_CANVAS_X * 2 + CANVAS_W;
const leftPx: number = OFFSET_CANVAS_Y;

const X_MEDIUM_STEP: number = 50;
const Y_MEDIUM_STEP: number = 50;

const ctx: CanvasRenderingContext2D = createCanvas2DContext(
  "grid",
  topleftX,
  leftPx
);

ctx.strokeStyle = COLOR.GHOST_WHITE;
ctx.lineWidth = 0.25;

ctx.fillStyle = COLOR.GHOST_WHITE;

for (let x = 0; x < CANVAS_W; x += 10) {
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, CANVAS_H);
  ctx.lineWidth = getYLineThickness(x);
  ctx.stroke();
  if (shouldWriteXCoordinate(x)) {
    ctx.fillText(String(x), x, 10);
  }
}

for (let y = 0; y < CANVAS_H; y += 10) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(CANVAS_W, y);
  ctx.lineWidth = getXLineThickness(y);
  ctx.stroke();
  if (shouldWriteYCoordinate(y)) {
    ctx.fillText(String(y), 0, y);
  }
}

function getXLineThickness(y: number): number {
  return getLineThickness(isMultipleOf(y, Y_MEDIUM_STEP));
}

function getYLineThickness(x: number): number {
  return getLineThickness(isMultipleOf(x, X_MEDIUM_STEP));
}

function shouldWriteXCoordinate(x: number): boolean {
  return isMultipleOf(x, X_MEDIUM_STEP);
}

function shouldWriteYCoordinate(y: number): boolean {
  return isMultipleOf(y, Y_MEDIUM_STEP);
}

function getLineThickness(predicate: boolean): number {
  return predicate ? 0.75 : 0.25;
}

function isMultipleOf(candidate: number, multiple: number): boolean {
  return candidate % multiple == 0;
}
