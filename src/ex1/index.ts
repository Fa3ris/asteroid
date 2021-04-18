import { COLOR } from "../drawing/color";
import {  createCanvas2DContext, drawRect, drawStickFigure, drawText, OFFSET_CANVAS_X, OFFSET_CANVAS_Y } from "../drawing/draw";

const topleftX: number = OFFSET_CANVAS_X;
const leftPx: number = OFFSET_CANVAS_Y;

const context: CanvasRenderingContext2D = createCanvas2DContext("ex1", topleftX, leftPx)


context.strokeStyle = COLOR.DIM_GREY;
context.lineWidth = 10;

drawRect(context, 75, 75, 250, 250);

context.lineWidth = 5;
context.strokeStyle = COLOR.WHITE;

drawRect(context, 90, 90, 220, 220);

context.fillStyle = COLOR.LIGHTGREY;
context.fill();

context.font = "34px Arial";
context.fillStyle = COLOR.RED;
context.textAlign = "end";

drawText(context, "hello", 200, 32);

drawStickFigure(context);
